'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const FavContext = createContext();

export function FavProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Ambil data favorit dari localStorage saat aplikasi pertama kali dibuka
  useEffect(() => {
    const saved = localStorage.getItem('fav_users');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing favorites from localStorage', e);
      }
    }
  }, []);

  // Fungsi Tambah / Hapus Favorit & simpan ke localStorage
  const toggleFavorite = (user) => {
    let updated;
    if (favorites.some((fav) => fav.id === user.id)) {
      updated = favorites.filter((fav) => fav.id !== user.id);
    } else {
      updated = [...favorites, user];
    }
    setFavorites(updated);
    localStorage.setItem('fav_users', JSON.stringify(updated));
  };

  return (
    <FavContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavContext.Provider>
  );
}

export const useFav = () => useContext(FavContext);