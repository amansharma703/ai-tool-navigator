"use client";

import { useState, useEffect } from 'react';
import Navigation from '@/components/navigation';
import CategoryCard from '@/components/category-card';
import ToolList from '@/components/tool-list';
import SuggestToolForm from '@/components/suggest-tool-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, TrendingUp, Users, Star, ExternalLink } from 'lucide-react';
import toolsData from '@/data/tools.json';

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

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(toolsData.categories);
  }, []);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setActiveSection('category-detail');
  };

  const handleBackToHome = () => {
    setSelectedCategory(null);
    setActiveSection('home');
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setActiveSection('categories');
  };

  const totalTools = categories.reduce((acc, category) => acc + category.tools.length, 0);

  // Get daily life tools for featured section
  const dailyLifeCategory = categories.find(cat => cat.id === 'daily-life');
  const featuredDailyTools = dailyLifeCategory?.tools.slice(0, 3) || [];

  const renderContent = () => {
    switch (activeSection) {
      case 'categories':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Explore AI Tool Categories
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Browse through our carefully curated categories to find the perfect AI tools for your needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => handleCategoryClick(category)}
                />
              ))}
            </div>
          </div>
        );

      case 'category-detail':
        return selectedCategory ? (
          <ToolList
            category={selectedCategory}
            onBack={handleBackToCategories}
          />
        ) : null;

      case 'suggest':
        return (
          <SuggestToolForm
            onBack={handleBackToHome}
            categories={categories.map(cat => ({ id: cat.id, name: cat.name }))}
          />
        );

      default:
        return (
          <div className="space-y-16">
            {/* Hero Section */}
            <div className="text-center space-y-8 py-12">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                <Sparkles className="h-4 w-4" />
                <span>Discover the Future of AI Tools</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Discover the Best
                </span>
                <br />
                <span className="text-foreground">AI Tools by Use Case</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Navigate the AI revolution with our comprehensive directory of cutting-edge tools, 
                carefully organized by category to match your specific needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Button 
                  size="lg" 
                  onClick={() => setActiveSection('categories')}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg px-8 py-3"
                >
                  Explore Categories
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setActiveSection('suggest')}
                  className="text-lg px-8 py-3"
                >
                  Suggest a Tool
                </Button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-border">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-blue-500 mr-2" />
                  <span className="text-3xl font-bold text-foreground">{totalTools}+</span>
                </div>
                <p className="text-muted-foreground">AI Tools Curated</p>
              </div>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center">
                  <Users className="h-8 w-8 text-purple-500 mr-2" />
                  <span className="text-3xl font-bold text-foreground">{categories.length}</span>
                </div>
                <p className="text-muted-foreground">Categories Available</p>
              </div>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center">
                  <Star className="h-8 w-8 text-yellow-500 mr-2" />
                  <span className="text-3xl font-bold text-foreground">100%</span>
                </div>
                <p className="text-muted-foreground">Free to Use</p>
              </div>
            </div>

            {/* Featured Daily Life Tools */}
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Essential Daily AI Tools
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Start your AI journey with these powerful tools for everyday tasks
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredDailyTools.map((tool, index) => (
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
                        {tool.tags.slice(0, 2).map((tag, tagIndex) => (
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
                          className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600"
                        >
                          <a
                            href={tool.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-2"
                          >
                            <span>Try {tool.name}</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center pt-4">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => handleCategoryClick(dailyLifeCategory!)}
                  className="text-lg px-8 py-3"
                >
                  View All Daily Life Tools
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Featured Categories Preview */}
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Popular Categories
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Explore specialized AI tools for different use cases
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.filter(cat => cat.id !== 'daily-life').slice(0, 4).map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onClick={() => handleCategoryClick(category)}
                  />
                ))}
              </div>
              
              <div className="text-center pt-8">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setActiveSection('categories')}
                  className="text-lg px-8 py-3"
                >
                  View All Categories
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
}