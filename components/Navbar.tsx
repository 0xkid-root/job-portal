'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  Menu,
  X,
  Plus,
  UserPlus
} from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Logo/>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/jobs" className="text-gray-700 hover:text-blue-600 transition-colors">
              Jobs
            </Link>
            <Link href="/consultants" className="text-gray-700 hover:text-blue-600 transition-colors">
              Consultants
            </Link>
            <Link href="/hotlist" className="text-gray-700 hover:text-blue-600 transition-colors">
              Hotlist
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/post-job">
                  <Plus className="h-4 w-4 mr-1" />
                  Post Job
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/post-hotlist">
                  <UserPlus className="h-4 w-4 mr-1" />
                  Post Hotlist
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t">
            <Link 
              href="/jobs" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Jobs
            </Link>
            <Link 
              href="/consultants" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Consultants
            </Link>
            <Link 
              href="/hotlist" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hotlist
            </Link>
            <div className="flex flex-col space-y-2 px-3 pt-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/post-job" onClick={() => setIsMobileMenuOpen(false)}>
                  <Plus className="h-4 w-4 mr-1" />
                  Post Job
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/post-hotlist" onClick={() => setIsMobileMenuOpen(false)}>
                  <UserPlus className="h-4 w-4 mr-1" />
                  Post Hotlist
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}