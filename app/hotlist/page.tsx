'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import HotlistCard from '@/components/HotlistCard';
import SearchFilters from '@/components/SearchFilters';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HotlistPage() {
  const searchParams = useSearchParams();
  const [hotlists, setHotlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('recent');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    const fetchHotlists = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/hotlist');
        const data = await response.json();
        console.log(data,"data i shere whjy ypu are fear");
        
        if (data.success) {
          setHotlists(data.data);
          setPagination(prev => ({
            ...prev,
            total: data.data.length,
            pages: Math.ceil(data.data.length / prev.limit)
          }));
        } else {
          throw new Error(data.error || 'Failed to fetch hotlists');
        }
      } catch (error) {
        console.error('Error fetching hotlists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotlists();
  }, [filters, sortBy, pagination.page]);

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={null} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hotlist Jobs
          </h1>
          <p className="text-gray-600">
            Discover the latest job opportunities posted by recruiters
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {/* <div className="lg:w-80 flex-shrink-0">
            <SearchFilters 
              onFiltersChange={handleFiltersChange}
              type="consultants"
            />
          </div> */}

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    {loading ? 'Loading...' : `${pagination.total} hotlist posts found`}
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
                    </SelectContent>
                  </Select>
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
            ) : hotlists.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No hotlist posts found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    No job posts available at the moment. Please check back later
                  </p>
                  <Button onClick={() => setFilters({})}>
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {hotlists.map((hotlist: any) => (
                  <HotlistCard
                    key={hotlist._id}
                    hotlist={hotlist}
                    onContact={(email) => window.location.href = `mailto:${email}`}
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