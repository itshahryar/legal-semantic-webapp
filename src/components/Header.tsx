import Link from 'next/link';
import { Scale } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-slate-900 p-2 rounded-lg">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">LexisSearch</h1>
              <p className="text-xs text-slate-500">Legal Document Intelligence</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/search"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Search
            </Link>
            <Link 
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Home
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
