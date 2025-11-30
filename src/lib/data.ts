import type { LucideIcon } from 'lucide-react';
import { HardDrive, Mail, FileText, Share2, BrainCircuit, Computer } from 'lucide-react';

export type SkillCategory = 'Gestión de Archivos' | 'Comunicación Digital' | 'Herramientas de Productividad' | 'Colaboración en Línea' | 'Inteligencia Artificial' | 'Navegación Básica';

export interface Module {
  moduleId: string;
  title: string;
  description: string;
  skillCategory: SkillCategory;
  content: string | {
    intro: string;
    steps?: { title: string; content: string; imageUrl?: string }[];
    interactive?: { title: string; description: string };
    keyPoints: string[];
  };
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
  { name: 'Gestión de Archivos', icon: HardDrive },
  { name: 'Comunicación Digital', icon: Mail },
  { name: 'Herramientas de Productividad', icon: FileText },
  { name: 'Colaboración en Línea', icon: Share2 },
  { name: 'Inteligencia Artificial', icon: BrainCircuit },
  { name: 'Navegación Básica', icon: Computer },
];


export const availableModules: Module[] = [
  {
    moduleId: 'files001',
    title: 'Manejo de Archivos ZIP y RAR',
    description: 'Aprende a comprimir y descomprimir archivos para organizar y compartir tus trabajos universitarios de forma sencilla.',
    skillCategory: 'Gestión de Archivos',
    content: {
        intro: 'Los archivos comprimidos (.zip, .rar) son como una maleta para tus archivos digitales. Te permiten agrupar muchos archivos y carpetas en un solo paquete, que ocupa menos espacio y es más fácil de enviar. En este módulo, aprenderás a "hacer la maleta" (comprimir) y "desempacar" (descomprimir).',
        steps: [
            {
                title: '¿Qué es un archivo comprimido?',
                content: 'Imagina que tienes 10 libros. Llevarlos uno por uno es incómodo. Si los metes en una mochila, es más fácil. Un archivo .zip o .rar es esa mochila. Agrupa tus documentos, imágenes y trabajos en un solo archivo.',
            },
            {
                title: 'Paso 1: Descomprimir un Archivo (Sacar los archivos)',
                content: 'Cuando recibes un archivo .zip o .rar, necesitas "descomprimirlo". La mayoría de los computadores modernos te permiten hacerlo con un clic derecho. Busca la opción que diga "Extraer todo...", "Extraer aquí" o "Unzip". Al hacerlo, se creará una carpeta normal con todos los archivos que estaban dentro.',
                imageUrl: '/image/modulo_archivosZip/unzip.png'
            },
            {
                title: 'Paso 2: Comprimir Archivos (Crear tu propio .zip)',
                content: 'Para enviar varios archivos a un profesor, selecciónalos todos, haz clic derecho y busca una opción como "Comprimir en archivo ZIP" o "Añadir al archivo...". Esto creará un único archivo .zip con todo lo que seleccionaste, listo para ser enviado por correo.',
                imageUrl: '/image/modulo_archivosZip/zip.png'
            }
        ],
        interactive: {
            title: 'Descomprimir y Comprimir un Archivo',
            description: '¡Es hora de practicar! Descarga el archivo de trabajo, descomprímelo, cambia el nombre del documento que encontrarás dentro y, finalmente, vuelve a comprimir la carpeta en formato .zip para subirla.'
        },
        keyPoints: [
            'Comprimir agrupa muchos archivos en uno solo y reduce su tamaño.',
            'Descomprimir (o extraer) saca los archivos de la "maleta" comprimida.',
            'Usa clic derecho para encontrar las opciones de "Comprimir" y "Extraer".',
            'Enviar un solo archivo .zip es más ordenado y rápido que enviar muchos archivos sueltos.'
        ]
    },
    imageUrl: '/image/archivos_rar.png',
    dataAiHint: 'file folders'
  },
  {
    moduleId: 'productivity001',
    title: 'Convierte Documentos de Word a PDF',
    description: 'Asegúrate de que tus documentos se vean igual en cualquier dispositivo aprendiendo a exportarlos a PDF.',
    skillCategory: 'Herramientas de Productividad',
    content: 'El contenido del módulo va aquí...',
    imageUrl: '/image/wordApdf.png',
    dataAiHint: 'document icon'
  },
  {
    moduleId: 'comms001',
    title: 'Dominando tu Correo Electrónico',
    description: 'Desde enviar y recibir hasta filtrar y programar envíos. Domina la herramienta de comunicación más importante.',
    skillCategory: 'Comunicación Digital',
    content: 'El contenido del módulo va aquí...',
    imageUrl: '/image/modulo_Corre.png',
    dataAiHint: 'email inbox'
  },
  {
    moduleId: 'collab001',
    title: 'WeTransfer: Envía Archivos Grandes',
    description: 'Aprende a utilizar servicios como WeTransfer para compartir presentaciones y videos pesados sin problemas.',
    skillCategory: 'Colaboración en Línea',
    content: 'El contenido del módulo va aquí...',
    imageUrl: '/image/wetransfer.png',
    dataAiHint: 'cloud upload'
  },
   {
    moduleId: 'ai001',
    title: 'Introducción a ChatGPT y Gemini',
    description: 'Descubre cómo usar herramientas de IA para investigar, generar ideas y mejorar tus trabajos académicos.',
    skillCategory: 'Inteligencia Artificial',
    content: 'El contenido del módulo va aquí...',
    imageUrl: '/image/Gpt.png',
    dataAiHint: 'robot brain'
  },
  {
    moduleId: 'nav001',
    title: 'Navegación Eficaz en el Computador',
    description: 'Conceptos básicos para encontrar archivos, usar carpetas y moverte con fluidez en tu sistema operativo.',
    skillCategory: 'Navegación Básica',
    content: 'El contenido del módulo va aquí...',
    imageUrl: '/image/navegacion.png',
    dataAiHint: 'computer desktop'
  },
  {
    moduleId: 'productivity002',
    title: 'Primeros Pasos con Hojas de Cálculo',
    description: 'Aprende a crear tablas, usar fórmulas básicas y generar gráficos para organizar y presentar datos.',
    skillCategory: 'Herramientas de Productividad',
    content: 'El contenido del módulo va aquí...',
    imageUrl: '/image/hojaCalculo.jpg',
    dataAiHint: 'spreadsheet data'
  },
  {
    moduleId: 'comms002',
    title: 'Etiqueta en la Comunicación Online',
    description: 'Aprende las normas básicas de cortesía y profesionalismo en correos, foros y chats académicos.',
    skillCategory: 'Comunicación Digital',
    content: 'El contenido del módulo va aquí...',
    imageUrl: '/image/modulo_Corre.png',
    dataAiHint: 'online chat'
  }
];

export const assessmentQuestions: Question[] = [
    {
        questionId: 'q1',
        text: 'Si recibes un correo con un archivo llamado "trabajo_final.rar", ¿sabes qué hacer para ver su contenido?',
        options: [
            { text: 'No, no sé qué es un archivo .rar', weight: 1 },
            { text: 'He oído hablar de ellos, pero no estoy seguro', weight: 4 },
            { text: 'Creo que necesitaría un programa especial', weight: 7 },
            { text: 'Sí, sé cómo descomprimirlo fácilmente', weight: 10 },
        ],
        skillCategory: 'Gestión de Archivos'
    },
    {
        questionId: 'q2',
        text: 'Cuando terminas un trabajo en Word, ¿cómo lo envías para asegurarte de que nadie pueda modificarlo?',
        options: [
            { text: 'Lo envío como archivo de Word (.docx)', weight: 2 },
            { text: 'No estoy seguro de cuál es la mejor forma', weight: 4 },
            { text: 'Sé que se puede guardar en otro formato, pero no sé cómo', weight: 6 },
            { text: 'Lo exporto a PDF antes de enviarlo', weight: 10 },
        ],
        skillCategory: 'Herramientas de Productividad'
    },
    {
        questionId: 'q3',
        text: '¿Qué tan cómodo te sientes organizando tus correos en carpetas o etiquetas (por ejemplo, por materia)?',
        options: [
            { text: 'No sabía que se podía hacer eso', weight: 1 },
            { text: 'Me gustaría aprender a hacerlo', weight: 4 },
            { text: 'A veces lo hago, pero me cuesta mantener el orden', weight: 7 },
            { text: 'Tengo un sistema de carpetas y lo uso constantemente', weight: 10 },
        ],
        skillCategory: 'Comunicación Digital'
    },
    {
        questionId: 'q4',
        text: 'Un profesor te pide buscar "artículos académicos sobre la fotosíntesis publicados después de 2020". ¿Qué tan seguro te sientes de poder encontrar esa información usando un buscador web?',
        options: [
            { text: 'Muy inseguro, no sabría por dónde empezar', weight: 1 },
            { text: 'Buscaría "fotosíntesis" y revisaría los resultados', weight: 4 },
            { text: 'Usaría la búsqueda avanzada para filtrar por fecha', weight: 8 },
            { text: 'Sé cómo usar operadores de búsqueda para ser muy preciso', weight: 10 },
        ],
        skillCategory: 'Navegación Básica'
    },
    {
        questionId: 'q5',
        text: '¿Has utilizado alguna vez una herramienta de IA como ChatGPT o Gemini para ayudarte con tus estudios?',
        options: [
            { text: 'No, y no me interesa', weight: 1 },
            { text: 'He oído hablar de ellas, pero nunca las he usado', weight: 4 },
            { text: 'Las he usado un par de veces para hacer preguntas sencillas', weight: 7 },
            { text: 'Sí, las uso regularmente para investigar y generar borradores', weight: 10 },
        ],
        skillCategory: 'Inteligencia Artificial'
    }
];

export const userProgressData: UserProgress[] = [
    { moduleId: 'files001', progress: 75 },
    { moduleId: 'comms001', progress: 40 },
    { moduleId: 'ai001', progress: 10 },
]
