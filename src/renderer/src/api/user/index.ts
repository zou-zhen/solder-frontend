import http from '../../utils/http/http'

export interface userType {
  user_id: string | undefined
  user_name: string | undefined
  password: string | undefined
  user_grade: number | undefined
  user_ic: string | undefined
}

const getUserList = () => {
  return http.get('/user/get_user_list')
}

const addUser = (data: userType) => {
  return http.post('/user/add_user', data)
}

const deleteUser = (data: { userId: string }) => {
  return http.post('/user/delete_user', data)
}

const editUser = (data: userType) => {
  return http.post('/user/edit_user', data)
}

const faceCollect = (data: { user_id: string }) => {
  return http.post('/user/face_collect', data)
}

const faceDetect = () => {
  return http.get('/user/face_detect')
}

export default {
  getUserList,
  addUser,
  deleteUser,
  editUser,
  faceCollect,
  faceDetect
}
