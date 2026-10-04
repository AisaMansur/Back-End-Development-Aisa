'use client';

import { useState, useEffect } from 'react';
import UserCard from '@/components/UserCard';

// Tipe data untuk User
interface User {
  id: number | string;
  name: string;
  email: string;
  [key: string]: any;
}

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('/api/users');
        const data = await res.res ? await res.json() : await res.json();
        setUsers(Array.isArray(data) ? data : data.users || []);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Directory</h1>
          <p className="text-gray-500 text-sm">Manage and view user profiles</p>
        </div>
        <input
          type="text"
          placeholder="Search user by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <p className="text-gray-500 text-center py-10">Loading users...</p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}