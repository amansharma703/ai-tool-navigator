"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import * as Icons from 'lucide-react';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    icon: string;
    description: string;
    color: string;
    tools: Array<{
      name: string;
      description: string;
      website: string;
      tags: string[];
    }>;
  };
  onClick: () => void;
  isSelected?: boolean;
}

const colorClassMap: Record<string, string> = {
  "from-blue-500 to-cyan-500": "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500": "from-emerald-500 to-teal-500",
  "from-purple-500 to-pink-500": "from-purple-500 to-pink-500",
  "from-orange-500 to-red-500": "from-orange-500 to-red-500",
  "from-indigo-500 to-purple-500": "from-indigo-500 to-purple-500",
  "from-pink-500 to-rose-500": "from-pink-500 to-rose-500",
  "from-green-500 to-emerald-500": "from-green-500 to-emerald-500",
  "from-yellow-500 to-orange-500": "from-yellow-500 to-orange-500",
  "from-violet-500 to-purple-500": "from-violet-500 to-purple-500",
};

export default function CategoryCard({ category, onClick, isSelected }: CategoryCardProps) {
  // Dynamically get the icon component
  const IconComponent = (Icons as any)[category.icon] as React.ElementType;
  const gradientClass = colorClassMap[category.color] || "from-blue-500 to-cyan-500";

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 ${
        isSelected 
          ? 'border-primary shadow-lg ring-2 ring-primary/20' 
          : 'border-border hover:border-primary/50'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-r ${gradientClass} shadow-md category-icon`}>
            {IconComponent && (
              <IconComponent className="h-6 w-6 text-white drop-shadow-sm" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {category.description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {category.tools.length} tools
          </Badge>
          <div className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
            Click to explore →
          </div>
        </div>
      </CardContent>
    </Card>
  );
}