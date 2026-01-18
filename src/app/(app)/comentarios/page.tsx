'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare, Quote } from 'lucide-react';
import Link from 'next/link';

// --- MOCK DATA ---
interface Comment {
    id: number;
    text: string;
}

const mockComments: Comment[] = [
    { id: 1, text: "Me ayudó mucho a entender conceptos que antes me costaban." },
    { id: 2, text: "Bien." },
    { id: 3, text: "Me gustó mucho la interfaz, es  intuitiva. " },
    { id: 4, text: "La herramienta de IA es genial." },
    { id: 5, text: "Me gustaría mas modulus de informática." },
    { id: 6, text: "Bien, gracias " },
    { id: 7, text: "Todo OK" },
    { id: 8, text: "Es Divertido " },
    { id: 9, text: "Muy útil, me sirvió bastante." },
    { id: 10, text: "Falta un poco más de contenido." },
    { id: 11, text: "Me encantó la parte interactiva." },
    { id: 12, text: "bueno" },
    { id: 13, text: "Simple pero efectivo." },
    { id: 14, text: "Excelente recurso." },
    { id: 15, text: "Un poco contenido, pero bueno." }
];

export default function ComentariosPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 p-4 sm:p-6 lg:p-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <MessageSquare className="h-8 w-8 text-primary" />
                        Comentarios y Sugerencias
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Lo que dicen nuestros estudiantes sobre la plataforma.
                    </p>
                </div>
                <Link href="/feedback/results">
                    <Button variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Volver a Resultados
                    </Button>
                </Link>
            </div>

            {/* Comments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockComments.map((comment) => (
                    <Card key={comment.id} className="flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 border-gray-200 dark:border-gray-800 p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0">
                                <Quote className="h-4 w-4" />
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300 italic mt-1.5">
                                "{comment.text}"
                            </p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Call to Action or Footer note */}
            <div className="flex justify-center mt-12">
                <p className="text-muted-foreground text-sm text-center max-w-md">
                    ¿Tienes algo que decirnos? Tu opinión es valiosa para seguir mejorando.
                    <br />
                    <Link href="/feedback" className="text-primary hover:underline font-medium">
                        Deja tu comentario aquí
                    </Link>
                </p>
            </div>
        </div>
    );
}
