'use client';

import { useState, useEffect } from 'react';
import UserCard from '@/components/UserCard';
import { Input } from '@/components/ui/input';

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Ambil data user dari API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);

  // Filter user berdasarkan input pencarian
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Header & Search Bar shadcn/ui */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Daftar Pengguna</h2>
        
        <div className="w-full md:w-72">
          <Input
            type="text"
            placeholder="Cari nama user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Loading & Daftar User */}
      {loading ? (
        <p className="text-center text-gray-500 py-10">Memuat data user...</p>
      ) : (
        <>
          {filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">
              User dengan nama "{searchTerm}" tidak ditemukan.
            </p>
          )}
        </>
      )}
    </div>
  );
}