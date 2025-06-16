'use client';

import Link from 'next/link';
import { Briefcase } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Briefcase className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl">C2C Jobs Pro</span>
            </div>
            <p className="text-gray-400">
              The premier platform for Corp-to-Corp IT hiring in the United States.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">For Job Seekers</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/jobs" className="hover:text-white">Browse Jobs</Link></li>
              <li><Link href="/post-hotlist" className="hover:text-white">Post Profile</Link></li>
              <li><Link href="/consultants" className="hover:text-white">View Consultants</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">For Employers</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/consultants" className="hover:text-white">Find Consultants</Link></li>
              <li><Link href="/post-job" className="hover:text-white">Post a Job</Link></li>
              <li><Link href="/hotlist" className="hover:text-white">Browse Hotlist</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 C2C Jobs Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}