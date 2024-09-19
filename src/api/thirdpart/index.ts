import request from '@/request'

export function sendCode(data: Recordable) {
  return request.post<R>('/thirdpart/sms/sendCode', data)
}