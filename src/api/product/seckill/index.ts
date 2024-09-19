import request from '@/request'
import { Seckill } from './types'

export function getSeckill(id: ID) {
  return request.post<R<Seckill>>('/product/seckill/' + id, null, { showError: true })
}
