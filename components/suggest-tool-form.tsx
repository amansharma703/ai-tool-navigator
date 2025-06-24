"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SuggestToolFormProps {
  onBack: () => void;
  categories: Array<{ id: string; name: string; }>;
}

export default function SuggestToolForm({ onBack, categories }: SuggestToolFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    toolName: '',
    website: '',
    description: '',
    category: '',
    tags: '',
    submitterName: '',
    submitterEmail: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log('Tool suggestion submitted:', formData);
    
    toast({
      title: "Thank you for your suggestion!",
      description: "We'll review your tool submission and add it to our directory if it meets our criteria.",
    });

    // Reset form
    setFormData({
      toolName: '',
      website: '',
      description: '',
      category: '',
      tags: '',
      submitterName: '',
      submitterEmail: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Button>
      </div>

      <Card className="border-2">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Suggest an AI Tool
          </CardTitle>
          <p className="text-muted-foreground">
            Help us expand our directory by suggesting amazing AI tools you've discovered
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tool Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Tool Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tool Name *</label>
                  <Input
                    placeholder="e.g., ChatGPT"
                    value={formData.toolName}
                    onChange={(e) => handleInputChange('toolName', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Website URL *</label>
                  <Input
                    type="url"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description *</label>
                <Textarea
                  placeholder="Briefly describe what this tool does and why it's useful..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category *</label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags</label>
                  <Input
                    placeholder="AI, Writing, Code (comma-separated)"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Submitter Information */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-lg font-semibold">Your Information (Optional)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Name</label>
                  <Input
                    placeholder="John Doe"
                    value={formData.submitterName}
                    onChange={(e) => handleInputChange('submitterName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Email</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.submitterEmail}
                    onChange={(e) => handleInputChange('submitterEmail', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              size="lg"
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Tool Suggestion
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}