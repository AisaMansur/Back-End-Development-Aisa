'use client';
import { useFav } from '@/context/FavContext';

export default function UserCard({ user }) {
  const { favorites, toggleFavorite } = useFav();
  const isFav = favorites.some((f) => f.id === user.id);

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition">
      <div>
        <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-3">
          {user.name ? user.name.charAt(0) : 'U'}
        </div>
        <h3 className="font-bold text-lg text-gray-800">{user.name}</h3>
        <p className="text-sm text-gray-500">{user.email}</p>
        <p className="text-xs text-blue-500 font-medium mt-1">{user.company?.name}</p>
      </div>

      <button
        onClick={() => toggleFavorite(user)}
        className={`mt-4 w-full py-2 px-4 rounded-lg text-sm font-medium transition ${
          isFav
            ? 'bg-red-50 text-red-600 hover:bg-red-100'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isFav ? 'Hapus dari Favorit' : 'Tambah Favorit'}
      </button>
    </div>
  );
}