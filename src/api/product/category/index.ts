import request from '@/request'
import { Category } from './types'

export function getCategoryList(data: Recordable) {
  return request.post<R<Category[]>>('/product/category/list', data)
}
