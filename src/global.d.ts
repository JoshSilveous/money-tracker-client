interface Context {
	username: string
	token: string
	refreshToken: (newToken: string) => void
}
