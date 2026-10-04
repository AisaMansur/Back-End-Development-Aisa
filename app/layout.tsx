import './globals.css';
import { FavProvider } from '@/context/FavContext';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'User Directory App',
  description: 'Assignment Front-End Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-800 min-h-screen">
        <FavProvider>
          <Navbar />
          <main className="max-w-5xl mx-auto p-6">{children}</main>
        </FavProvider>
      </body>
    </html>
  );
}