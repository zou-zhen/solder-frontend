import http from '../../utils/http/http'
// import { LoginData, LoginResult } from './types'

// const login = (data: LoginData) => {
//   return http.post('/auth/login', data)
// }

const getOffer = (data) => {
  return http.post('/offer', data)
}

const login = (data) => {
  return http.post('/user/login', data)
}
const getUserList = () => {
  return http.get('/user/list')
}
const saveUser = (data) => {
  return http.post('/user/save', data)
}
const delUser = (data) => {
  return http.del('/user/delete', data)
}
// const getUserInfo = (data: LoginResult) => {
//   return http.get('/user/detail', data)
// }

const getUserInfo = () => {
  return http.get('/auth/userInfo')
}

const getVideo = () => {
  return http.get('/stearm/monitor_video')
}

export const getUserInfoApi = () => {
  return http.get('/auth/userInfo')
}
export default {
  getOffer,
  login,
  getUserList,
  saveUser,
  delUser,
  getUserInfo,
  getUserInfoApi,
  getVideo
}
