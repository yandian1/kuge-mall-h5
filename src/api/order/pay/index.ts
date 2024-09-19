import request from '@/request'
import { PreInfo, PayResult } from "@/api/order/pay/types.ts"

export function getPayStatus(data: Recordable) {
  return request.post<R<string>>('/order/pay/status', data, {
    showError: false,
  })
}

export function getPayResult(data: Recordable, config = { showError: true }) {
  return request.post<R<PayResult>>('/order/pay/result', data, config)
}

export function getPreInfo(data: Recordable) {
  return request.post<R<PreInfo>>('/order/pay/pre/info', data)
}

export function getCodeUrl(data: Recordable) {
  return request.post<R<string>>('/order/pay/codeUrl', data)
}