'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';
import type { AssessmentScores } from '../page';
import { Progress } from '@/components/ui/progress';

export interface AssessmentHistoryItem {
    id: string;
    date: string;
    scores: AssessmentScores;
}

interface AssessmentHistoryProps {
    history: AssessmentHistoryItem[];
    onBack: () => void;
}

export default function AssessmentHistory({ history, onBack }: AssessmentHistoryProps) {
    return (
        <div className="space-y-6 w-full max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={onBack}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Historial de Evaluaciones</h1>
                    <p className="text-muted-foreground">Revisa tus resultados anteriores y tu progreso.</p>
                </div>
            </div>

            {history.length === 0 ? (
                <Card>
                    <CardContent className="pt-6 text-center text-muted-foreground">
                        No hay evaluaciones registradas aún. ¡Completa una para ver tu progreso aquí!
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6">
                    {history.slice().reverse().map((item) => (
                        <Card key={item.id}>
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>{new Date(item.date).toLocaleDateString()} {new Date(item.date).toLocaleTimeString()}</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {Object.entries(item.scores).map(([category, data]) => (
                                            <div key={category} className="space-y-1">
                                                <div className="flex justify-between text-sm">
                                                    <span className="font-medium">{category}</span>
                                                    <span className="text-muted-foreground">{Math.round((data.score / data.total) * 100)}%</span>
                                                </div>
                                                <Progress value={(data.score / data.total) * 100} className="h-2" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
