import request from '@/request'
import { AfterSale } from './types'

export function applyAfterSale(data: Recordable) {
  return request.post<R<ID>>('/order/afterSale/apply', data)
}

export function getAfterSalePage(data: Recordable) {
  return request.post<R<PageData<AfterSale>>>('/order/afterSale/pageList', data)
}

export function getAfterSale(id: ID) {
  return request.post<R<AfterSale>>('/order/afterSale/' + id)
}

export function cancelAfterSale(id: ID) {
  return request.post<R<AfterSale>>('/order/afterSale/cancel/' + id)
}
