import http from '../../utils/http/http'

const getDaiquSolder = () => {
  return http.get('/solder/daiqu_solder')
}
const getAccessibleSolder = () => {
  return http.get('/solder/accessible_solder')
}

const getLengcangSolder = () => {
  return http.get('/solder/lengcang_solder')
}

const outSolder = (data: { model_type: string; amount: number | null }) => {
  return http.post('/solder/out_solder', data)
}

export default {
  getDaiquSolder,
  getAccessibleSolder,
  getLengcangSolder,
  outSolder
}
