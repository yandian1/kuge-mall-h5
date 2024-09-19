import request from '@/request'

export function getHomepage() {
  return request.post<R<{detail: string}>>('/product/homepage/detail')
}