import http from '../../utils/http/http'

const getDaiquSolder = (type: 0 | 2) => {
  return http.post('/solder/daiqu_solder', {type})
}

const getLengcangSolder = () => {
  return http.get('/solder/lengcang_solder')
}

const outSolder = (data: { model_type: string; amount: number | null }) => {
  return http.post('/solder/out_solder', data)
}

export default {
  getDaiquSolder,
  getLengcangSolder,
  outSolder
}
