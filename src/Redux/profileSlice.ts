import { createSlice, createAsyncThunk, PayloadAction, ThunkAction, Action } from '@reduxjs/toolkit'
import { FormikValues } from 'formik'
import { authAxios, apiAxios } from '../axios/axios'
import { RootState } from './store'
import { User } from './adsSlice'

type State = {
  isAuth: boolean
  userId: null | string
  token: null | string
  loading: boolean
  name: null | string
  phone: null | string
}

// THUNKS ==================================================================

export const auth = createAsyncThunk(
  'profile/auth',
  async ({ values, setStatus, setSubmitting, isLogin }: AuthFunctionArgs, { dispatch }) => {
    const authData = {
      email: values.email,
      password: values.password,
      returnSecureToken: true,
    }

    let url
    if (isLogin) {
      url = `:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
    } else {
      url = `:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
    }

    try {
      const response = await authAxios.post<AuthResponse>(url, authData)
      const { expiresIn, idToken, localId } = response.data
      const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000)
      localStorage.setItem('expirationDate', expirationDate.toString())
      localStorage.setItem('id', localId)
      localStorage.setItem('token', idToken)
      setSubmitting(false)
      dispatch(authSuccess({ id: localId, token: idToken }))
      dispatch(getUserData({ id: localId, token: idToken }))
    } catch (e) {
      setSubmitting(false)
      let warning
      switch (e.response.data.error.message) {
        case 'EMAIL_EXISTS':
          warning = 'Тази поща е вече регистрирана. Моля, влезте'
          break
        case 'EMAIL_NOT_FOUND':
          warning = 'Тази поща не е регистрирана. Моля натиснене "Регистрирай"'
          break
        default:
          warning = 'Пощата или паролът е грешен'
      }
      setStatus({ generall: warning })
    }
  }
)

export const getUserdata = createAsyncThunk('profile/getUserdata', async (userId) => {
  const data = (await apiAxios.get<{ name: string; phone: string }>(`users/${userId}.json`)).data
  console.log(data)
})

export const autoLogin = (): Thunk => (dispatch) => {
  const token = localStorage.getItem('token')
  const id = localStorage.getItem('id')
  const expirationDate = localStorage.getItem('expirationDate')

  if (!token || !id || !expirationDate) {
    dispatch(logout())
  } else {
    const formattedDate = new Date(expirationDate)
    if (formattedDate <= new Date()) dispatch(logout())
    else {
      dispatch(authSuccess({ id, token }))
      dispatch(autoLogout((formattedDate.getTime() - new Date().getTime()) / 1000))
      dispatch(getUserData({ id, token }))
    }
  }
}

const autoLogout = (time: number): Thunk => (dispatch) => {
  setTimeout(() => {
    dispatch(logout())
  }, time * 1000)
}

export const updateName = createAsyncThunk(
  'profile/updateName',
  async ({ name, user }: { name: string; user: User }) => {
    await apiAxios.patch(`users/${user.id}.json?auth=${user.token}`, { name })
    return name
  }
)

export const updatePhone = createAsyncThunk(
  'profile/updatePhone',
  async ({ phone, user }: { phone: string; user: User }) => {
    await apiAxios.patch(`users/${user.id}.json?auth=${user.token}`, { phone })
    return phone
  }
)

export const getUserData = createAsyncThunk('profile/getUserData', async (user: User) => {
  const response = await apiAxios.get<UserData>(`/users/${user.id}.json?auth=${user.token}`)
  if (response.data) {
    return {
      name: response.data.name,
      phone: response.data.phone,
    }
  } else return null
})

// STATE ===============================================================================

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    isAuth: false,
    name: null,
    phone: null,
    userId: null,
    token: null,
    loading: false,
  } as State,
  reducers: {
    authSuccess: (state, action: PayloadAction<User>) => {
      state.isAuth = true
      state.userId = action.payload.id
      state.token = action.payload.token
    },
    logout: (state) => {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('expirationDate')
      
      state.isAuth = false
      state.userId = null
      state.token = null
      state.name = null
      state.phone = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(auth.pending, (state) => {
      state.loading = true
    })
    builder.addCase(auth.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(auth.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(updateName.fulfilled, (state, action: PayloadAction<string>) => {
      state.name = action.payload
    })
    builder.addCase(updatePhone.fulfilled, (state, action: PayloadAction<string>) => {
      state.phone = action.payload
    })
    builder.addCase(getUserData.fulfilled, (state, action: PayloadAction<UserData | null>) => {
      if (action.payload) {
        state.name = action.payload.name
        state.phone = action.payload.phone
      }
    })
  },
})

export default profileSlice.reducer
export const { logout, authSuccess } = profileSlice.actions

// TYPES ==========================================================================

type AuthResponse = {
  email: string
  expiresIn: string
  idToken: string
  kind: string
  localId: string
  refreshToken: string
}

type AuthFunctionArgs = {
  values: FormikValues
  setStatus: (status: any) => void
  setSubmitting: (isSubmitting: boolean) => void
  isLogin: boolean
}

type Thunk = ThunkAction<void, RootState, unknown, Action<string>>

type UserData = {
  name: null | string
  phone: null | string
}
