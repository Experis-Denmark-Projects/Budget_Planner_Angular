import { Category } from './category.model'

export type User = {
    id?: number,
    uid?: string,
    username?: string,
    email?: string,
    totalBudget?: number
    categories?: Category[]
}