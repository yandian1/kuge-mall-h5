export type OrderGoods = {
  id: ID
  skuId: ID
  skuNum: number
  skuName: string
  skuPrice: string
  skuAttrs: string
  skuImg: string
}

export type AfterSale = {
  shopName: string
  id: ID
  sn: string
  type: string
  applyNum: number
  reason: string
  status: string
  statusDesc: string
  applyAmount: number
  actualAmount: number
  orderGoods: {
    num: number
    name: string
    price: string
    attrs: string
    img: string
  }
}
