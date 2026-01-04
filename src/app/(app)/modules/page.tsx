'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { availableModules, skillCategories, Module, SkillCategory } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function ModulesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'all'>('all');

  const filteredModules = availableModules.filter(module => {
    const matchesCategory = selectedCategory === 'all' || module.skillCategory === selectedCategory;
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          module.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Catálogo de Módulos</h1>
        <p className="text-muted-foreground">Explora todos los módulos disponibles para ampliar tus habilidades.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar módulos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as SkillCategory | 'all')}
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filtrar por categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las Categorías</SelectItem>
            {skillCategories.map(category => (
              <SelectItem key={category.name} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredModules.map((module: Module) => (
          <Link href={`/modules/${module.moduleId}`} key={module.moduleId}>
            <Card className="overflow-hidden transition-transform hover:scale-105 hover:shadow-xl h-full flex flex-col">
              <Image src={module.imageUrl} alt={module.title} width={600} height={400} className="w-full h-48 object-cover" data-ai-hint={module.dataAiHint} />
              <CardHeader>
                <CardTitle>{module.title}</CardTitle>
                <CardDescription className="text-primary font-medium">{module.skillCategory}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{module.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
        {filteredModules.length === 0 && (
            <div className="text-center text-muted-foreground col-span-full py-12">
                <p className="text-lg">No se encontraron módulos.</p>
                <p>Intenta ajustar tu búsqueda o filtros.</p>
            </div>
        )}
      </div>
    </div>
  );
}
