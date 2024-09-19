export const PayStatus = {
  unPay: { code: 'unPay', msg: '未支付' },
  paid: { code: 'paid', msg: '已支付' },
  refunded: { code: 'refunded', msg: '已退款' },
  closed: { code: 'closed', msg: '已关闭' },
}

export const OrderStatus = {
  unPay: { code: 'unPay', msg: '待付款' },
  unSend: { code: 'unSend', msg: '待发货' },
  unReceive: { code: 'unReceive', msg: '待收货' },
  received: { code: 'received', msg: '已收货' },
  cancelled: { code: 'cancelled', msg: '已取消' },
  completed: { code: 'completed', msg: '完成' },
  afterSaleIng: { code: 'afterSaleIng', msg: '售后中' },
  afterSaleRefunded: { code: 'afterSaleRefunded', msg: '已退款' },
  // afterSalePending: { code: 'afterSalePending', msg: '售后待处理' },
  // afterSaleAgreed: { code: 'afterSaleAgreed', msg: '售后已退款' },
  // afterSaleRejected: { code: 'afterSaleRejected', msg: '售后已拒绝' },
  // afterSaleCancelled: { code: 'afterSaleCancelled', msg: '售后已取消' },
}

export const AfterSaleStatus = {
  pending: { code: 'pending', msg: '处理中' },
  agreed: { code: 'agreed', msg: '已同意' },
  rejected: { code: 'rejected', msg: '已拒绝' },
  refunding: { code: 'refunding', msg: '退款中' },
  refunded: { code: 'refunded', msg: '已退款' },
  cancelled: { code: 'cancelled', msg: '已取消' },
}

export const CouponType = {
  discount: { code: 'discount', msg: '折扣券' },
  deduct: { code: 'deduct', msg: '抵扣券' },
}