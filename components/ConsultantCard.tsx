'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  DollarSign, 
  Calendar,
  Star,
  MessageCircle,
  Download
} from 'lucide-react';

interface ConsultantCardProps {
  consultant: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    location?: string;
    skills: string[];
    experience?: number;
    hourlyRate?: number;
    availability: string;
    profilePicture?: string;
    bio?: string;
    resume?: string;
  };
  onContact?: (consultantId: string) => void;
  onDownloadResume?: (resumeUrl: string) => void;
}

export default function ConsultantCard({ 
  consultant, 
  onContact, 
  onDownloadResume 
}: ConsultantCardProps) {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'open-to-offers':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAvailability = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'Available';
      case 'open-to-offers':
        return 'Open to Offers';
      case 'not-available':
        return 'Not Available';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={consultant.profilePicture} alt={consultant.firstName} />
            <AvatarFallback className="text-lg">
              {consultant.firstName[0]}{consultant.lastName[0]}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold">
              {consultant.firstName} {consultant.lastName}
            </CardTitle>
            
            {consultant.location && (
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{consultant.location}</span>
              </div>
            )}
            
            <div className="flex items-center mt-2">
              <Badge 
                variant="secondary" 
                className={getAvailabilityColor(consultant.availability)}
              >
                {formatAvailability(consultant.availability)}
              </Badge>
              
              {consultant.experience && (
                <Badge variant="outline" className="ml-2 text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  {consultant.experience}+ years
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {consultant.bio && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {consultant.bio}
          </p>
        )}
        
        {consultant.hourlyRate && (
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="font-medium text-green-600">
              ${consultant.hourlyRate}/hr
            </span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mb-4">
          {consultant.skills.slice(0, 6).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {consultant.skills.length > 6 && (
            <Badge variant="outline" className="text-xs">
              +{consultant.skills.length - 6} more
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <Star className="h-3 w-3 mr-1 fill-current text-yellow-400" />
            <span>4.8 • 12 reviews</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {consultant.resume && onDownloadResume && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDownloadResume(consultant.resume!)}
              >
                <Download className="h-4 w-4 mr-1" />
                Resume
              </Button>
            )}
            
            {onContact && (
              <Button
                size="sm"
                onClick={() => onContact(consultant._id)}
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                Contact
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}