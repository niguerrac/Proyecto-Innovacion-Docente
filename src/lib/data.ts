import type { LucideIcon } from 'lucide-react';
import { Code, Users, BarChart, PenTool, Megaphone, BookOpen } from 'lucide-react';

export type SkillCategory = 'Técnica' | 'Liderazgo' | 'Análisis de Datos' | 'Diseño' | 'Marketing' | 'General';

export interface Module {
  moduleId: string;
  title: string;
  description: string;
  skillCategory: SkillCategory;
  content: string;
  imageUrl: string;
  dataAiHint: string;
}

export interface Question {
  questionId: string;
  text: string;
  options: { text: string; weight: number }[];
  skillCategory: SkillCategory;
}

export interface UserProgress {
    moduleId: string;
    progress: number;
}

export const skillCategories: { name: SkillCategory; icon: LucideIcon }[] = [
  { name: 'Técnica', icon: Code },
  { name: 'Liderazgo', icon: Users },
  { name: 'Análisis de Datos', icon: BarChart },
  { name: 'Diseño', icon: PenTool },
  { name: 'Marketing', icon: Megaphone },
  { name: 'General', icon: BookOpen },
];


export const availableModules: Module[] = [
  {
    moduleId: 'tech001',
    title: 'Patrones Avanzados de React',
    description: 'Profundiza en hooks, contexto y optimización del rendimiento en React.',
    skillCategory: 'Técnica',
    content: 'El contenido del módulo va aquí...',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'react code'
  },
  {
    moduleId: 'lead001',
    title: 'Comunicación Efectiva en Equipo',
    description: 'Aprende estrategias para una comunicación clara y empática dentro de tu equipo.',
    skillCategory: 'Liderazgo',
    content: 'El contenido del módulo va aquí...',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'team communication'
  },
  {
    moduleId: 'data001',
    title: 'SQL para Análisis de Datos',
    description: 'Domina las consultas SQL para extraer y analizar datos de bases de datos.',
    skillCategory: 'Análisis de Datos',
    content: 'El contenido del módulo va aquí...',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'data analysis'
  },
  {
    moduleId: 'design001',
    title: 'Fundamentos de Diseño UI/UX',
    description: 'Una introducción a los principios del diseño de interfaz y experiencia de usuario.',
    skillCategory: 'Diseño',
    content: 'El contenido del módulo va aquí...',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'ui design'
  },
   {
    moduleId: 'tech002',
    title: 'Introducción a Python',
    description: 'Aprende los fundamentos de la programación en Python para desarrollo backend y ciencia de datos.',
    skillCategory: 'Técnica',
    content: 'El contenido del módulo va aquí...',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'python code'
  },
  {
    moduleId: 'market001',
    title: 'Fundamentos de Marketing Digital',
    description: 'Cubre estrategias de SEO, redes sociales y marketing de contenidos.',
    skillCategory: 'Marketing',
    content: 'El contenido del módulo va aquí...',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'digital marketing'
  },
  {
    moduleId: 'lead002',
    title: 'Conceptos Básicos de Gestión de Proyectos',
    description: 'Un resumen de las metodologías Agile y Scrum para la gestión de proyectos.',
    skillCategory: 'Liderazgo',
    content: 'El contenido del módulo va aquí...',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'project management'
  },
  {
    moduleId: 'gen001',
    title: 'Confianza para Hablar en Público',
    description: 'Desarrolla la confianza y las habilidades para hablar en público de manera efectiva.',
    skillCategory: 'General',
    content: 'El contenido del módulo va aquí...',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'public speaking'
  }
];

export const assessmentQuestions: Question[] = [
    {
        questionId: 'q1',
        text: '¿Qué tan cómodo te sientes escribiendo funciones complejas en JavaScript?',
        options: [
            { text: 'Nada cómodo', weight: 1 },
            { text: 'Un poco cómodo', weight: 3 },
            { text: 'Moderadamente cómodo', weight: 6 },
            { text: 'Muy cómodo', weight: 10 },
        ],
        skillCategory: 'Técnica'
    },
    {
        questionId: 'q2',
        text: 'Al liderar un proyecto, ¿cómo manejas típicamente los desacuerdos dentro de tu equipo?',
        options: [
            { text: 'Los evito', weight: 1 },
            { text: 'Intento encontrar un compromiso rápido', weight: 4 },
            { text: 'Facilito una discusión para encontrar la mejor solución', weight: 8 },
            { text: 'Tomo una decisión ejecutiva', weight: 6 },
        ],
        skillCategory: 'Liderazgo'
    },
    {
        questionId: 'q3',
        text: '¿Qué tan seguro te sientes al crear una paleta de colores cohesiva para un nuevo proyecto de diseño?',
        options: [
            { text: 'Inseguro', weight: 1 },
            { text: 'Puedo hacerlo con una herramienta', weight: 4 },
            { text: 'Bastante seguro', weight: 7 },
            { text: 'Muy seguro, entiendo la teoría del color', weight: 10 },
        ],
        skillCategory: 'Diseño'
    },
    {
        questionId: 'q4',
        text: '¿Cuál de las siguientes opciones describe mejor tu habilidad para escribir consultas SQL para unir múltiples tablas?',
        options: [
            { text: 'No sé SQL', weight: 0 },
            { text: 'Puedo escribir una instrucción SELECT simple', weight: 2 },
            { text: 'Me siento cómodo con INNER y LEFT joins', weight: 7 },
            { text: 'Puedo escribir consultas complejas con múltiples uniones y subconsultas', weight: 10 },
        ],
        skillCategory: 'Análisis de Datos'
    },
    {
        questionId: 'q5',
        text: '¿Cómo abordas el aprendizaje de un nuevo lenguaje de programación o framework?',
        options: [
            { text: 'Espero hasta que sea absolutamente necesario', weight: 2 },
            { text: 'Leo la documentación', weight: 6 },
            { text: 'Construyo un pequeño proyecto con él', weight: 10 },
            { text: 'Tomo un curso completo en línea', weight: 8 },
        ],
        skillCategory: 'Técnica'
    }
];

export const userProgressData: UserProgress[] = [
    { moduleId: 'tech001', progress: 75 },
    { moduleId: 'lead001', progress: 40 },
    { moduleId: 'design001', progress: 10 },
]
