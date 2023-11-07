import { Expense } from './expense.model'
import { User } from './user.model'

export type Category = {
    id?: number,
    uid?: string,
    user?: User,
    expenses: Expense[]
}