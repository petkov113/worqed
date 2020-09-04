import axios from 'axios'

export const authAxios = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
})

export const apiAxios = axios.create({
  baseURL: 'https://worqed.firebaseio.com/',
})
