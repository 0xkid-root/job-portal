'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ConsultantCard from '@/components/ConsultantCard';
import SearchFilters from '@/components/SearchFilters';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Search, Filter, Grid, List, ChevronLeft, ChevronRight, Download, MessageCircle } from 'lucide-react';

export default function HotlistPage() {
  const searchParams = useSearchParams();
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });

  // Sample consultant data
  const sampleConsultants = [
    {
      _id: '1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      location: 'New York, NY',
      skills: ['React', 'Node.js', 'AWS', 'TypeScript', 'MongoDB'],
      experience: 8,
      hourlyRate: 95,
      availability: 'available',
      bio: 'Senior Full Stack Developer with 8+ years of experience in building scalable web applications. Expertise in React, Node.js, and cloud technologies.',
      visa: 'H1B'
    },
    {
      _id: '2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.j@email.com',
      location: 'San Francisco, CA',
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Kubernetes'],
      experience: 6,
      hourlyRate: 85,
      availability: 'open-to-offers',
      bio: 'Python Developer specializing in backend systems and DevOps. Strong experience with containerization and microservices architecture.',
      visa: 'Green Card'
    },
    {
      _id: '3',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@email.com',
      location: 'Austin, TX',
      skills: ['Java', 'Spring Boot', 'Microservices', 'Kafka', 'Redis'],
      experience: 10,
      hourlyRate: 110,
      availability: 'available',
      bio: 'Senior Java Developer with extensive experience in enterprise applications and distributed systems. Expert in Spring ecosystem and event-driven architecture.',
      visa: 'US Citizen'
    },
    {
      _id: '4',
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@email.com',
      location: 'Chicago, IL',
      skills: ['Angular', 'TypeScript', 'C#', '.NET', 'Azure'],
      experience: 7,
      hourlyRate: 90,
      availability: 'available',
      bio: 'Full Stack .NET Developer with strong frontend skills in Angular. Experience with Azure cloud services and enterprise application development.',
      visa: 'L1'
    },
    {
      _id: '5',
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.wilson@email.com',
      location: 'Seattle, WA',
      skills: ['DevOps', 'AWS', 'Terraform', 'Jenkins', 'Python'],
      experience: 9,
      hourlyRate: 105,
      availability: 'open-to-offers',
      bio: 'DevOps Engineer with 9+ years of experience in cloud infrastructure and automation. Specialized in AWS, Infrastructure as Code, and CI/CD pipelines.',
      visa: 'H1B'
    },
    {
      _id: '6',
      firstName: 'Lisa',
      lastName: 'Anderson',
      email: 'lisa.anderson@email.com',
      location: 'Boston, MA',
      skills: ['React', 'Vue.js', 'JavaScript', 'GraphQL', 'Node.js'],
      experience: 5,
      hourlyRate: 80,
      availability: 'available',
      bio: 'Frontend Developer with expertise in modern JavaScript frameworks. Strong experience in building responsive and interactive user interfaces.',
      visa: 'F1 OPT'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setConsultants(sampleConsultants);
      setPagination(prev => ({
        ...prev,
        total: sampleConsultants.length,
        pages: Math.ceil(sampleConsultants.length / prev.limit)
      }));
      setLoading(false);
    }, 1000);
  }, [filters, sortBy, pagination.page]);

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContact = (consultantId: string) => {
    // Simulate contact action
    alert('Contact functionality would be implemented here');
  };

  const handleDownloadResume = (resumeUrl: string) => {
    // Simulate resume download
    alert('Resume download functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Consultant Hotlist
          </h1>
          <p className="text-gray-600">
            Discover qualified IT consultants available for C2C opportunities
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <SearchFilters 
              onFiltersChange={handleFiltersChange}
              type="consultants"
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    {loading ? 'Loading...' : `${pagination.total} consultants found`}
                  </div>
                  {Object.keys(filters).length > 0 && (
                    <Badge variant="secondary">
                      {Object.keys(filters).length} filter{Object.keys(filters).length > 1 ? 's' : ''} applied
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center space-x-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="rate">Highest Rate</SelectItem>
                      <SelectItem value="experience">Most Experienced</SelectItem>
                      <SelectItem value="availability">Available First</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex rounded-md border">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-r-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Consultants Grid/List */}
            {loading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : consultants.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No consultants found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button onClick={() => setFilters({})}>
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6' 
                  : 'space-y-4'
              }>
                {consultants.map((consultant: any) => (
                  <ConsultantCard
                    key={consultant._id}
                    consultant={consultant}
                    onContact={handleContact}
                    onDownloadResume={handleDownloadResume}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="mt-8 flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <div className="flex space-x-1">
                  {[...Array(Math.min(5, pagination.pages))].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={pagination.page === pageNum ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}