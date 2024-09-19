import request from '@/request'

export function setName(data: Recordable) {
  return request.post<R>('/member/member/setName', data)
}

export function setAccount(data: Recordable) {
  return request.post<R>('/member/member/setAccount', data)
}
