'use client';

import { useEffect, useState } from 'react';
import type { AssessmentScores, SkillCategory } from '../page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getRecommendedModules } from '@/lib/actions';
import type { RecommendLearningModulesOutput } from '@/ai/flows/recommend-learning-modules';
import { Skeleton } from '@/components/ui/skeleton';
import { Zap, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface AssessmentResultsProps {
  scores: AssessmentScores;
}

type RecommendationState = {
    loading: boolean;
    data: RecommendLearningModulesOutput | null;
    error: string | null;
}

export default function AssessmentResults({ scores }: AssessmentResultsProps) {
  const [recommendations, setRecommendations] = useState<RecommendationState>({
      loading: true,
      data: null,
      error: null,
  });

  useEffect(() => {
    const fetchRecommendations = async () => {
        const assessmentResults = Object.entries(scores).reduce((acc, [category, data]) => {
            acc[category] = Math.round((data.score / data.total) * 100);
            return acc;
        }, {} as Record<string, number>);

        const result = await getRecommendedModules(assessmentResults);
        if ('error' in result) {
            setRecommendations({ loading: false, data: null, error: result.error });
        } else {
            setRecommendations({ loading: false, data: result, error: null });
        }
    };
    fetchRecommendations();
  }, [scores]);
  
  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Resultados de la Evaluación</h1>
            <p className="text-muted-foreground">Aquí tienes un desglose de tu evaluación de habilidades.</p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Tu Perfil de Habilidades</CardTitle>
                <CardDescription>Esto visualiza tus puntuaciones en cada categoría.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {Object.entries(scores).map(([category, data]) => (
                    <div key={category}>
                        <div className="flex justify-between mb-1">
                            <span className="font-medium">{category}</span>
                            <span className="text-muted-foreground">{Math.round((data.score / data.total) * 100)}%</span>
                        </div>
                        <Progress value={(data.score / data.total) * 100} />
                    </div>
                ))}
            </CardContent>
        </Card>

        <Card className="bg-accent/30 border-accent">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Zap className="text-primary" />
                    <CardTitle>Recomendaciones con IA</CardTitle>
                </div>
                <CardDescription>Basado en tus resultados, aquí hay algunos módulos que creemos que te serán útiles.</CardDescription>
            </CardHeader>
            <CardContent>
                {recommendations.loading && <RecommendationsSkeleton />}
                {recommendations.error && <p className="text-destructive">{recommendations.error}</p>}
                {recommendations.data && (
                    <div className="space-y-4">
                        {recommendations.data.map(module => (
                            <Card key={module.moduleId} className="bg-background">
                                <CardHeader>
                                    <CardTitle>{module.title}</CardTitle>
                                    <CardDescription>Categoría: {module.skillCategory}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-2">{module.description}</p>
                                    <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
                                        <p className="font-semibold text-sm flex items-center gap-2 text-primary">
                                            <Sparkles className="w-4 h-4"/>
                                            Motivo de la recomendación
                                        </p>
                                        <p className="text-sm text-primary/80">{module.reason}</p>
                                    </div>
                                    <Button asChild className="mt-4">
                                        <Link href="/modules">Ver Módulo</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}


function RecommendationsSkeleton() {
    return (
        <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
                 <Card key={i} className="bg-background">
                    <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/4" />
                    </CardHeader>
                    <CardContent className="space-y-3">
                         <Skeleton className="h-4 w-full" />
                         <Skeleton className="h-4 w-5/6" />
                         <Skeleton className="h-16 w-full" />
                         <Skeleton className="h-10 w-28" />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
