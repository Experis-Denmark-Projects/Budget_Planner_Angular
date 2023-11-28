export enum CategorySortingOptions {
  alphabetic = 'Alphabetic',
  lastModified = 'LastModified',
  created = 'Created',
  ascending = 'Ascending',
  descending = 'Descending'
}

export type Category = {
  id?: number,
  name?: string,
  created?: Date,
  lastModified?: Date,
  user?: number,
  expenses?: number[],
  sharedCategories?: number[]
}