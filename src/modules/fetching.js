export function waitFor(ms, param) {
	return new Promise(resolve => setTimeout(() => resolve(param), ms));
}

export function checkResponse(response) {
	if (!response.ok) throw { message:response.statusText, status:response.status };
	else return response;
}