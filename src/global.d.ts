interface Context {
	username: string
	token: string
	refreshToken: (newToken: string) => void
}

interface Transaction {
	transaction_id: number
	name: string
	timestamp: string
	notes: string | null
	amount: number
	category_id: number | null
	account_id: number | null
}
interface DisplayTransaction {
	transaction_id: number
	name: string
	timestamp: string
	amount: number
	category_name: string
	account_name: string
}

interface NewTransaction {
	name: string
	timestamp: string
	notes: string | null
	amount: number
	category_id: number | null
	account_id: number | null
}

interface Category {
	category_id: number
	name: string
	description: string | null
}
interface CategoryLite {
	category_id: number
	name: string
}
interface Account {
	account_id: number
	name: string
	description: string | null
}
interface AccountLite {
	account_id: number
	name: string
}
