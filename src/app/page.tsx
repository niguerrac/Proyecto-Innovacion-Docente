import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap, Target } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Logo } from '@/components/shared/logo';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="font-bold">MICRO-CÁPSULAS DE APRENDIZAJE</span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button asChild variant="ghost">
                <Link href="/signup">Iniciar Sesión</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">Comenzar</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Desbloquea tu Potencial, una Habilidad a la Vez
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
              Tikap Skills ofrece un camino personalizado hacia la maestría. Realiza nuestra evaluación inteligente y recibe un plan de aprendizaje curado por IA solo para ti.
            </p>
          </div>
          <div className="mx-auto flex w-full max-w-sm items-center justify-center space-x-4">
            <Button asChild size="lg">
              <Link href="/assessment">Comienza tu Evaluación</Link>
            </Button>
          </div>
        </section>

        <section className="container py-12">
          <div className="relative rounded-lg bg-card text-card-foreground shadow-lg overflow-hidden">
             <Image
                src="/image/portada1.jpg"
                alt="Panel de Aprendizaje Personalizado"
                width={1200}
                height={600}
                className="w-full object-cover"
                data-ai-hint="learning dashboard"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 p-8 text-white">
                <h2 className="text-4xl font-bold">Tu viaje comienza aquí.</h2>
                <p className="mt-2 text-xl">Ve tu progreso y obtén recomendaciones.</p>
              </div>
          </div>
        </section>

        <section id="features" className="container space-y-6 bg-background py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Cómo Funciona</h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Nuestro sencillo proceso de tres pasos está diseñado para identificar tus necesidades y guiarte hacia el éxito.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <Card className="transform transition-transform hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <Target className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>1. Evaluación de Habilidades</CardTitle>
              </CardHeader>
              <CardContent>
                Realiza un cuestionario rápido y completo para identificar tus niveles de habilidad actuales y áreas de crecimiento.
              </CardContent>
            </Card>
            <Card className="transform transition-transform hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <Zap className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>2. Recomendaciones de IA</CardTitle>
              </CardHeader>
              <CardContent>
                Nuestra IA analiza tus resultados para crear un plan de aprendizaje personalizado con módulos adaptados a tus necesidades.
              </CardContent>
            </Card>
            <Card className="transform transition-transform hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CheckCircle className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>3. Sigue tu Progreso</CardTitle>
              </CardHeader>
              <CardContent>
                Observa cómo crecen tus habilidades con nuestro intuitivo sistema de seguimiento de progreso. Mantente motivado y alcanza tus metas.
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="py-6 md:px-8 md:py-0 bg-card text-card-foreground">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Construido por Ti. Potenciado por IA.
          </p>
        </div>
      </footer>
    </div>
  );
}
