// import axios from 'axios';
import http from '../../utils/http/http'

const getTemperatureRecords = (data: { start_date: string; end_date: string }) => {
  return http.post('/temperature/get_temperature_records', data)
}

// 定义 API 响应的数据结构
export interface AlarmResponse {
  code: number
  data: {
    alarms: Array<{
      AlarmText: string
      StartTime: string
      EndTime: string
      Kind: string
    }>
    total: number
  }
  msg: string
}
const getAlarms = (data: {
  start_date?: string
  end_date?: string
  page?: number
  page_size?: number
}): Promise<AlarmResponse> => {
  return http.post('/alarm/get_alarms', data) as Promise<AlarmResponse>
}

const getSolderFlowRecords = (data: {
  solder_code?: string
  start_date?: string
  end_date?: string
  user_id?: number | null
  record_type?: string
}) => {
  return http.post('/solderflow/get_solder_flow_records', data)
}

export default {
  getTemperatureRecords,
  getAlarms,
  getSolderFlowRecords
}
