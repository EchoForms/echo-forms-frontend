import api from './axios';

export async function fetchUsers() {
  const res = await api.get('/users/');
  return res.data;
}

export async function createUser(data: { name: string; username: string; email: string; password: string }) {
  const res = await api.post('/users/', data);
  return res.data;
}

export async function loginUser(data: { username: string; password: string }) {
  const res = await api.post('/users/login', data);
  return res.data;
}

export async function fetchCurrentUser() {
  const res = await api.get('/users/me');
  return res.data;
} 