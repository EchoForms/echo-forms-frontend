import { fetchUsers } from '../../lib/api';

export default async function UsersPage() {
  const users = await fetchUsers();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((u: any) => (
          <li key={u.id}>{u.name} ({u.email})</li>
        ))}
      </ul>
      {/* For user creation, use a client component below if needed */}
    </div>
  );
} 