import { Expense } from './expense.model'
import { User } from './user.model'

export type Category = {
    id?: number,
    name?: string,
    user?: User,
    expenses?: Expense[]
}