'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { availableModules } from '@/lib/data';
import { CheckCircle2, MessageSquare } from 'lucide-react';

export default function FeedbackPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate submission
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="p-4 bg-green-100 rounded-full dark:bg-green-900/20">
                    <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-500" />
                </div>
                <h1 className="text-2xl font-bold">¡Gracias por tu opinión!</h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Tus comentarios son fundamentales para mejorar la experiencia de aprendizaje de futuros estudiantes.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-4">
                    Volver a la encuesta
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <MessageSquare className="h-8 w-8 text-primary" />
                    Tu Opinión Importa
                </h1>
                <p className="text-muted-foreground text-lg">
                    Ayúdanos a mejorar Tikap Skills respondiendo esta breve encuesta sobre tu experiencia.
                </p>
            </div>

            <Card className="border-t-4 border-t-primary shadow-lg">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Encuesta de Satisfacción</CardTitle>
                        <CardDescription>
                            Tus respuestas son anónimas y nos ayudarán a evaluar el impacto del proyecto.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">

                        {/* Pregunta 1: Uso de la aplicación */}
                        <div className="space-y-4 p-4 rounded-lg bg-muted/40">
                            <Label className="text-base font-semibold">1. ¿Qué te pareció el uso de la aplicación en general?</Label>
                            <RadioGroup defaultValue="bueno" className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-accent cursor-pointer transition-colors">
                                    <RadioGroupItem value="excelente" id="r1-excelente" />
                                    <Label htmlFor="r1-excelente" className="flex-1 cursor-pointer">Excelente, muy fácil de usar</Label>
                                </div>
                                <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-accent cursor-pointer transition-colors">
                                    <RadioGroupItem value="bueno" id="r1-bueno" />
                                    <Label htmlFor="r1-bueno" className="flex-1 cursor-pointer">Bueno, entendible</Label>
                                </div>
                                <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-accent cursor-pointer transition-colors">
                                    <RadioGroupItem value="regular" id="r1-regular" />
                                    <Label htmlFor="r1-regular" className="flex-1 cursor-pointer">Regular, me costó un poco</Label>
                                </div>
                                <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-accent cursor-pointer transition-colors">
                                    <RadioGroupItem value="malo" id="r1-malo" />
                                    <Label htmlFor="r1-malo" className="flex-1 cursor-pointer">Malo, muy confuso</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Pregunta 2: Módulos */}
                        <div className="space-y-4 p-4 rounded-lg bg-muted/40">
                            <Label className="text-base font-semibold">2. ¿Los contenidos de los módulos fueron claros?</Label>
                            <RadioGroup defaultValue="si" className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-accent cursor-pointer transition-colors">
                                    <RadioGroupItem value="si" id="r2-si" />
                                    <Label htmlFor="r2-si" className="flex-1 cursor-pointer">Sí, totalmente</Label>
                                </div>
                                <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-accent cursor-pointer transition-colors">
                                    <RadioGroupItem value="parcialmente" id="r2-parcialmente" />
                                    <Label htmlFor="r2-parcialmente" className="flex-1 cursor-pointer">La mayoría sí</Label>
                                </div>
                                <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-accent cursor-pointer transition-colors">
                                    <RadioGroupItem value="no" id="r2-no" />
                                    <Label htmlFor="r2-no" className="flex-1 cursor-pointer">No, fueron confusos</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Pregunta 3: Módulo favorito */}
                        <div className="space-y-4 p-4 rounded-lg bg-muted/40">
                            <Label className="text-base font-semibold">3. ¿Cuál módulo consideras que fue el más útil?</Label>
                            <div className="pt-2">
                                <Select>
                                    <SelectTrigger className="w-full sm:w-[300px]">
                                        <SelectValue placeholder="Selecciona un módulo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableModules.map((module) => (
                                            <SelectItem key={module.moduleId} value={module.moduleId}>
                                                {module.title}
                                            </SelectItem>
                                        ))}
                                        <SelectItem value="none">Ninguno en particular</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Pregunta 4: Lo que más gustó */}
                        <div className="space-y-4 p-4 rounded-lg bg-muted/40">
                            <Label className="text-base font-semibold" htmlFor="liked">4. ¿Qué fue lo que más te gustó de la plataforma?</Label>
                            <Textarea
                                id="liked"
                                placeholder="Ej: Las actividades interactivas, los videos, la facilidad de uso..."
                                className="mt-2 bg-background"
                            />
                        </div>

                        {/* Pregunta 5: Comentarios */}
                        <div className="space-y-4 p-4 rounded-lg bg-muted/40">
                            <Label className="text-base font-semibold" htmlFor="comments">5. Comentarios o sugerencias de mejora</Label>
                            <Textarea
                                id="comments"
                                placeholder="Escribe aquí tus sugerencias, críticas o ideas..."
                                className="min-h-[100px] mt-2 bg-background"
                            />
                        </div>

                    </CardContent>
                    <CardFooter className="flex justify-end p-6 bg-muted/20">
                        <Button type="submit" size="lg" className="w-full sm:w-auto">Enviar Retroalimentación</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
