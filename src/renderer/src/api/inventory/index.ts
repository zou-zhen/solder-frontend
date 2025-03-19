import http from '../../utils/http/http'

export interface queryType {
  model?: string
  StaArea?: string
}

const getSolder = (data?: queryType) => {
  // console.log('getSolder', data)

  return http.post('/solder/get_solders', data)
}

const addSolder = (data) => {
  return http.post('/solder/add_solder', data)
}

const deleteSolder = (data: { solder_code: string }) => {
  return http.post('/solder/delete_solder', data)
}

const outSolder = (data: { solder_code: string }) => {
  return http.post('/solder/out_solder', data)
}

const getSolderModelList = () => {
  return http.get('/solder/get_solder_models')
}

export default {
  getSolder,
  addSolder,
  deleteSolder,
  getSolderModelList,
  outSolder
}
