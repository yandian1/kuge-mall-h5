import request from '@/request'
import { SpuDetail, SpuPage } from './types'

export function getSpuPage(data: Recordable) {
  return request.post<R<PageData<SpuPage>>>('/product/spu/pageList', data)
}

export function getSpu(id: ID, config = { showError: false }) {
  return request.post<R<SpuDetail>>('/product/spu/' + id, null, config)
}
