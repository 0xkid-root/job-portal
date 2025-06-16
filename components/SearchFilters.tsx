'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Search, X, Filter } from 'lucide-react';

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void;
  type: 'jobs' | 'consultants';
}

export default function SearchFilters({ onFiltersChange, type }: SearchFiltersProps) {
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    skills: [] as string[],
    experience: '',
    remote: false,
    urgent: false,
    jobType: '',
    availability: ''
  });

  const [skillInput, setSkillInput] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const popularSkills = [
    'React', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'Kubernetes',
    'TypeScript', 'Angular', 'Vue.js', 'PostgreSQL', 'MongoDB', 'Redis',
    'GraphQL', 'DevOps', 'Microservices', 'CI/CD', 'Terraform'
  ];

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const addSkill = (skill: string) => {
    if (skill && !filters.skills.includes(skill)) {
      const newSkills = [...filters.skills, skill];
      handleFilterChange('skills', newSkills);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    const newSkills = filters.skills.filter(s => s !== skill);
    handleFilterChange('skills', newSkills);
  };

  const clearFilters = () => {
    const clearedFilters = {
      keyword: '',
      location: '',
      skills: [],
      experience: '',
      remote: false,
      urgent: false,
      jobType: '',
      availability: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </span>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="keyword">Keywords</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="keyword"
              placeholder={type === 'jobs' ? 'Job title, company...' : 'Skills, name...'}
              className="pl-10"
              value={filters.keyword}
              onChange={(e) => handleFilterChange('keyword', e.target.value)}
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="City, State, Remote"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          />
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <Label>Skills</Label>
          <div className="space-y-2">
            <div className="flex space-x-2">
              <Input
                placeholder="Add skill..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill(skillInput)}
              />
              <Button 
                type="button" 
                onClick={() => addSkill(skillInput)}
                disabled={!skillInput}
              >
                Add
              </Button>
            </div>
            
            {filters.skills.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {filters.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="flex flex-wrap gap-1">
              {popularSkills.filter(skill => !filters.skills.includes(skill)).slice(0, 6).map((skill, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => addSkill(skill)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <Button
          variant="ghost"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full"
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
        </Button>

        {showAdvanced && (
          <>
            {/* Experience */}
            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Select value={filters.experience} onValueChange={(value) => handleFilterChange('experience', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Experience</SelectItem>
                  <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                  <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                  <SelectItem value="lead">Lead/Principal (10+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>


            {/* Job Type (for jobs) */}
            {type === 'jobs' && (
              <div className="space-y-2">
                <Label>Job Type</Label>
                <Select value={filters.jobType} onValueChange={(value) => handleFilterChange('jobType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="c2c">Corp-to-Corp</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Availability (for consultants) */}
            {type === 'consultants' && (
              <div className="space-y-2">
                <Label>Availability</Label>
                <Select value={filters.availability} onValueChange={(value) => handleFilterChange('availability', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Availability</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="open-to-offers">Open to Offers</SelectItem>
                    <SelectItem value="not-available">Not Available</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remote"
                  checked={filters.remote}
                  onCheckedChange={(checked) => handleFilterChange('remote', checked)}
                />
                <Label htmlFor="remote">Remote Work</Label>
              </div>
              
              {type === 'jobs' && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="urgent"
                    checked={filters.urgent}
                    onCheckedChange={(checked) => handleFilterChange('urgent', checked)}
                  />
                  <Label htmlFor="urgent">Urgent Hiring</Label>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}