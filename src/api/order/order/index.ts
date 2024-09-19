import request from '@/request'
import { ConfirmOrderInfo, OrderPageItem, OrderDetail } from './types'

export function getConfirmOrderInfo(data: Recordable) {
  return request.post<R<ConfirmOrderInfo>>('/order/order/confirmInfo', data)
}

export function createOrder(data: Recordable) {
  return request.post<R<string>>('/order/order/create', data)
}

export function getOrderPage(data: Recordable) {
  return request.post<R<PageData<OrderPageItem>>>('/order/order/pageList', data)
}

export function getOrderDetail(id: ID) {
  return request.post<R<OrderDetail>>('/order/order/' + id)
}

export function cancelOrder(id: ID) {
  return request.post<R>('/order/order/cancel/' + id)
}

export function getUnPayCount() {
  return request.post<R>('/order/order/count/unPay')
}