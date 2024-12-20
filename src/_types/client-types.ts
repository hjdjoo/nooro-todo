export interface ToDo {
  [key: string]: string | boolean | number | object | undefined
  id?: number
  createdAt?: object
  updatedAt?: object
  title: string
  color: string
  complete: boolean
}