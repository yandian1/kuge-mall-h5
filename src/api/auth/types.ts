export type LoginRes = {
  token: string
  cartCount: number
  user: {
    id: ID
    name: string
    account: string
  }
}

export type RegisterRes = {
  token: string
  user: {
    id: ID
    name: string
    account: string
  }
}
