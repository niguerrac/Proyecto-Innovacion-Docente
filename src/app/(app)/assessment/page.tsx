'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { assessmentQuestions, Question, SkillCategory } from '@/lib/data';
import AssessmentQuiz from './_components/assessment-quiz';
import AssessmentResults from './_components/assessment-results';
import { ArrowRight, Check, HelpCircle } from 'lucide-react';
import Image from 'next/image';

type QuizState = 'not_started' | 'in_progress' | 'completed';

export type AssessmentScores = Record<SkillCategory, { score: number; total: number }>;

export default function AssessmentPage() {
  const [quizState, setQuizState] = useState<QuizState>('not_started');
  const [scores, setScores] = useState<AssessmentScores | null>(null);

  const startQuiz = () => {
    setQuizState('in_progress');
  };

  const finishQuiz = (answers: Record<string, number>) => {
    const newScores = assessmentQuestions.reduce((acc, question) => {
      const category = question.skillCategory;
      if (!acc[category]) {
        acc[category] = { score: 0, total: 0 };
      }
      acc[category].score += answers[question.questionId] || 0;
      acc[category].total += Math.max(...question.options.map(o => o.weight));
      return acc;
    }, {} as AssessmentScores);

    setScores(newScores);
    setQuizState('completed');
  };

  if (quizState === 'not_started') {
    return (
      <div className="flex items-center justify-center h-full">
         <Card className="w-full max-w-2xl">
           <CardHeader className="text-center">
             <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                <HelpCircle className="h-10 w-10 text-primary" />
             </div>
             <CardTitle className="text-3xl">Evaluación de Habilidades</CardTitle>
             <CardDescription className="text-lg">Averigüemos cuáles son tus fortalezas y dónde puedes mejorar.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-6 text-center">
             <p className="text-muted-foreground">Este breve cuestionario nos ayudará a diseñar un plan de aprendizaje solo para ti. Consta de {assessmentQuestions.length} preguntas y solo te llevará unos minutos.</p>
             <ul className="text-left space-y-2 w-fit mx-auto">
                <li className="flex items-center gap-2"><Check className="text-green-500"/> Sé honesto para obtener los mejores resultados.</li>
                <li className="flex items-center gap-2"><Check className="text-green-500"/> No hay respuestas incorrectas.</li>
                <li className="flex items-center gap-2"><Check className="text-green-500"/> ¡Tus recomendaciones te esperan!</li>
             </ul>
             <Button size="lg" onClick={startQuiz}>
               Comenzar Evaluación <ArrowRight className="ml-2" />
             </Button>
           </CardContent>
         </Card>
      </div>
    );
  }

  if (quizState === 'in_progress') {
    return <AssessmentQuiz questions={assessmentQuestions} onFinish={finishQuiz} />;
  }

  if (quizState === 'completed' && scores) {
    return <AssessmentResults scores={scores} />;
  }

  return null;
}
