import request from '@/request'
import { Activity } from './types'

export function getActivity(id: ID) {
  return request.post<R<Activity>>('/product/activity/' + id)
}
