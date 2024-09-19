export type CardGoods = {
  cartId: ID
  spuId: ID
  skuId: ID
  name: string
  attrs: string
  img: string
  num: string
  stock: string
  price: string
  selected: boolean
}

export type ShopItem = {
  id: ID
  name: string
  selected: boolean
  indeterminate: boolean
  goodsList: CardGoods[]
}

export type CartInfo = {
  totalPrice: number
  totalSelected: boolean
  indeterminate: boolean
  shopList: ShopItem[]
}
