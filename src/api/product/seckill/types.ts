export type Seckill = {
  id: ID
  name: string
  banner: string
  timeList: Array<{
    spuList: Array<{
      id: ID
      img: string
      name: string
      intro: string
      price: number
      linePrice: number
    }>
    type: 'opening' | 'notOpen'
    startTime: string
    surplus: number
  }>
}