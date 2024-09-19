type SwipeItem = {
  img: string
  target: string
}

type GridItem = {
  img: string
  target: string
  title: string
}

type GoodsItem = {
  id: ID
  firstImg: string
  name: string
  price: number
  createTime: string
  updateTime: string
}

type GoodsTab = {
  title: string
  subTitle: string
  goodsList: GoodsItem[]
}

export type Homepage = {
  id: ID
  swipeList: SwipeItem[]
  gridList: GridItem[]
  seckill: {
    id: Nullable<ID>
    goodsList: GoodsItem[]
  }
  goodsTabs: GoodsTab[]
}