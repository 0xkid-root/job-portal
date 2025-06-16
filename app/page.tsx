'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import JobCard from '@/components/JobCard';
import ConsultantCard from '@/components/ConsultantCard';
import { 
  Search, 
  Users, 
  Briefcase, 
  TrendingUp, 
  Star,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Crown,
  Plus,
  FileText,
  UserPlus
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [featuredConsultants, setFeaturedConsultants] = useState([]);
  const [stats, setStats] = useState({
    totalJobs: 1247,
    totalConsultants: 3892,
    totalRecruiters: 567,
    placementsThisMonth: 89
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/jobs?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Next{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              HireSphere IT
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Connect with top IT consultants and recruiters. The premier platform for 
              Corp-to-Corp hiring in the United States.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search jobs, skills, or companies..."
                  className="pl-12 pr-32 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 shadow-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2"
                >
                  Search
                </Button>
              </div>
            </form>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/jobs">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Browse Jobs
                </Link>
              </Button>
              {/* <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                <Link href="/consultants">
                  <Users className="mr-2 h-5 w-5" />
                  Find Consultants (Comming Soon)
                </Link>
              </Button> */}
              <Button size="lg" variant="outline" className="bg-green-600/20 border-green-400/30 text-white hover:bg-green-600/30" asChild>
                <Link href="/post-job">
                  <Plus className="mr-2 h-5 w-5" />
                  Post Job
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-purple-600/20 border-purple-400/30 text-white hover:bg-purple-600/30" asChild>
                <Link href="/post-hotlist">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Post Hotlist
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stats.totalJobs.toLocaleString()}+
              </div>
              <div className="text-gray-600">Active Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                {stats.totalConsultants.toLocaleString()}+
              </div>
              <div className="text-gray-600">IT Consultants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                {stats.totalRecruiters.toLocaleString()}+
              </div>
              <div className="text-gray-600">Recruiters</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                {stats.placementsThisMonth.toLocaleString()}+
              </div>
              <div className="text-gray-600">Placements This Month</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose C2C Jobs Pro?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed specifically for the C2C market, with features that matter most to IT professionals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Post Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Easily post C2C job opportunities and reach thousands of qualified IT consultants.
                </p>

              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Post Hotlist</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Share your consultant profiles and make them discoverable to recruiters.
                </p>

              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Instant Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our AI-powered matching system connects you with the most relevant opportunities in real-time.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Verified Profiles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All consultants and recruiters undergo our verification process to ensure quality and legitimacy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Jobs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
            <Button variant="outline" asChild>
              <Link href="/jobs">
                View All Jobs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Job Cards */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Senior React Developer</CardTitle>
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span>TechCorp Solutions</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-green-600">$80-100/hr</span>
                    <Badge variant="outline" className="ml-2">Remote</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">React</Badge>
                    <Badge variant="secondary" className="text-xs">Node.js</Badge>
                    <Badge variant="secondary" className="text-xs">AWS</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">DevOps Engineer</CardTitle>
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span>CloudTech Inc</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-green-600">$90-120/hr</span>
                    <Badge variant="destructive" className="ml-2">Urgent</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Docker</Badge>
                    <Badge variant="secondary" className="text-xs">Kubernetes</Badge>
                    <Badge variant="secondary" className="text-xs">Jenkins</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Full Stack Java Developer</CardTitle>
                <div className="flex items-center text-sm text-gray-600">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span>Enterprise Systems</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <span className="font-medium text-green-600">$75-95/hr</span>
                    <Badge variant="outline" className="ml-2">Hybrid</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Java</Badge>
                    <Badge variant="secondary" className="text-xs">Spring</Badge>
                    <Badge variant="secondary" className="text-xs">Angular</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of IT professionals who trust C2C Jobs Pro for their career growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/post-job">
                <Plus className="mr-2 h-5 w-5" />
                Post a Job
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
              <Link href="/post-hotlist">
                <UserPlus className="mr-2 h-5 w-5" />
                Post Consultant Profile
              </Link>
            </Button>
          </div>
        </div>
      </section>

      
    </div>
  );
}