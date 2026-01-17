'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { availableModules, userProgressData } from '@/lib/data';
import { CheckCircle, Trophy, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { getAllProgress, type ModuleProgress } from '@/lib/progress';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [progressData, setProgressData] = useState<Record<string, ModuleProgress>>({});

  useEffect(() => {
    // Load initial
    setProgressData(getAllProgress());

    // Listen for updates from other tabs/components
    const handleUpdate = () => {
      setProgressData(getAllProgress());
    };
    window.addEventListener('progressUpdated', handleUpdate);
    return () => window.removeEventListener('progressUpdated', handleUpdate);
  }, []);

  const modulesInProgress = availableModules
    .map(module => {
      const prog = progressData[module.moduleId];
      // Include if in progress OR recommended
      if (prog && (prog.isRecommended || (prog.calculatedPercentage < 100 && prog.calculatedPercentage > 0))) {
        return { ...module, ...prog, progress: prog.calculatedPercentage };
      }
      return null;
    })
    .filter(Boolean);

  const completedModules = Object.values(progressData).filter(p => p.calculatedPercentage === 100).length;
  const totalModules = availableModules.length;
  const inProgressCount = Object.values(progressData).filter(p => p.calculatedPercentage > 0 && p.calculatedPercentage < 100).length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Panel de Control</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Progreso</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressCount} Módulos</div>
            <p className="text-xs text-muted-foreground">¡Sigue así!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completados</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedModules} Módulos</div>
            <p className="text-xs text-muted-foreground">De {totalModules} en total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Habilidades Dominadas</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0 Habilidades</div>
            <p className="text-xs text-muted-foreground">Basado en módulos completados</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Tu Ruta de Aprendizaje</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modulesInProgress.map(module => (
            module && (
              <Link href={`/modules/${module.moduleId}`} key={module.moduleId}>
                <Card className="overflow-hidden transition-transform hover:scale-105 hover:shadow-xl h-full flex flex-col">
                  <Image src={module.imageUrl} alt={module.title} width={600} height={400} className="w-full h-40 object-cover" data-ai-hint={module.dataAiHint} />
                  <CardHeader>
                    <CardTitle>{module.title}</CardTitle>
                    <CardDescription>{module.skillCategory}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-end">
                    <div>
                      <Progress value={module.progress} className="w-full" />
                      <p className="text-sm text-muted-foreground mt-2">{module.progress}% completado</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
