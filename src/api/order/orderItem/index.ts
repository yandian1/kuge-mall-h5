import request from '@/request'
import { OrderItem } from './types'

export function getOrderItem(id: ID) {
  return request.post<R<OrderItem>>('/order/order/item/' + id)
}

export function receiveGoods(id: ID) {
  return request.post<R<OrderItem>>('/order/order/item/receiveGoods/' + id)
}
