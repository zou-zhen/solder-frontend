import http from '../../utils/http/http'

const getSportStates = () => {
  return http.get('/sport/get_sport_states')
}

const setSport = (action: string, tag: number) => {
  return http.post('/sport/set_sport', { action, tag })
}

const tuned = (action: string, tag: number) => {
  return http.post('/sport/tuned_control', { action, tag })
}

const tunedOperate = (action: '执行' | '停止' | '教导', tag: number, id: number) => {
  return http.post('/sport/tuned_operate', { action, tag, id })
}

const getAuto = () => {
  return http.get('/sport/get_auto')
}

const switchAuto = () => {
  return http.get('/sport/switch_auto')
}

const inputOpen = (tag: number) => {
  return http.post('/sport/input_open', { tag })
}

const getSportStates2 = () => {
  return http.get('/sport/get_sport_states2')
}

const tunedSpeed = (data) => {
  return http.post('/sport/tuned_speed', data)
}

const getSpeed = () => {
  return http.get('/sport/get_speed')
}

const heartbeat = () => {
  return http.post('/sport/heartbeat', null)
}

const getIsStiring = () => {
  return http.get('/sport/get_is_stiring')
}

const getRegionProp = () => {
  return http.get('/sport/region_prop')
}

const setRegionProp = (data) => {
  return http.post('/sport/region_prop', data)
}

// const inputOpen = () => {
//   return http.get('/sport/input_open')
// }

// const outputOpen = () => {
//   return http.get('/sport/output_open')
// }

export default {
  getSportStates,
  setSport,
  tuned,
  tunedOperate,
  getAuto,
  switchAuto,
  inputOpen,
  getSportStates2,
  tunedSpeed,
  getSpeed,
  heartbeat,
  getIsStiring,
  // inputOpen,
  // outputOpen
  getRegionProp,
  setRegionProp,
}
