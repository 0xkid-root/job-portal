'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import dynamic from 'next/dynamic';

// Dynamically import the rich text editor to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

export default function PostHotlistPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    screenshot: null as File | null,
    recruiterEmail: '',
    captcha: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, screenshot: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!formData.title || !formData.content || !formData.recruiterEmail) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    if (formData.captcha !== '7') {
      setError('Incorrect captcha. Please solve 1 + 6 correctly.');
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('recruiterEmail', formData.recruiterEmail);
      if (formData.screenshot) {
        formDataToSend.append('screenshot', formData.screenshot);
      }

      const response = await fetch('/api/hotlist', {
        method: 'POST',
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          recruiterEmail: formData.recruiterEmail,
          screenshot: formData.screenshot ? formData.screenshot.name : null
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response is here:', response);

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to post hotlist');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/hotlist');
      }, 2000);
    } catch (error) {
      setError('Failed to post hotlist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-16">
          <Card className="text-center">
            <CardContent className="pt-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Hotlist Posted Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Your hotlist has been posted and will be visible to recruiters.
              </p>
              <Button onClick={() => router.push('/hotlist')}>
                View Hotlist
              </Button>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Post hotlists quick and easy among thousands of recruiters
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Hotlist Details */}
          <Card>
            <CardHeader>
              <CardTitle>Hotlist Title</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Input
                  placeholder="Hotlist Title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Write / Paste Hotlist with Contact details MANDATORY *</Label>
                <ReactQuill
                  id="content"
                  value={formData.content}
                  onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                  theme="snow"
                  placeholder="Enter hotlist details here..."
                  modules={{
                    toolbar: [
                      [{ 'font': [] }, { 'size': [] }],
                      ['bold', 'italic', 'underline'],
                      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                      ['link'],
                      ['clean']
                    ],
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="screenshot">Upload Screenshot of your hotlist</Label>
                <div className="border-2 border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    id="screenshot"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="screenshot" className="cursor-pointer flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Choose file
                    </Button>
                    <span className="text-sm text-gray-600">
                      {formData.screenshot ? formData.screenshot.name : 'No file chosen'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recruiterEmail">Recruiter email id</Label>
                <Input
                  id="recruiterEmail"
                  type="email"
                  placeholder="recruiter@example.com"
                  value={formData.recruiterEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, recruiterEmail: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="captcha">Human Check</Label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">1 + 6 =</span>
                  <Input
                    id="captcha"
                    type="text"
                    placeholder="Enter Sum"
                    value={formData.captcha}
                    onChange={(e) => setFormData(prev => ({ ...prev, captcha: e.target.value }))}
                    className="w-24"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex items-center justify-between w-full">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outline" 
              className="min-w-32  rounded-md"
            >
              {isLoading ? 'Posting...' : 'Post Hotlist Now'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}