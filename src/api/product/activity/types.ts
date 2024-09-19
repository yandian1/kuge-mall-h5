export type Activity = {
  id: ID
  name: string
  banner: string
  sections: Array<{
    title: string
    goodsList: Array<{
      id: ID
      img: string
      name: string
      intro: string
      price: number
      linePrice: number
    }>
  }>
}