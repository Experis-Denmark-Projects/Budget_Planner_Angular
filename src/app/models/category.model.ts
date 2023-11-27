import { DatePipe } from '@angular/common'

export type Category = {
  id?: number,
  name?: string,
  created?: Date,
  lastModified?: Date,
  user?: number,
  expenses?: number[],
  sharedCategories?: number[]
}