import http from '../../utils/http/http'

export interface stationLocationType {
  x: number | null
  y: number | null
  z: number | null
  r: number | null
  StaType: string
}

const getStationByArea = (data: {
  area?: string
  page?: number
}) => {
  return http.post('/station/get_all_stations_byArea',data)
}
const getStations = () => {
  return http.get('/station/get_stations')
}

const getStorageStation = () => {
  return http.get('/station/get_storage_station')
}

const updateStationLocation = (data: stationLocationType) => {
  return http.post('/station/update_station_location', data)
}

const getRukuData = () => {
  return http.get('/station/get_ruku_data')
}

export default {
  getStationByArea,
  getStations,
  getStorageStation,
  updateStationLocation,
  getRukuData
}
