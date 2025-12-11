
'use client';

import { availableModules } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, ArrowRight, Download, Upload } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function ModulePage({ params }: { params: { moduleId: string } }) {
  const module = availableModules.find(m => m.moduleId === params.moduleId);
  const [downloaded, setDownloaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  if (!module) {
    notFound();
  }

  const handleDownload = () => {
    setDownloaded(true);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.zip')) {
        toast({
          title: '¡Archivo Subido!',
          description: '¡Excelente trabajo! Has completado la práctica.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error de archivo',
          description: 'Por favor, sube un archivo con formato .zip.',
        });
      }
    }
  };

  const content = typeof module.content === 'object' ? module.content : null;
  const marketing = module.marketingData;
  const heroTitle = marketing?.heroTitle || module.title;
  const heroDescription = marketing?.heroSubtitle || module.description;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="relative w-full rounded-lg overflow-hidden bg-card border shadow-sm">
        {!marketing?.videoUrl && (
          <div className="relative h-64 w-full">
            <Image src={module.imageUrl} alt={module.title} fill style={{ objectFit: 'cover' }} data-ai-hint={module.dataAiHint} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
        )}

        <div className="p-6 md:p-8">
          {marketing?.videoUrl ? (
            <div className="grid md:grid-cols-1 gap-6">
              <div>
                <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wide">{module.skillCategory}</p>
                <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{heroTitle}</h1>
                <p className="text-lg text-muted-foreground mb-6">{heroDescription}</p>
              </div>
              <div className="aspect-video w-full rounded-md overflow-hidden bg-black/10">
                {/* Simple iframe for demo purposes. In production, use a proper video component */}
                <iframe
                  width="100%"
                  height="100%"
                  src={marketing.videoUrl}
                  title="Video de la micro-cápsula"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ) : (
            <div className="relative z-10 -mt-20 text-white">
              {/* Fallback layout for non-marketing modules which uses the image background text overlay */}
              <p className="text-sm font-semibold text-primary-foreground/80">{module.skillCategory}</p>
              <h1 className="text-4xl font-bold">{heroTitle}</h1>
              <p className="mt-2 text-lg text-primary-foreground/90">{heroDescription}</p>
            </div>
          )}
        </div>
      </div>

      {content?.objectives && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Deja de perder tiempo: Lo que aprenderás inmediatamente</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-3">
              {content.objectives.map((obj: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-primary flex-shrink-0" />
                  <span className="text-lg font-medium">{obj}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {content?.intro && !content?.objectives && (
        <Card>
          <CardHeader>
            <CardTitle>¿Qué aprenderás en este módulo?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {content.intro}
            </p>
          </CardContent>
        </Card>
      )}

      {content?.steps && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {marketing?.stepsTitle || 'Guía Paso a Paso'}
            </CardTitle>
            <CardDescription>
              {marketing ? 'Sigue estos pasos clave.' : 'Sigue estas instrucciones para dominar el tema.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {marketing ? (
              <div className="grid gap-6 md:grid-cols-1">
                {content.steps.map((step: any, index: number) => (
                  <div key={index} className="border rounded-lg p-6 bg-card shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <div className="text-muted-foreground whitespace-pre-line">
                      {step.content}
                    </div>
                    {step.imageUrl && (
                      <div className="mt-4">
                        <Image src={step.imageUrl} alt={step.title} width={500} height={300} className="rounded-md w-full object-cover" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {content.steps.map((step: any, index: number) => (
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
            )}
          </CardContent>
        </Card>
      )}

      {content?.interactive && (
        <Card className="bg-accent/30 border-accent">
          <CardHeader>
            <CardTitle>{content.interactive.title}</CardTitle>
            <CardDescription>{content.interactive.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {content.interactive.checklist ? (
              <div className="space-y-6">
                <div className="bg-background p-6 rounded-lg border">
                  <p className="font-semibold text-lg mb-4 text-center">
                    {content.interactive.activityBrief}
                  </p>
                </div>
                <div className="space-y-3 max-w-xl mx-auto">
                  <h4 className="font-bold text-center mb-2">Checklist de Autoevaluación:</h4>
                  {content.interactive.checklist.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-white/50 rounded border">
                      <div className="h-5 w-5 rounded-full border-2 border-primary/50" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{content.interactive.description}</p>
                <div className="flex justify-center items-center p-8 gap-8">
                  <Button asChild size="lg" onClick={handleDownload}>
                    <a href="/recursos/Trabajo.zip" download>
                      <Download className="mr-2" />
                      Descarga tu Archivo de trabajo
                    </a>
                  </Button>
                  {downloaded && (
                    <>
                      <Button size="lg" variant="outline" onClick={handleUploadClick}>
                        <Upload className="mr-2" />
                        Sube tu archivo modificado
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".zip"
                        className="hidden"
                      />
                    </>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {content?.keyPoints && content.keyPoints.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Puntos Clave</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {content.keyPoints.map((point: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {!content && typeof module.content === 'string' && (
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
