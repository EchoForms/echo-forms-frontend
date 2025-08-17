export async function fetchUsers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`);
  if (!res.ok) throw new Error('Failed to fetch users');
  const data = await res.json();
  console.log(data);
  return data;
}

export async function createUser(data: { name: string; username: string; email: string; password: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create user');
  console.log(res.json());
  return res.json();
} 