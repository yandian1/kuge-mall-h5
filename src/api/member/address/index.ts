import request from '@/request'
import { Address } from './types.ts'

export function getDefaultAddress() {
  return request.post<R<Address>>(
    '/member/address/getDefault',
    {},
    {
      showError: false,
    }
  )
}

export function setDefaultAddress(id: ID) {
  return request.post<R>('/member/address/setDefault/' + id)
}

export function getAddressList() {
  return request.post<R<Address[]>>('/member/address/list')
}

export function getAddress(id: ID) {
  return request.post<R<Address>>('/member/address/' + id)
}

export function addAddress(data: Recordable) {
  return request.post<R>('/member/address/add', data)
}

export function updateAddress(data: Recordable) {
  return request.post<R>('/member/address/update', data)
}

export function delAddress(id: ID) {
  return request.post<R>('/member/address/del/' + id)
}
