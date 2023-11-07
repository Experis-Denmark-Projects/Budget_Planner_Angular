import { Category } from './category.model'

export type Expense = {
    id?: number,
    name: string,
    amount?: number,
    category?: Category
}