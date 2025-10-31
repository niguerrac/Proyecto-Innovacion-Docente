import { availableModules } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, FileArchive, FolderOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  const module = availableModules.find(m => m.moduleId === params.moduleId);

  if (!module) {
    notFound();
  }

  const hasStructuredContent = typeof module.content === 'object';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="relative w-full h-64 rounded-lg overflow-hidden">
        <Image src={module.imageUrl} alt={module.title} fill style={{ objectFit: 'cover' }} data-ai-hint={module.dataAiHint} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <p className="text-sm font-semibold text-primary-foreground/80">{module.skillCategory}</p>
          <h1 className="text-4xl font-bold">{module.title}</h1>
          <p className="mt-2 text-lg text-primary-foreground/90">{module.description}</p>
        </div>
      </div>

      {hasStructuredContent && module.content.intro && (
        <Card>
          <CardHeader>
            <CardTitle>¿Qué aprenderás en este módulo?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {module.content.intro}
            </p>
          </CardContent>
        </Card>
      )}
      
      {hasStructuredContent && module.content.steps && (
        <Card>
          <CardHeader>
            <CardTitle>Guía Paso a Paso</CardTitle>
            <CardDescription>Sigue estas instrucciones para dominar el manejo de archivos comprimidos.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {module.content.steps.map((step, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg font-semibold">{step.title}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground prose prose-sm max-w-none">
                    <p>{step.content}</p>
                    {step.imageUrl && (
                      <div className="my-4">
                        <Image src={step.imageUrl} alt={step.title} width={500} height={300} className="rounded-md mx-auto" />
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}

      {hasStructuredContent && module.content.interactive && (
         <Card className="bg-accent/30 border-accent">
          <CardHeader>
            <CardTitle>¡Ponlo en Práctica!</CardTitle>
            <CardDescription>{module.content.interactive.title}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-around items-center p-8 bg-background rounded-lg">
                <div>
                    <FileArchive className="h-24 w-24 text-primary mx-auto" />
                    <p className="mt-2 font-semibold">trabajo_final.zip</p>
                </div>
                <ArrowRight className="h-12 w-12 text-muted-foreground" />
                <div>
                    <FolderOpen className="h-24 w-24 text-green-500 mx-auto" />
                    <p className="mt-2 font-semibold">Carpeta de Trabajo</p>
                </div>
            </div>
            <p className="mt-4 text-muted-foreground">{module.content.interactive.description}</p>
            <Button size="lg" className="mt-4">Simular Descompresión</Button>
          </CardContent>
        </Card>
      )}

      {hasStructuredContent && module.content.keyPoints && (
        <Card>
            <CardHeader>
                <CardTitle>Puntos Clave</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {module.content.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{point}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      )}

      {!hasStructuredContent && (
        <Card>
            <CardHeader>
                <CardTitle>Contenido del Módulo</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{module.content}</p>
            </CardContent>
        </Card>
      )}
      
      <div className="text-center py-6">
        <Button size="lg" asChild>
          <Link href="/modules">
            Módulo Completado: Volver al Catálogo
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
