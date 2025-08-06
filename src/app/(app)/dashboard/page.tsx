import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { availableModules, userProgressData } from '@/lib/data';
import { CheckCircle, Trophy, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function DashboardPage() {
    const modulesInProgress = userProgressData
    .map(progress => {
      const moduleInfo = availableModules.find(m => m.moduleId === progress.moduleId);
      return moduleInfo ? { ...moduleInfo, ...progress } : null;
    })
    .filter(Boolean);

    const completedModules = userProgressData.filter(p => p.progress === 100).length;
    const totalModules = availableModules.length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userProgressData.filter(p => p.progress < 100).length} Modules</div>
            <p className="text-xs text-muted-foreground">Keep going!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedModules} Modules</div>
            <p className="text-xs text-muted-foreground">Out of {totalModules} total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills Mastered</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Skills</div>
            <p className="text-xs text-muted-foreground">Based on completed modules</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Continue Learning</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modulesInProgress.map(module => (
                module && (
                    <Link href={`/modules`} key={module.moduleId}>
                        <Card className="overflow-hidden transition-transform hover:scale-105 hover:shadow-xl h-full flex flex-col">
                            <Image src={module.imageUrl} alt={module.title} width={600} height={400} className="w-full h-40 object-cover" data-ai-hint={module.dataAiHint} />
                            <CardHeader>
                                <CardTitle>{module.title}</CardTitle>
                                <CardDescription>{module.skillCategory}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col justify-end">
                                <div>
                                    <Progress value={module.progress} className="w-full" />
                                    <p className="text-sm text-muted-foreground mt-2">{module.progress}% complete</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                )
            ))}
        </div>
      </div>
    </div>
  );
}
