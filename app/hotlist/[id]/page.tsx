'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function HotlistDetailPage() {
  const params = useParams();
  const [hotlist, setHotlist] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotlistDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/hotlist/${params.id}`);
        const data = await response.json();
        
        if (data.success) {
          setHotlist(data.data);
        } else {
          throw new Error(data.error || 'Failed to fetch hotlist details');
        }
      } catch (error) {
        console.error('Error fetching hotlist details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchHotlistDetail();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!hotlist) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Hotlist not found
              </h3>
              <p className="text-gray-600 mb-4">
                The hotlist post you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/hotlist">
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Hotlist
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/hotlist">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Hotlist
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{hotlist.title}</CardTitle>
            {hotlist.screenshot && (
              <div className="mt-4 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={hotlist.screenshot}
                  alt="Hotlist Screenshot"
                  className="w-full h-auto object-contain max-h-[500px]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            )}
            <div className="text-sm text-gray-500">
              Posted on {new Date(hotlist.createdAt).toLocaleDateString()}
            </div>
          </CardHeader>
          
          <CardContent>
            <div 
              className="prose max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: hotlist.content }}
            />
            
            <div className="flex items-center justify-between border-t pt-6">
              <div className="text-sm text-gray-600">
                <div className="font-semibold">Contact Recruiter:</div>
                {hotlist.recruiterEmail}
              </div>
              
              <Button
                onClick={() => window.location.href = `mailto:${hotlist.recruiterEmail}`}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}