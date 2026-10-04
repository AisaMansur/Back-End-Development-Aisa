'use client';
import Link from 'next/link';
import { useFav } from '@/context/FavContext';

export default function Navbar() {
  const { favorites } = useFav();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">User Directory</h1>
        <nav className="flex gap-4">
          <Link href="/" className="font-semibold text-gray-700 hover:text-blue-600 transition">
            Daftar User
          </Link>
          <Link href="/favorites" className="font-semibold text-gray-700 hover:text-blue-600 transition">
            Favorites <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full ml-1">{favorites.length}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}