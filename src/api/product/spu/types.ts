export type SpuPage = {
  id: ID
  name: string
  price: number
  linePrice: number
  firstImg: string
}


export type Attr = {
  id: ID
  name: string
  children: Attr[]
}

export type Sku = {
  id: ID
  name: string
  price: Nullable<number>
  linePrice: Nullable<number>
  img: string
  attrs: string
  stock: number
}

export type SpuDetail = {
  id: ID
  name: string
  price: Nullable<number>
  firstImg: string
  detail: string
  services: string[]
  imgList: string[]
  skus: Sku[]
  attrs: Attr[]
}
