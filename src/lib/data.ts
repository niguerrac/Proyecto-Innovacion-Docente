import type { LucideIcon } from 'lucide-react';
import { HardDrive, Mail, FileText, Share2, BrainCircuit, Computer } from 'lucide-react';

export type SkillCategory = 'Gestión de Archivos' | 'Comunicación Digital' | 'Herramientas de Productividad' | 'Colaboración en Línea' | 'Inteligencia Artificial' | 'Navegación Básica';

export interface Module {
  moduleId: string;
  title: string;
  description: string;
  skillCategory: SkillCategory;
  content: string | {
    intro?: string;
    objectives?: string[]; // Beneficios Clave
    steps?: { title: string; content: string; imageUrl?: string }[];
    interactive?: {
      title: string;
      description: string;
      type?: 'file-zip' | 'simulation' | 'quiz'; // Added type for flexibility, though not strictly using it yet in logic unless we change page.tsx
      checklist?: string[]; // For the activity checklist
      activityBrief?: string; // "Redacta inmediatamente un borrador..."
    };
    keyPoints?: string[];
  };
  marketingData?: {
    heroTitle: string;
    heroSubtitle: string;
    videoUrl?: string;
    stepsTitle?: string;
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
    marketingData: {
      heroTitle: 'Word a PDF en 60 Segundos',
      heroSubtitle: 'Métodos rápidos para asegurar la integridad y el formato de los documentos.',
      videoUrl: 'https://www.youtube.com/embed/0-Qg3DFtYw8?si=--lKrSpQyCUmwz4j', // 
      stepsTitle: 'Guía: De Word a PDF paso a paso'
    },
    content: {
      objectives: [
        'Exportar correctamente cualquier documento Word a PDF.',
        'Garantizar que el formato (fuentes, márgenes) se mantenga intacto.',
        'Usar el "Atajo de Impresión" para convertir archivos desde otras apps.'
      ],
      steps: [
        {
          title: 'A. Introducción: ¿Por qué PDF?',
          content: 'El formato Word (.docx) puede cambiar según el computador donde se abra. El PDF (.pdf) es universal, fijo y profesional. Garantiza que tu trabajo se vea exactamente igual para todos.'
        },
        {
          title: 'B. Método #1: El Método Profesional (Guardar Como)',
          content: 'Es el método más seguro. En Word, ve a la pestaña "Archivo" > "Guardar Como" (o "Exportar"). En el menú desplegable de tipo de archivo, selecciona "PDF". Esto asegura la mejor calidad.'
        },
        {
          title: 'C. Método #2: El Atajo Rápido (Imprimir)',
          content: 'Funciona en casi cualquier programa. Presiona Ctrl + P (o Cmd + P en Mac). En la lista de impresoras, elige "Microsoft Print to PDF" o "Guardar como PDF". Es ideal para guardar páginas web o correos.'
        },
        {
          title: 'D. Alternativa Online (Riesgos y Ventajas)',
          content: 'Existen conversores online (iLovePDF, Smallpdf). Son rápidos si no tienes Word, pero ¡Cuidado! Evita subir documentos con datos personales o sensibles a servidores desconocidos.'
        },
        {
          title: 'E. Cierre y Práctica',
          content: 'Siempre que puedas, usa "Guardar Como" en Word. Es el estándar profesional. ¡Ahora tu documento está blindado contra cambios de formato!'
        }
      ],
      interactive: {
        title: '¡Tu Documento A Prueba de Errores!',
        description: 'Verifica que puedes crear un PDF perfecto.',
        activityBrief: 'Abre un documento de Word reciente y crea una versión PDF usando el método "Guardar Como".',
        checklist: [
          'He usado Archivo > Guardar Como (o Exportar)',
          'He seleccionado el formato PDF en el menú',
          'He abierto el PDF resultante y verificado que el formato es idéntico',
          'Desafío: He probado "Imprimir a PDF" con una página web'
        ]
      }
    },
    imageUrl: '/image/wordApdf.png',
    dataAiHint: 'document icon'
  },
  {
    moduleId: 'comms001',
    title: 'Domina tu Correo Electrónico Profesional',
    description: 'Aprende a escribir correos efectivos, evitar el phishing y organizar tu bandeja de entrada en minutos.',
    skillCategory: 'Comunicación Digital',
    marketingData: {
      heroTitle: 'Domina tu Bandeja de Entrada',
      heroSubtitle: 'Las 3 Reglas de Oro para un correo profesional, conciso y seguro.',
      stepsTitle: '🗝️ Las 3 Reglas del Correo Eficiente'
    },
    content: {
      objectives: [
        'Redactar correos que se leen y se responden al instante.',
        'Aplicar la "Regla de los 3 Segundos" para evitar el Phishing y fraudes.',
        'La diferencia crítica entre CC y CCO (y cuándo usar cada uno).',
        'Implementar la técnica de "Tocar una vez" para vaciar tu bandeja de entrada diariamente.'
      ],
      steps: [
        {
          title: 'Regla #1: El Asunto ACCIONABLE (La Regla C-A-C)',
          content: 'El Asunto debe resumir la acción y la fecha clave.\n\n❌ Ejemplo Malo: Reunión.\n✅ Ejemplo Bueno: Reunión de Equipo - Necesito tu confirmación antes del 15/Dic.'
        },
        {
          title: 'Regla #2: La Respuesta Mínima y Segura',
          content: 'Mantén el cuerpo del mensaje corto (máx. 3 párrafos).\n\n• Usa CC para quien necesita estar informado.\n• Usa CCO solo para proteger la privacidad.\n• Nunca respondas con datos personales a un correo sospechoso.'
        },
        {
          title: 'Regla #3: Archivar, no Acumular',
          content: 'Usa Carpetas o Etiquetas para clasificar el correo una vez que ha sido leído/respondido. Configura una Firma Automática profesional para ahorrar tiempo.'
        }
      ],
      interactive: {
        title: '¡Actívate! Pon a Prueba tus Habilidades',
        description: 'Es hora de aplicar lo aprendido.',
        activityBrief: 'Redacta inmediatamente un borrador de correo a un colega o profesor aplicando las reglas aprendidas.',
        checklist: [
          'Asunto claro y accionable (C-A-C)',
          'Cuerpo conciso (máx 3 párrafos)',
          'Firma presente',
          'Uso correcto de CC/CCO'
        ]
      },
      keyPoints: [] // Using objectives instead for the "Beneficios" section as requested
    },
    imageUrl: '/image/modulo_Corre.png',
    dataAiHint: 'email inbox'
  },
  {
    moduleId: 'collab001',
    title: 'WeTransfer: Envía Archivos Grandes',
    description: 'Aprende a utilizar servicios como WeTransfer para compartir presentaciones y videos pesados sin problemas.',
    skillCategory: 'Colaboración en Línea',
    marketingData: {
      heroTitle: 'WeTransfer Rápido y Fácil',
      heroSubtitle: 'La solución definitiva para enviar archivos de hasta 2 GB gratis.',
      videoUrl: 'https://www.youtube.com/embed/NIihysCnrQQ?si=2TCjk2J9tnTWwbdi',
      stepsTitle: 'Guía: Compártelo en 4 Pasos'
    },
    content: {
      objectives: [
        'Enviar archivos de más de 25 MB (superando el límite del correo).',
        'Usar WeTransfer Free sin necesidad de registros complejos.',
        'Generar enlaces de descarga para compartir por cualquier medio.'
      ],
      steps: [
        {
          title: 'A. Introducción: ¿Por qué WeTransfer?',
          content: 'La mayoría de los correos limitan los adjuntos a 25 MB. WeTransfer te permite enviar hasta 2 GB gratis. ¡Es la herramienta ideal para videos y presentaciones pesadas!'
        },
        {
          title: 'B. Acceso y Subida',
          content: 'Ve a wetransfer.com. Acepta las cookies si es necesario. Haz clic en el botón azul "+" o "Subir archivos" y selecciona tus documentos. Puedes subir varios a la vez.'
        },
        {
          title: 'C. Configuración: ¿Email o Enlace?',
          content: 'Tienes dos opciones: 1. Enviar email (pones tu correo y el del destinatario). 2. Obtener enlace (clic en "..." y selecciona "Conseguir enlace de transferencia"). Esta última es mejor para WhatsApp.'
        },
        {
          title: 'D. Subida y Aviso Importante',
          content: 'Espera a que la bolita de progreso llegue al 100%. Importante: Los archivos solo duran 7 días en la versión gratuita. ¡Avisa a tus contactos que los descarguen pronto!'
        }
      ],
      interactive: {
        title: '¡Tu Primera Gran Transferencia!',
        description: 'Prueba enviar un archivo pesado ahora mismo.',
        activityBrief: 'Sube un archivo (o carpeta .zip) de más de 10 MB y genera un enlace de descarga.',
        checklist: [
          'He comprimido mis archivos en un ZIP (opcional pero recomendado)',
          'He subido el archivo a WeTransfer',
          'He seleccionado la opción "Conseguir enlace de transferencia"',
          'He probado el enlace en una nueva pestaña para verificar la descarga'
        ]
      }
    },
    imageUrl: '/image/wetransfer.png',
    dataAiHint: 'cloud upload'
  },
  {
    moduleId: 'ai001',
    title: 'Introducción a la IA Generativa',
    description: 'Descubre cómo usar herramientas de IA para investigar, generar ideas y mejorar tus trabajos académicos.',
    skillCategory: 'Inteligencia Artificial',
    marketingData: {
      heroTitle: 'Introducción a la IA Generativa',
      heroSubtitle: 'Uso práctico y rápido de ChatGPT y Gemini para productividad.',
      videoUrl: '',
      stepsTitle: 'Guía práctica: Del Prompt al Resultado'
    },
    content: {
      objectives: [
        'Crear un prompt efectivo que incluya Rol, Tarea y Formato.',
        'Usar el prompt en ChatGPT o Gemini para obtener resultados útiles.',
        'Identificar usos prácticos y rápidos para la productividad diaria.'
      ],
      steps: [
        {
          title: 'A. Introducción: ¿Qué son y para qué sirven?',
          content: 'ChatGPT (OpenAI) y Gemini (Google) son modelos de lenguaje grande (LLM). No son buscadores, son generadores de texto, ideas y código.\n\nSon tus asistentes personales. Se usan para crear y acelerar el trabajo, no para reemplazarlo.'
        },
        {
          title: 'B. Acceso Rápido: Primeros Pasos',
          content: 'Necesitas una cuenta de correo (Google para Gemini; registro simple para ChatGPT).\n\nEl acceso es fácil y rápido. Simplemente escribe lo que necesitas en el cuadro de texto central.'
        },
        {
          title: 'C. El Arte del Prompt (La Receta)',
          content: 'Técnica 3F: Función, Formato, Foco.\n\nEjemplo: "Actúa como un profesor universitario (Función), haz un resumen de 300 palabras (Formato) sobre la fotosíntesis (Foco)."\n\nEl secreto está en el prompt. Cuanto más específico seas, mejor será la respuesta. Define un ROL para obtener un tono específico.'
        },
        {
          title: 'D. 3 Usos Prácticos y Rápidos',
          content: '1. Resumir textos largos.\n2. Generar ideas (lluvia de ideas).\n3. Corregir ortografía/gramática o cambiar el tono.\n\nUsa la IA para el 80% del trabajo. Ej.: Pídele 5 títulos para un ensayo y elige el mejor.'
        },
        {
          title: 'E. Cierre y Advertencias (Limitaciones)',
          content: 'Advertencia clave: No siempre son 100% precisos (alucinaciones). Confidencialidad: Nunca compartas información personal o sensible.\n\nSiempre verifica los datos importantes. Trátalos como una fuente de ideas, no de verdad absoluta.'
        },
        {
          title: 'F. Resumen y Actividad (CTA)',
          content: 'Entrar, Escribir, Aplicar la Técnica 3F.\n\n¡Es hora de practicar!'
        }
      ],
      interactive: {
        title: '¡Tu Primer Prompt de 3 Partes!',
        description: 'Abre tu plataforma de elección (ChatGPT o Gemini) y crea un prompt.',
        activityBrief: 'Crea un prompt que contenga obligatoriamente estas tres partes: ROL (ej: chef), TAREA (ej: lista de compras) y FORMATO (ej: tabla). Ejecútalo.',
        checklist: [
          'He definido un ROL (ej: experto, guía, critico)',
          'He establecido una TAREA clara',
          'He especificado un FORMATO de salida',
          'He verificado la respuesta en la plataforma IA'
        ]
      }
    },
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
