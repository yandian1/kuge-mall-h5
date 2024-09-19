import request from '@/request'
import { CartInfo } from './types'

export function addCart(data: Recordable) {
  return request.post<R>('/cart/cart/redis/add', data)
}
export function delCart(data: {shopId: ID, skuId: ID}) {
  return request.post<R>('/cart/cart/redis/del/' + data.shopId + '/' + data.skuId)
}

export function getCartInfo() {
  return request.post<R<CartInfo>>('/cart/cart/redis/info')
}

export function changeCartSelect(data: Recordable) {
  return request.post<R>('/cart/cart/redis/changeSelect', data)
}

export function changeCartQuantity(data: Recordable) {
  return request.post<R>('/cart/cart/redis/changeQuantity', data)
}

export function getCartCount() {
  return request.post<R<number>>('/cart/cart/redis/count')
}