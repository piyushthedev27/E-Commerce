'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo with Icon */}
        <Link href="/" className="flex items-center space-x-2">
          <ShoppingBag className="w-7 h-7 text-blue-600" />
          <span className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">ShopGenie</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 text-lg font-bold">
          <Link href="/admin" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
            Admin
          </Link>
          <Link href="/create" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
            Create
          </Link>
          <Link href="/account" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
            Account
          </Link>
        </div>
      </div>
    </nav>
  );
}
