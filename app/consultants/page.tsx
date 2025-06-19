// 'use client';

// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Navbar from '@/components/Navbar';
// import ConsultantCard from '@/components/ConsultantCard';
// import SearchFilters from '@/components/SearchFilters';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Users, Search, Filter, Grid, List, ChevronLeft, ChevronRight, Download, MessageCircle } from 'lucide-react';

// export default function ConsultantsPage() {
//   const searchParams = useSearchParams();
//   const [consultants, setConsultants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({});
//   const [sortBy, setSortBy] = useState('recent');
//   const [viewMode, setViewMode] = useState('grid');
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 12,
//     total: 0,
//     pages: 0
//   });

//   // Sample consultant data
//   const sampleConsultants = [
//     {
//       _id: '1',
//       firstName: 'Alex',
//       lastName: 'Rodriguez',
//       email: 'alex.rodriguez@email.com',
//       location: 'Dallas, TX',
//       skills: ['React', 'Next.js', 'TypeScript', 'GraphQL', 'AWS'],
//       experience: 7,
//       hourlyRate: 88,
//       availability: 'available',
//       bio: 'Frontend specialist with deep expertise in React ecosystem. Built multiple high-traffic applications with modern JavaScript frameworks.',
//       visa: 'Green Card'
//     },
//     {
//       _id: '2',
//       firstName: 'Priya',
//       lastName: 'Patel',
//       email: 'priya.patel@email.com',
//       location: 'San Jose, CA',
//       skills: ['Java', 'Spring', 'Microservices', 'Docker', 'Jenkins'],
//       experience: 9,
//       hourlyRate: 102,
//       availability: 'open-to-offers',
//       bio: 'Senior Java Developer with extensive experience in enterprise applications. Expert in microservices architecture and cloud deployment.',
//       visa: 'H1B'
//     },
//     {
//       _id: '3',
//       firstName: 'Robert',
//       lastName: 'Kim',
//       email: 'robert.kim@email.com',
//       location: 'Atlanta, GA',
//       skills: ['Python', 'Machine Learning', 'TensorFlow', 'AWS', 'Docker'],
//       experience: 6,
//       hourlyRate: 95,
//       availability: 'available',
//       bio: 'Data Scientist and ML Engineer with strong Python skills. Experience in building and deploying machine learning models at scale.',
//       visa: 'US Citizen'
//     },
//     {
//       _id: '4',
//       firstName: 'Maria',
//       lastName: 'Garcia',
//       email: 'maria.garcia@email.com',
//       location: 'Miami, FL',
//       skills: ['Angular', 'TypeScript', 'Node.js', 'MongoDB', 'Azure'],
//       experience: 5,
//       hourlyRate: 78,
//       availability: 'available',
//       bio: 'Full Stack Developer with strong Angular and Node.js experience. Passionate about creating efficient and scalable web applications.',
//       visa: 'L2 EAD'
//     },
//     {
//       _id: '5',
//       firstName: 'James',
//       lastName: 'Thompson',
//       email: 'james.thompson@email.com',
//       location: 'Denver, CO',
//       skills: ['DevOps', 'Kubernetes', 'Terraform', 'AWS', 'Python'],
//       experience: 8,
//       hourlyRate: 98,
//       availability: 'open-to-offers',
//       bio: 'DevOps Engineer specializing in cloud infrastructure and automation. Expert in containerization and infrastructure as code.',
//       visa: 'US Citizen'
//     },
//     {
//       _id: '6',
//       firstName: 'Aisha',
//       lastName: 'Mohammed',
//       email: 'aisha.mohammed@email.com',
//       location: 'Phoenix, AZ',
//       skills: ['C#', '.NET Core', 'SQL Server', 'Azure', 'React'],
//       experience: 6,
//       hourlyRate: 85,
//       availability: 'available',
//       bio: '.NET Developer with full stack capabilities. Strong experience in enterprise applications and cloud migration projects.',
//       visa: 'F1 OPT'
//     }
//   ];

//   useEffect(() => {
//     // Set initial search from URL params
//     const initialSearch = searchParams.get('search');
//     if (initialSearch) {
//       setFilters({ keyword: initialSearch });
//     }
//   }, [searchParams]);

//   useEffect(() => {
//     // Simulate loading
//     setLoading(true);
//     setTimeout(() => {
//       setConsultants(sampleConsultants);
//       setPagination(prev => ({
//         ...prev,
//         total: sampleConsultants.length,
//         pages: Math.ceil(sampleConsultants.length / prev.limit)
//       }));
//       setLoading(false);
//     }, 1000);
//   }, [filters, sortBy, pagination.page]);

//   const handleFiltersChange = (newFilters: any) => {
//     setFilters(newFilters);
//     setPagination(prev => ({ ...prev, page: 1 }));
//   };

//   const handlePageChange = (newPage: number) => {
//     setPagination(prev => ({ ...prev, page: newPage }));
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleContact = (consultantId: string) => {
//     // Simulate contact action
//     alert('Contact functionality would be implemented here');
//   };

//   const handleDownloadResume = (resumeUrl: string) => {
//     // Simulate resume download
//     alert('Resume download functionality would be implemented here');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Find Consultants
//           </h1>
//           <p className="text-gray-600">
//             Connect with qualified IT consultants for your C2C opportunities
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Filters Sidebar */}
//           <div className="lg:w-80 flex-shrink-0">
//             <SearchFilters 
//               onFiltersChange={handleFiltersChange}
//               type="consultants"
//             />
//           </div>

//           {/* Main Content */}
//           <div className="flex-1">
//             {/* Toolbar */}
//             <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                 <div className="flex items-center space-x-4">
//                   <div className="text-sm text-gray-600">
//                     {loading ? 'Loading...' : `${pagination.total} consultants found`}
//                   </div>
//                   {Object.keys(filters).length > 0 && (
//                     <Badge variant="secondary">
//                       {Object.keys(filters).length} filter{Object.keys(filters).length > 1 ? 's' : ''} applied
//                     </Badge>
//                   )}
//                 </div>
                
//                 <div className="flex items-center space-x-4">
//                   <Select value={sortBy} onValueChange={setSortBy}>
//                     <SelectTrigger className="w-40">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="recent">Most Recent</SelectItem>
//                       <SelectItem value="rate">Highest Rate</SelectItem>
//                       <SelectItem value="experience">Most Experienced</SelectItem>
//                       <SelectItem value="availability">Available First</SelectItem>
//                     </SelectContent>
//                   </Select>
                  
//                   <div className="flex rounded-md border">
//                     <Button
//                       variant={viewMode === 'grid' ? 'default' : 'ghost'}
//                       size="sm"
//                       onClick={() => setViewMode('grid')}
//                       className="rounded-r-none"
//                     >
//                       <Grid className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant={viewMode === 'list' ? 'default' : 'ghost'}
//                       size="sm"
//                       onClick={() => setViewMode('list')}
//                       className="rounded-l-none"
//                     >
//                       <List className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Consultants Grid/List */}
//             {loading ? (
//               <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {[...Array(6)].map((_, i) => (
//                   <Card key={i} className="animate-pulse">
//                     <CardHeader>
//                       <div className="flex items-center space-x-4">
//                         <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
//                         <div className="flex-1">
//                           <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                           <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                         </div>
//                       </div>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="space-y-2">
//                         <div className="h-3 bg-gray-200 rounded"></div>
//                         <div className="h-3 bg-gray-200 rounded w-5/6"></div>
//                         <div className="h-3 bg-gray-200 rounded w-4/6"></div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             ) : consultants.length === 0 ? (
//               <Card className="text-center py-12">
//                 <CardContent>
//                   <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">
//                     No consultants found
//                   </h3>
//                   <p className="text-gray-600 mb-4">
//                     Try adjusting your search criteria or filters
//                   </p>
//                   <Button onClick={() => setFilters({})}>
//                     Clear All Filters
//                   </Button>
//                 </CardContent>
//               </Card>
//             ) : (
//               <div className={
//                 viewMode === 'grid' 
//                   ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6' 
//                   : 'space-y-4'
//               }>
//                 {consultants.map((consultant: any) => (
//                   <ConsultantCard
//                     key={consultant._id}
//                     consultant={consultant}
//                     onContact={handleContact}
//                     onDownloadResume={handleDownloadResume}
//                   />
//                 ))}
//               </div>
//             )}

//             {/* Pagination */}
//             {pagination.pages > 1 && (
//               <div className="mt-8 flex items-center justify-center space-x-2">
//                 <Button
//                   variant="outline"
//                   onClick={() => handlePageChange(pagination.page - 1)}
//                   disabled={pagination.page === 1}
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                   Previous
//                 </Button>
                
//                 <div className="flex space-x-1">
//                   {[...Array(Math.min(5, pagination.pages))].map((_, i) => {
//                     const pageNum = i + 1;
//                     return (
//                       <Button
//                         key={pageNum}
//                         variant={pagination.page === pageNum ? 'default' : 'outline'}
//                         size="sm"
//                         onClick={() => handlePageChange(pageNum)}
//                       >
//                         {pageNum}
//                       </Button>
//                     );
//                   })}
//                 </div>
                
//                 <Button
//                   variant="outline"
//                   onClick={() => handlePageChange(pagination.page + 1)}
//                   disabled={pagination.page === pagination.pages}
//                 >
//                   Next
//                   <ChevronRight className="h-4 w-4" />
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import Navbar from '@/components/Navbar';

export default function ConsultantsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar user={null} />

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 animate-pulse">
            Coming Soon
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-md mx-auto">
            We're working hard to bring you something amazing. Stay tuned for updates!
          </p>
          <div className="mt-6">
            <svg
              className="w-16 h-16 mx-auto text-indigo-500 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}