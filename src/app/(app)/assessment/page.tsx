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
             <CardTitle className="text-3xl">Skill Assessment</CardTitle>
             <CardDescription className="text-lg">Let&apos;s find out where your strengths are and where you can grow.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-6 text-center">
             <p className="text-muted-foreground">This short quiz will help us tailor a learning path just for you. It consists of {assessmentQuestions.length} questions and should only take a few minutes.</p>
             <ul className="text-left space-y-2 w-fit mx-auto">
                <li className="flex items-center gap-2"><Check className="text-green-500"/> Be honest for the best results.</li>
                <li className="flex items-center gap-2"><Check className="text-green-500"/> There are no wrong answers.</li>
                <li className="flex items-center gap-2"><Check className="text-green-500"/> Your recommendations await!</li>
             </ul>
             <Button size="lg" onClick={startQuiz}>
               Start Assessment <ArrowRight className="ml-2" />
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
