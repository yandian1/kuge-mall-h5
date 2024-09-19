import request from '@/request'
import { MemberCouponPageItem } from "./types"

export function getMemberCouponPage(data: Recordable) {
  return request.post<R<PageData<MemberCouponPageItem>>>('/member/member/coupon/pageList', data)
}