import type { User } from '@/types/user'
import { request } from '@/utils/request'
import type { CodeType, UserInfo, PatientList, Patient } from '@/types/user'
//密码登录
export const loginByPassword = (mobile: string, password: string) => {
  return request<User>('/login/password', 'POST', { mobile, password })
}

//发送验证码
export const sendMobileCode = (mobile: string, type: CodeType) => {
  return request('/code', 'get', { mobile, type })
}

//短信登录
export const loginByCode = (mobile: string, code: string) => {
  return request<User>('/login', 'post', { mobile, code })
}

// 获取个人信息
export const getUserInfoAPI = () => {
  return request<UserInfo>('/patient/myUser')
}

//获取患者信息列表
export const getPatientList = () => {
  return request<PatientList>('/patient/mylist')
}

// 添加患者信息
export const addPatient = (patient: Patient) => {
  return request('/patient/add', 'post', patient)
}

// 编辑患者信息
export const editPatient = (patient: Patient) => {
  return request('/patient/update', 'put', patient)
}

//删除患者信息
export const delPatient = (id: string) => {
  return request(`/patient/del/${id}`, 'DELETE')
}
// 查询患者详情
export const getPatientDetail = (id: string) => {
  return request<Patient>(`/patient/info/${id}`)
}
