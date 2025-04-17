// 访问 token 缓存的 key
const ACCESS_TOKEN_KEY = 'access_token'
// 刷新 token 缓存的 key
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_ID_KEY = 'user_id'
const USER_NAME_KEY = 'user_name'
const USER_GRADE_KEY = 'user_grade'

function getToken(): string {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || ''
}

function setToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

function getUserId(): string {
  return localStorage.getItem(USER_ID_KEY) || ''
}
function setUserId(user_id: string) {
  localStorage.setItem(USER_ID_KEY, user_id)
}
function getUserName(): string {
  return localStorage.getItem(USER_NAME_KEY) || ''
}
function setUserName(user_name: string) {
  localStorage.setItem(USER_NAME_KEY, user_name)
}
function getUserGrade(): string {
  return localStorage.getItem(USER_GRADE_KEY) || ''
}
function setUserGrade(user_grade: string) {
  localStorage.setItem(USER_GRADE_KEY, user_grade)
}

function getRefreshToken(): string {
  return localStorage.getItem(REFRESH_TOKEN_KEY) || ''
}

function setRefreshToken(token: string) {
  localStorage.setItem(REFRESH_TOKEN_KEY, token)
}

function clearToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}
function clearUserId() {
  localStorage.removeItem(USER_ID_KEY)
  
}

export { 
  getToken, setToken, 
  getUserId, setUserId, 
  getUserName, setUserName,
  getUserGrade, setUserGrade,
  clearToken,clearUserId, 
  getRefreshToken, setRefreshToken }
