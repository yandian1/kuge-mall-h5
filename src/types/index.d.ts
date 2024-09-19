declare type Recordable = Record<string, any>

declare type ID = number | string

declare type R<D = any> = {
  code: number
  msg: string
  data: D
}

declare type PageData<I> = {
  pageNum: number
  pageSize: number
  list: I[]
  total: number
}

declare type Nullable<T> = T | undefined

declare type Blankable<T> = T | ''

declare type NullableID = Nullable<number | string>