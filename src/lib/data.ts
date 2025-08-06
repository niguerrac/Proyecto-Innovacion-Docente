import type { LucideIcon } from 'lucide-react';
import { Code, Users, BarChart, PenTool, Megaphone, BookOpen } from 'lucide-react';

export type SkillCategory = 'Technical' | 'Leadership' | 'Data Analysis' | 'Design' | 'Marketing' | 'General';

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
  { name: 'Technical', icon: Code },
  { name: 'Leadership', icon: Users },
  { name: 'Data Analysis', icon: BarChart },
  { name: 'Design', icon: PenTool },
  { name: 'Marketing', icon: Megaphone },
  { name: 'General', icon: BookOpen },
];


export const availableModules: Module[] = [
  {
    moduleId: 'tech001',
    title: 'Advanced React Patterns',
    description: 'Deep dive into hooks, context, and performance optimization in React.',
    skillCategory: 'Technical',
    content: 'Module content goes here...',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'react code'
  },
  {
    moduleId: 'lead001',
    title: 'Effective Team Communication',
    description: 'Learn strategies for clear and empathetic communication within your team.',
    skillCategory: 'Leadership',
    content: 'Module content goes here...',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'team communication'
  },
  {
    moduleId: 'data001',
    title: 'SQL for Data Analysis',
    description: 'Master SQL queries to extract and analyze data from databases.',
    skillCategory: 'Data Analysis',
    content: 'Module content goes here...',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'data analysis'
  },
  {
    moduleId: 'design001',
    title: 'UI/UX Design Fundamentals',
    description: 'An introduction to the principles of user interface and user experience design.',
    skillCategory: 'Design',
    content: 'Module content goes here...',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'ui design'
  },
   {
    moduleId: 'tech002',
    title: 'Introduction to Python',
    description: 'Learn the fundamentals of Python programming for backend development and data science.',
    skillCategory: 'Technical',
    content: 'Module content goes here...',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'python code'
  },
  {
    moduleId: 'market001',
    title: 'Digital Marketing Essentials',
    description: 'Covering SEO, social media, and content marketing strategies.',
    skillCategory: 'Marketing',
    content: 'Module content goes here...',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'digital marketing'
  },
  {
    moduleId: 'lead002',
    title: 'Project Management Basics',
    description: 'An overview of Agile and Scrum methodologies for managing projects.',
    skillCategory: 'Leadership',
    content: 'Module content goes here...',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'project management'
  },
  {
    moduleId: 'gen001',
    title: 'Public Speaking Confidence',
    description: 'Build confidence and skills for effective public speaking.',
    skillCategory: 'General',
    content: 'Module content goes here...',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'public speaking'
  }
];

export const assessmentQuestions: Question[] = [
    {
        questionId: 'q1',
        text: 'How comfortable are you with writing complex functions in JavaScript?',
        options: [
            { text: 'Not comfortable at all', weight: 1 },
            { text: 'Slightly comfortable', weight: 3 },
            { text: 'Moderately comfortable', weight: 6 },
            { text: 'Very comfortable', weight: 10 },
        ],
        skillCategory: 'Technical'
    },
    {
        questionId: 'q2',
        text: 'When leading a project, how do you typically handle disagreements within your team?',
        options: [
            { text: 'Avoid them', weight: 1 },
            { text: 'Try to find a quick compromise', weight: 4 },
            { text: 'Facilitate a discussion to find the best solution', weight: 8 },
            { text: 'Make an executive decision', weight: 6 },
        ],
        skillCategory: 'Leadership'
    },
    {
        questionId: 'q3',
        text: 'How confident are you in creating a cohesive color palette for a new design project?',
        options: [
            { text: 'Not confident', weight: 1 },
            { text: 'I can do it with a tool', weight: 4 },
            { text: 'Fairly confident', weight: 7 },
            { text: 'Very confident, I understand color theory', weight: 10 },
        ],
        skillCategory: 'Design'
    },
    {
        questionId: 'q4',
        text: 'Which of the following best describes your ability to write SQL queries to join multiple tables?',
        options: [
            { text: 'I don\'t know SQL', weight: 0 },
            { text: 'I can write a simple SELECT statement', weight: 2 },
            { text: 'I am comfortable with INNER and LEFT joins', weight: 7 },
            { text: 'I can write complex queries with multiple joins and subqueries', weight: 10 },
        ],
        skillCategory: 'Data Analysis'
    },
    {
        questionId: 'q5',
        text: 'How do you approach learning a new programming language or framework?',
        options: [
            { text: 'I wait until I absolutely have to', weight: 2 },
            { text: 'I read the documentation', weight: 6 },
            { text: 'I build a small project with it', weight: 10 },
            { text: 'I take a full online course', weight: 8 },
        ],
        skillCategory: 'Technical'
    }
];

export const userProgressData: UserProgress[] = [
    { moduleId: 'tech001', progress: 75 },
    { moduleId: 'lead001', progress: 40 },
    { moduleId: 'design001', progress: 10 },
]
