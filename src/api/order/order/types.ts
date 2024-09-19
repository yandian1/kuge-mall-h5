export type OrderDetail = {
  id: ID
  sn: string
  shopName: string
  price: string
  status: string
  statusDesc: string
  surplus: number
  receiverName: string
  receiverPhone: string
  receiverAddress: string
  createTime: string
  orderItems: Array<{
    id: ID
    spuId: ID
    status: string
    statusDesc: string
    name: string
    attrs: string
    img: string
    num: number
    price: string
  }>
}

export type OrderPageItem = {
  id: ID
  sn: string
  shopName: string
  price: string
  surplus: number
  status: string
  statusDesc: string
  orderItems: Array<{
    name: string
    attrs: string
    img: string
    num: number
    price: string
  }>
}

export type CouponItem = {
  memberCouponId: ID
  couponId: ID
  name: string
  type: string
  typeDesc: string
  discount: number
  deduct: number
  threshold: number
  startTime: string
  endTime: string
}


export type Goods = {
  spuId: ID
  skuId: ID
  memberCouponId: ID
  name: string
  attrs: string
  img: string
  num: number
  price: number
  couponPrice: number
  couponList: CouponItem[]
}

export type ShopItem = {
  id: ID
  name: string
  goodsList: Goods[]
}

export type Address = {
  id: ID
  name: string
  phone: string
  province: string
  city: string
  county: string
  detail: string
  isDefault: boolean
}

export type ConfirmOrderInfo = {
  actualPrice: number
  goodsPrice: number
  couponPrice: number
  deliveryPrice: number
  shopList: ShopItem[]
  address: Address
}
