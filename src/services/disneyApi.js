import axios from 'axios';

const api = axios.create({
	baseURL: 'https://api.disneyapi.dev',
});

export async function fetchCharacters({ page = 1, pageSize = 50, name }) {
	const params = { page, pageSize };
	if (name) params.name = name;
	const { data } = await api.get('/character', { params });
	return data;
}


