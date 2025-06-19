'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Users, 
  Building2,
  Plus,
  X,
  Zap,
  Star
} from 'lucide-react';

export default function PostJobPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'c2c',
    description: '',
    requirements: '',
    benefits: '',
    skills: [] as string[],
    experience: '',
    remote: false,
    urgent: false,
    contactEmail: '',
    contactPhone: '',
    companyWebsite: '',
    companyTwitter: ''
  });

  const [skillInput, setSkillInput] = useState('');

  const popularSkills = [
    'React', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'Kubernetes',
    'TypeScript', 'Angular', 'Vue.js', 'PostgreSQL', 'MongoDB', 'Redis',
    'GraphQL', 'DevOps', 'Microservices', 'CI/CD', 'Terraform', 'Azure',
    'Spring Boot', 'Django', 'Flask', 'Express.js', 'Next.js'
  ];

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    // Basic validation
    if (!formData.title || !formData.company || !formData.location || !formData.description) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }
  
    if (formData.skills.length === 0) {
      setError('Please add at least one skill requirement');
      setIsLoading(false);
      return;
    }
  
    try {
      // Prepare API request body
      const jobData = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        type: formData.type,
        description: formData.description,
        skills: formData.skills,
        experience: formData.experience,
        requirements: formData.requirements,
        benefits: formData.benefits,
        remote: formData.remote,
        urgent: formData.urgent,
        contactEmail: formData.contactEmail
      };
  
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      console.log('API Response:', response);
  
      const result = await response.json();
      console.log('API Response Body:', result);
  
      if (!response.ok) {
        throw new Error(result.error || 'Failed to post job');
      }
  
      setSuccess(true);
      setTimeout(() => {
        router.push('/jobs');
      }, 2000);
  
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to post job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar user={null} />
        <div className="max-w-2xl mx-auto px-4 py-16">
          <Card className="text-center">
            <CardContent className="pt-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Posted Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Your job posting has been submitted and will be reviewed shortly.
              </p>
              <Button onClick={() => router.push('/jobs')}>
                View All Jobs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={null} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post USA Staffing Jobs quick and easy way !!</h1>
          <p className="text-gray-600">
            Find the perfect C2C consultant for your project
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Job Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Senior React Developer"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name *</Label>
                  <Input
                    id="company"
                    placeholder="e.g. TechCorp Solutions"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyWebsite">Company Website</Label>
                  <Input
                    id="companyWebsite"
                    placeholder="https://company.com"
                    value={formData.companyWebsite}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyWebsite: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g. New York, NY or Remote"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="type">Job Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="c2c">Corp-to-Corp</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="full-time">Full-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select value={formData.experience} onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                      <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                      <SelectItem value="lead">Lead/Principal (10+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>
            </CardContent>
          </Card>



          {/* Skills & Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Skills & Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Required Skills *</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a skill..."
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(skillInput))}
                  />
                  <Button 
                    type="button" 
                    onClick={() => addSkill(skillInput)}
                    disabled={!skillInput}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Popular skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularSkills.filter(skill => !formData.skills.includes(skill)).slice(0, 10).map((skill, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => addSkill(skill)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Additional Requirements</Label>
                <Textarea
                  id="requirements"
                  placeholder="List any specific requirements, certifications, or qualifications..."
                  rows={4}
                  value={formData.requirements}
                  onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefits">Benefits & Perks</Label>
                <Textarea
                  id="benefits"
                  placeholder="Describe benefits, perks, or what makes this opportunity special..."
                  rows={3}
                  value={formData.benefits}
                  onChange={(e) => setFormData(prev => ({ ...prev, benefits: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact & Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Contact & Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="recruiter@company.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyTwitter">Company Twitter Link</Label>
                  <Input
                    id="companyTwitter"
                    placeholder="https://twitter.com/company"
                    value={formData.companyTwitter}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyTwitter: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remote"
                    checked={formData.remote}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, remote: checked as boolean }))}
                  />
                  <Label htmlFor="remote" className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Remote work available
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="urgent"
                    checked={formData.urgent}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, urgent: checked as boolean }))}
                  />
                  <Label htmlFor="urgent" className="flex items-center">
                    <Zap className="h-4 w-4 mr-1" />
                    Urgent hiring (featured listing)
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex items-center justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="min-w-32">
              {isLoading ? 'Posting...' : 'Post Job'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}