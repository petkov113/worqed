import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { apiAxios } from '../axios/axios'
import { City } from '../Containers/ServiceForm/ServiceForm'

// THUNKS AND FUNCTIONS ========================================================

export const getUserAds = createAsyncThunk('ads/getAds', async (user: User) => {
  const ads = (await apiAxios.get<ApiResponse>('ads.json')).data

  const response = (
    await apiAxios.get<{ [id: string]: { id: string } }>(
      `users/${user.id}/ads.json?auth=${user.token}`
    )
  ).data

  const ids = Object.values(response).reduce((arr, el) => {
    return [...arr, el.id]
  }, [] as string[])

  return Object.keys(ads)
    .filter((id) => ids.includes(id))
    .reduce((arr, el) => {
      return [...arr, { ...ads[el], id: el }]
    }, [] as Ad[])
})

const createAdArray = (response: ApiResponse) => {
  const adsArray = Object.keys(response).reduce((arr, el) => {
    return [...arr, { ...response[el], id: el }]
  }, [] as Ad[])
  return adsArray
}

export const getAds = createAsyncThunk('ads/getAds', async (city?: City) => {
  let url = 'ads.json'
  if (city) url = url.concat(`?orderBy="city"&equalTo="${city}"`)
  const ads = (await apiAxios.get<ApiResponse>(url)).data
  return createAdArray(ads)
})

export const postAd = createAsyncThunk(
  'ads/postAd',
  async ({ ad, user }: { ad: FormAd; user: User | null }) => {
    const id = (await apiAxios.post(`ads.json`, ad)).data.name
    user && (await apiAxios.put(`users/${user.id}/ads/${id}.json?auth=${user.token}`, { id }))
  }
)

export const deleteAd = createAsyncThunk(
  'ads/deleteAd',
  async ({ adId, user }: { adId: string; user: User }, { dispatch }) => {
    await apiAxios.delete(`ads/${adId}.json`)
    await apiAxios.delete(`users/${user.id}/ads/${adId}.json?auth=${user.token}`)
    dispatch(getUserAds(user))
  }
)

// STATE ====================================================================

const adsSlice = createSlice({
  name: 'ads',
  initialState: {
    ads: null,
    loading: false,
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAds.pending, (state) => {
      state.ads = null
      state.loading = true
    })
    builder.addCase(getAds.fulfilled, (state, action: PayloadAction<null | Ad[]>) => {
      state.loading = false
      state.ads = action.payload
    })
    builder.addCase(getAds.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(deleteAd.pending, (state) => {
      state.loading = true
    })
    builder.addCase(deleteAd.rejected, (state) => {
      state.loading = false
    })
  },
})

export default adsSlice.reducer

// TYPES ========================================================================

type State = {
  ads: null | Ad[]
  loading: boolean
}

export type User = {
  id: string
  token: string
}

export type Ad = {
  title: string
  city: City
  date: Date
  id: string
  phone: string
  terms: boolean
  price: number
  district: string
  info?: string
  authorId?: null | string
}

type ApiResponse = {
  [id: string]: Ad
}

export type FormAd = Omit<Ad, 'date' | 'id'>
