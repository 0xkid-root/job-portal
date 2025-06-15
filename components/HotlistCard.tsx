'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HotlistCardProps {
  hotlist: {
    _id: string;
    title: string;
    content: string;
    screenshot?: string;
    recruiterEmail: string;
    createdAt: string;
  };
  onContact?: (email: string) => void;
}

export default function HotlistCard({ hotlist, onContact }: HotlistCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/hotlist/${hotlist._id}`);
  };

  return (
    <Card 
      className="hover:shadow-lg transition-shadow duration-200 cursor-pointer" 
      onClick={handleCardClick}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{hotlist.title}</CardTitle>
        <div className="text-sm text-gray-500">
          {new Date(hotlist.createdAt).toLocaleDateString()}
        </div>
      </CardHeader>
      
      <CardContent>
        <div 
          className="text-sm text-gray-600 mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: hotlist.content }}
        />
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {hotlist.recruiterEmail}
          </div>
          
          {onContact && (
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onContact(hotlist.recruiterEmail);
              }}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Contact
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}