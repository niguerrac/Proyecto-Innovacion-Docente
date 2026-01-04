'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import type { Question } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface AssessmentQuizProps {
  questions: Question[];
  onFinish: (answers: Record<string, number>) => void;
}

export default function AssessmentQuiz({ questions, onFinish }: AssessmentQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  const handleNext = () => {
    if (selectedOption === null) return;

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      onFinish(answers);
    }
  };
  
  const handleSelectOption = (optionWeight: number) => {
    setAnswers({
      ...answers,
      [currentQuestion.questionId]: optionWeight,
    });
    setSelectedOption(String(optionWeight));
  }

  return (
    <div className="flex justify-center items-start pt-10 h-full">
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <Progress value={progress} className="mb-4" />
                <CardDescription>Pregunta {currentQuestionIndex + 1} de {questions.length}</CardDescription>
                <CardTitle className="text-2xl">{currentQuestion.text}</CardTitle>
                <p className="text-sm text-muted-foreground pt-1">Categoría: <span className="font-semibold text-primary">{currentQuestion.skillCategory}</span></p>
            </CardHeader>
            <CardContent>
                <RadioGroup 
                    onValueChange={(value) => handleSelectOption(Number(value))}
                    value={selectedOption ?? undefined}
                    className="space-y-4"
                >
                    {currentQuestion.options.map((option) => (
                        <Label key={option.weight} htmlFor={String(option.weight)} className={cn(
                            "flex items-center p-4 border rounded-lg cursor-pointer transition-all",
                            "hover:border-primary hover:bg-primary/5",
                            selectedOption === String(option.weight) && "border-primary bg-primary/10 ring-2 ring-primary"
                        )}>
                            <RadioGroupItem value={String(option.weight)} id={String(option.weight)} className="mr-4" />
                            <span>{option.text}</span>
                        </Label>
                    ))}
                </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={handleNext} disabled={selectedOption === null} size="lg">
                    {currentQuestionIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Evaluación'}
                    <ArrowRight className="ml-2" />
                </Button>
            </CardFooter>
        </Card>
    </div>
  );
}
