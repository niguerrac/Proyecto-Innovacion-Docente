'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Line } from 'recharts';
import { ArrowLeft, Users, ThumbsUp, Star, Activity, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { availableModules } from '@/lib/data';

// --- MOCK DATA ---

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
const COLORS_SATISFACTION = ['#4ade80', '#a3e635', '#facc15', '#f87171']; // Green to Red-ish

// 1. Usage Rating Data
const usageData = [
    { name: 'Excelente', value: 50 },
    { name: 'Bueno', value: 35 },
    { name: 'Regular', value: 15 },
    { name: 'Malo', value: 0 },
];

// 2. Clarity Data
const clarityData = [
    { name: 'Totalmente Claros', value: 85 },
    { name: 'Mayoría Claros', value: 15 },
    { name: 'Confusos', value: 0 },
];

// 3. Useful Modules Data (Simulated based on availableModules or generic) - Legacy, keeping for reference or if needed
const modulesData = availableModules.slice(0, 5).map((mod) => ({
    name: mod.title,
    fullTitle: mod.title,
    votes: Math.floor(Math.random() * 50) + 10 // Random votes between 10 and 60
})).sort((a, b) => b.votes - a.votes);

// 4. Best Features Data
const featuresData = [
    { subject: 'Diseño', A: 85, fullMark: 100 },
    { subject: 'Contenido', A: 90, fullMark: 100 },
    { subject: 'Navegación', A: 75, fullMark: 100 },
    { subject: 'Velocidad', A: 80, fullMark: 100 },
    { subject: 'Interactividad', A: 70, fullMark: 100 },
];

// NEW: 5. Student Progress Distribution
const studentProgressData = [
    { range: '0-20%', students: 5 },
    { range: '21-40%', students: 12 },
    { range: '41-60%', students: 18 },
    { range: '61-80%', students: 15 },
    { range: '81-100%', students: 9 },
];

// NEW: 6. Module Completion & Usage
// NEW: 6. Module Completion & Usage (Static Data)
const moduleStatsData = [
    { name: 'Intro a IA', fullTitle: 'Introducción a la IA Generativa', users: 55, completion: 62 },
    { name: 'Word a PDF', fullTitle: 'Convierte Documentos de Word a PDF', users: 58, completion: 92 },
    { name: 'Google Drive', fullTitle: 'Google Drive y OneDrive: Tu Mochila en la Nube', users: 52, completion: 78 },
    { name: 'Archivos ZIP', fullTitle: 'Manejo de Archivos ZIP y RAR', users: 45, completion: 85 },
    { name: 'Correo Profesional', fullTitle: 'Domina tu Correo Electrónico Profesional', users: 38, completion: 72 },
    { name: 'WeTransfer', fullTitle: 'WeTransfer: Envía Archivos Grandes', users: 30, completion: 88 },
    { name: 'Seguridad Digital', fullTitle: 'Protege tus Cuentas: Contraseñas y MFA', users: 25, completion: 95 },
];

// Summary Metrics
const totalResponses = 59;
const avgSatisfaction = 4.8; // out of 5
const npsScore = 82;

export default function FeedbackResultsPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 p-4 sm:p-6 lg:p-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Activity className="h-8 w-8 text-primary" />
                        Resultados de la Encuesta y Avance
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Visualización de las estadísticas, feedback y progreso académico.
                    </p>
                </div>
                <Link href="/feedback">
                    <Button variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Volver a la Encuesta
                    </Button>
                </Link>
                <Link href="/comentarios">
                    <Button variant="default" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                        <MessageSquare className="h-4 w-4" />
                        Ver Comentarios
                    </Button>
                </Link>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Estudiantes Activos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold flex items-center gap-2 text-blue-600 dark:text-blue-400">
                            <Users className="h-8 w-8" />
                            {totalResponses}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 text-green-600 flex items-center gap-1">
                            <Activity className="h-3 w-3" />
                            +12% nuevos inscritos
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Satisfacción Promedio</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold flex items-center gap-2 text-green-600 dark:text-green-400">
                            <Star className="h-8 w-8 fill-current" />
                            {avgSatisfaction}
                            <span className="text-lg text-muted-foreground font-normal">/ 5.0</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Alta satisfacción general</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Tasa de Finalización</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold flex items-center gap-2 text-purple-600 dark:text-purple-400">
                            <ThumbsUp className="h-8 w-8" />
                            68%
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Promedio global de cursos</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* 1. Student Progress Distribution (NEW) */}
                <Card className="lg:col-span-1 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle>Distribución de Avance Estudiantil</CardTitle>
                        <CardDescription>Porcentaje de progreso alcanzado por los estudiantes.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={studentProgressData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                                <YAxis allowDecimals={false} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="flex flex-col">
                                                            <span className="text-[0.70rem] uppercase text-muted-foreground">Rango</span>
                                                            <span className="font-bold text-muted-foreground">{payload[0].payload.range}</span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[0.70rem] uppercase text-muted-foreground">Estudiantes</span>
                                                            <span className="font-bold">{payload[0].value}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return null
                                    }}
                                />
                                <Bar dataKey="students" fill="#8884d8" radius={[4, 4, 0, 0]}>
                                    {studentProgressData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* 2. Completion & Usage by Module (NEW - Combined) */}
                <Card className="lg:col-span-1 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle>Uso y Completación por Módulo</CardTitle>
                        <CardDescription>Usuarios activos vs % de completación promedio.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={moduleStatsData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid stroke="#f5f5f5" />
                                <XAxis dataKey="name" scale="band" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" />
                                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" label={{ value: 'Usuarios', angle: -90, position: 'insideLeft' }} />
                                <YAxis yAxisId="right" orientation="right" stroke="#ff7300" unit="%" />
                                <Tooltip />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Bar yAxisId="left" dataKey="users" name="Usuarios Activos" barSize={20} fill="#413ea0" radius={[4, 4, 0, 0]} />
                                <Line yAxisId="right" type="monotone" dataKey="completion" name="% Completación" stroke="#ff7300" strokeWidth={2} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* 3. Clarity (Donut Chart) - Kept from original but resized if needed */}
                <Card className="lg:col-span-1 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle>Claridad del Contenido</CardTitle>
                        <CardDescription>¿Fueron claros los contenidos de los módulos?</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={clarityData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                >
                                    {clarityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value: number) => [value, 'Votos']} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* 4. Experience Distribution (Pie) */}
                <Card className="lg:col-span-1 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle>Experiencia de Uso</CardTitle>
                        <CardDescription>Distribución de calificaciones.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={usageData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {usageData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS_SATISFACTION[index % COLORS_SATISFACTION.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value: number) => [value, 'Votos']} />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* 5. Best Features (Radar Chart) */}
                <Card className="lg:col-span-2 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle>Aspectos Destacados</CardTitle>
                        <CardDescription>Lo que más gustó de la plataforma (Escala 0-100)</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={featuresData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                <Radar
                                    name="Puntuación"
                                    dataKey="A"
                                    stroke="#8884d8"
                                    fill="#8884d8"
                                    fillOpacity={0.6}
                                />
                                <Tooltip />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
