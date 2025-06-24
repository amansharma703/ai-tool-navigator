"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import * as Icons from 'lucide-react';

interface Tool {
  name: string;
  description: string;
  website: string;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  tools: Tool[];
}

interface ToolListProps {
  category: Category;
  onBack: () => void;
}

export default function ToolList({ category, onBack }: ToolListProps) {
  const IconComponent = (Icons as any)[category.icon] as React.ElementType;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Categories</span>
        </Button>
      </div>

      <div className="flex items-center space-x-4 mb-8">
        <div className={`p-4 rounded-xl bg-gradient-to-r ${category.color} shadow-lg category-icon`}>
          {IconComponent && (
            <IconComponent className="h-8 w-8 text-white drop-shadow-sm" />
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {category.name}
          </h1>
          <p className="text-lg text-muted-foreground mt-1">
            {category.description}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {category.tools.length} tools available
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {category.tools.map((tool, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {tool.name}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {tool.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag, tagIndex) => (
                  <Badge
                    key={tagIndex}
                    variant="secondary"
                    className="text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="pt-2">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2"
                  >
                    <span>Visit {tool.name}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}