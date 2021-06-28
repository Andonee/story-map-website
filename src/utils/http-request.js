export const httpRequest = async (url, method = 'GET', body) => {
	const request = await fetch(url, {
		method: method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: body ? JSON.stringify(body) : undefined,
	})

	return request
}
