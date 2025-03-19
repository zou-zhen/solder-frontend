import http from '../../utils/http/http'

const getUnorderedSolder = () => {
  return http.get('/solder/unordered_solder')
}

const getOrderedSolder = () => {
  return http.get('/solder/ordered_solder')
}
const orderMode = (data: { OrderDateTime: string }) => {
  return http.post('/mode/order_mode', data)
}
const orderSolder = (data: { model: string; amount: number; OrderDateTime: string }) => {
  return http.post('/solder/order_solder', data)
}

const getSolderModelsType = () => {
  return http.get('/solder/get_solder_models_type')
}

export default {
  getUnorderedSolder,
  getOrderedSolder,
  orderSolder,
  getSolderModelsType,
  orderMode
}
