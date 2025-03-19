import http from '../../utils/http/http'

const initializeTrial = () => {
  return http.get('/auth/initialize_trial')
}
const checkTrial = () => {
  return http.get('/auth/check_trial')
}
const extendTrial = (new_extension_code: string) => {
  return http.post('/auth/extend_trial', { new_extension_code })
}

export default {
  initializeTrial,
  checkTrial,
  extendTrial
}
