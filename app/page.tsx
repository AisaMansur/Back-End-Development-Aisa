'use client';

import { useState, useEffect } from 'react';
import UserCard from '@/components/UserCard';

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Hero / Banner Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 rounded-2xl shadow-lg text-center my-4">
        <h1 className="text-3xl font-extrabold mb-2">Selamat Datang di User Directory</h1>
        <p className="text-emerald-100 max-w-xl mx-auto text-sm">
          Temukan dan kelola informasi pengguna dengan cepat, efisien, dan responsif. Tambahkan pengguna favorit Anda ke dalam daftar khusus!
        </p>
      </section>

      {/* Search Input Section */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">Daftar Pengguna</h2>
        <input
          type="text"
          placeholder="Cari berdasarkan nama atau email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 font-medium">Memuat data user...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 font-medium">Tidak ada pengguna yang ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}