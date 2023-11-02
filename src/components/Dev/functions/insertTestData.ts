export function insertTestData(
	context: Context,
	devCatsList: CategoryLite[],
	devActsList: AccountLite[]
) {
	const today = new Date()
	const yesterday = new Date(today)
	yesterday.setDate(yesterday.getDate() - 1)

	const twoDaysAgo = new Date(today)
	twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

	const threeDaysAgo = new Date(today)
	threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

	function formatDate(date: Date) {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		return `${year}-${month}-${day}`
	}

	function getRandomArrayItem(array: any[]) {
		const randomIndex = Math.floor(Math.random() * array.length)
		return array[randomIndex]
	}

	const todayFormatted = formatDate(today)
	const yesterdayFormatted = formatDate(yesterday)
	const twoDaysAgoFormatted = formatDate(twoDaysAgo)
	const threeDaysAgoFormatted = formatDate(threeDaysAgo)

	const testData: NewTransaction[] = [
		{
			name: 'Coffee Shop',
			timestamp: threeDaysAgoFormatted,
			notes: 'Morning latte',
			amount: 4.5,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Grocery Store',
			timestamp: threeDaysAgoFormatted,
			notes: "Week's groceries",
			amount: 75.2,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Gas Station',
			timestamp: threeDaysAgoFormatted,
			notes: 'Fill up the car',
			amount: 40.0,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Restaurant',
			timestamp: threeDaysAgoFormatted,
			notes: 'Dinner with friends',
			amount: 60.75,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Online Shopping',
			timestamp: threeDaysAgoFormatted,
			notes: 'New shoes',
			amount: 85.99,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Movie Theater',
			timestamp: threeDaysAgoFormatted,
			notes: 'Movie night',
			amount: 12.5,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Gym Membership',
			timestamp: threeDaysAgoFormatted,
			notes: 'Monthly subscription',
			amount: 30.0,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Utility Bill',
			timestamp: threeDaysAgoFormatted,
			notes: 'Electricity bill',
			amount: 50.25,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Pharmacy',
			timestamp: threeDaysAgoFormatted,
			notes: 'Prescription medication',
			amount: 15.3,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Bookstore',
			timestamp: twoDaysAgoFormatted,
			notes: 'New book purchase',
			amount: 20.0,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Coffee Shop',
			timestamp: twoDaysAgoFormatted,
			notes: 'Afternoon coffee',
			amount: 3.75,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Clothing Store',
			timestamp: twoDaysAgoFormatted,
			notes: 'T-shirt purchase',
			amount: 18.99,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Grocery Store',
			timestamp: twoDaysAgoFormatted,
			notes: 'Fresh produce',
			amount: 35.6,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Fast Food',
			timestamp: twoDaysAgoFormatted,
			notes: 'Lunch on the go',
			amount: 9.95,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Online Subscription',
			timestamp: twoDaysAgoFormatted,
			notes: 'Streaming service',
			amount: 12.99,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Home Improvement',
			timestamp: twoDaysAgoFormatted,
			notes: 'Paint and supplies',
			amount: 55.0,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Dentist',
			timestamp: twoDaysAgoFormatted,
			notes: 'Dental checkup',
			amount: 75.5,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Gas Station',
			timestamp: twoDaysAgoFormatted,
			notes: 'Top up gas',
			amount: 30.0,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Coffee Shop',
			timestamp: yesterdayFormatted,
			notes: 'Meeting with client',
			amount: 6.25,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Restaurant',
			timestamp: yesterdayFormatted,
			notes: 'Date night',
			amount: 100.5,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Pharmacy',
			timestamp: yesterdayFormatted,
			notes: 'Over-the-counter medicine',
			amount: 10.75,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Grocery Store',
			timestamp: yesterdayFormatted,
			notes: 'Snack items',
			amount: 22.45,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Movie Theater',
			timestamp: yesterdayFormatted,
			notes: 'Family movie outing',
			amount: 45.0,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Fitness Class',
			timestamp: yesterdayFormatted,
			notes: 'Yoga class',
			amount: 20.0,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Online Shopping',
			timestamp: yesterdayFormatted,
			notes: 'Electronics purchase',
			amount: 199.99,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Coffee Shop',
			timestamp: yesterdayFormatted,
			notes: 'Iced coffee',
			amount: 4.25,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Gas Station',
			timestamp: todayFormatted,
			notes: 'Fuel for the week',
			amount: 35.5,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Clothing Store',
			timestamp: todayFormatted,
			notes: 'Jeans purchase',
			amount: 45.75,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Grocery Store',
			timestamp: todayFormatted,
			notes: 'Household essentials',
			amount: 28.3,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
		{
			name: 'Restaurant',
			timestamp: todayFormatted,
			notes: 'Lunch with colleagues',
			amount: 25.0,
			category_id: getRandomArrayItem(devCatsList).category_id,
			account_id: getRandomArrayItem(devActsList).account_id,
		},
	]

	function insertTransaction(transaction: NewTransaction) {
		const apiUrl = 'http://localhost:3000/api/inserttransaction'

		const data = {
			username: context.username,
			token: context.token,
			payload: transaction,
		}
		const headers = {
			'Content-Type': 'application/json',
		}
		const requestOptions = {
			method: 'POST',
			headers,
			body: JSON.stringify(data),
		}
		fetch(apiUrl, requestOptions)
			.then((res) => {
				if (res.ok) {
					return res.json()
				} else {
					throw new Error(res.statusText)
				}
			})
			.then((data) => {
				console.log(
					`Transaction "${transaction.name}" created, transaction_id is ${data.transaction_id}.`
				)
			})
			.catch((err) => {
				console.error(err)
			})
	}

	testData.forEach((item) => insertTransaction(item))
}
