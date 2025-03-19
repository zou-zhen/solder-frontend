import http from '../../utils/http/http'

const getSettings = () => {
  return http.get('/system/get_settings')
}

const runVideo = () => {
  return http.get('/system/run_video')
}

const settings = (data) => {
  return http.post('/system/settings', data)
}

const button = (data) => {
  return http.post('/system/button', data)
}

const readMode = () => {
  return http.get('/system/read_mode')
}

const writeMode = (data) => {
  return http.post('/system/write_mode', data)
}
const orderMode = (data: { OrderDateTime: string }) => {
  return http.post('/mode/order_mode', data)
}
export default {
  getSettings,
  settings,
  button,
  runVideo,
  readMode,
  writeMode,
  orderMode
}
