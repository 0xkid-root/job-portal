'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Clock, 
  Building2, 
  Eye,
  Bookmark,
  Crown,
  Zap
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: {
    _id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    skills: string[];
    remote?: boolean;
    urgent?: boolean;
    isPremium?: boolean;
    views?: number;
    createdAt: string;
  };
  onSave?: (jobId: string) => void;
  saved?: boolean;
}

export default function JobCard({ job, onSave, saved }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(saved || false);

  const handleSave = () => {
    if (onSave) {
      onSave(job._id);
      setIsSaved(!isSaved);
    }
  };



  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 relative">
      {job.isPremium && (
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Crown className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold line-clamp-2 mb-2">
              <Link 
                href={`/jobs/${job._id}`}
                className="hover:text-blue-600 transition-colors"
              >
                {job.title}
              </Link>
            </CardTitle>
            
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Building2 className="h-4 w-4 mr-1" />
              <span>{job.company}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{job.location}</span>
              {job.remote && (
                <Badge variant="outline" className="ml-2 text-xs">
                  Remote
                </Badge>
              )}
            </div>
          </div>
          
          {job.urgent && (
            <Badge variant="destructive" className="ml-2">
              <Zap className="h-3 w-3 mr-1" />
              Urgent
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-4">
          {job.skills.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{job.skills.length - 4} more
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            <span>{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>
            <span className="mx-2 flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              {job.views}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className={isSaved ? 'text-blue-600' : 'text-gray-400'}
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            </Button>
            <Button size="sm" asChild>
              <Link href={`/jobs/${job._id}`}>
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}