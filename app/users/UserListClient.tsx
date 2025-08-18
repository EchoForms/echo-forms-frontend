"use client";
import { useEffect, useState } from 'react';
import { fetchUsers, createUser } from '../../lib/api/users';

export default function UserListClient() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async () => {
    setLoading(true);
    await createUser({
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });
    fetchUsers().then(setUsers).finally(() => setLoading(false));
  };

  return (
    <div>
      <button onClick={handleCreate} disabled={loading}>
        Create User
      </button>
      {loading && <p>Loading...</p>}
      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name} ({u.email})</li>
        ))}
      </ul>
    </div>
  );
} 