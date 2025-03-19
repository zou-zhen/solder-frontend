import http from '../../utils/http/http'

export interface modelType {
  min_cold_num: number | null
  model: string
  model_sys_name?: string
  modify_datetime: string
  ready_out_num: number | null
  ready_out_timeout: number | null
  rewarm_max_time: number | null
  rewarm_num: number | null
  rewarm_time: number | null
  shelf_life: number | null
  stir_speed: number | null
  stir_time: number | null
  z_offset?: number | null
  if_jiaoban: string
  jiaoban_rule?: string
  min_lc_time: number | null
  out_chaoshi_auto_lc: number | null
  out_chaoshi_auto_lc_times: number | null
  if_back_after_jiaoban: number | null
  twice_chaoshi_jinzhi_in_binggui: number | null
  twice_in_ku?: string
}

const getModelList = () => {
  return http.get('/solder/get_models')
}
const getModelByBarcode = (data: { barcode: string }) => {
  return http.post('/solder/get_model_by_barcode', data)
}
const addModel = (data: modelType) => {
  return http.post('/solder/add_model', data)
}

const editModel = (data: modelType) => {
  return http.post('/solder/edit_model', data)
}

const deleteModel = (data: { model: string }) => {
  return http.post('/solder/delete_model', data)
}

export default {
  getModelList,
  getModelByBarcode,
  addModel,
  editModel,
  deleteModel
}
