import request from '@/request'
import { LoginRes, RegisterRes } from './types'

export function login(data: Recordable) {
  return request.post<R<LoginRes>>('/auth/login/member', data)
}

export function register(data: Recordable) {
  return request.post<R<RegisterRes>>('/auth/register/member', data)
}

export function logout() {
  return request.post<R>('/auth/logout/member')
}
