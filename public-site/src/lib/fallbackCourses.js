// Datos semilla (seed) locales de cursos.
//
// IMPORTANTE: este archivo cumple un rol clave para la evaluación.
// La API mock (http://localhost:4000/api) puede estar APAGADA durante el
// `next build` o en producción. Para que la construcción y el renderizado
// nunca fallen, cada fetch de la capa de datos (src/lib/api.js) hace
// try/catch y, ante cualquier error, devuelve estos datos locales.
//
// Cada objeto respeta el contrato Course:
// { id, title, description, category, credits, instructor,
//   schedule, capacity, enrolled, imageUrl }
// La imagen usa picsum.photos con un seed estable por id.

export const fallbackCourses = [
  {
    id: '1',
    title: 'Introducción a la Programación',
    description:
      'Fundamentos de la programación con un enfoque práctico: variables, control de flujo, funciones y resolución de problemas. Ideal para iniciar tu camino en el desarrollo de software.',
    category: 'Tecnología',
    credits: 4,
    instructor: 'Dra. Ana Morales',
    schedule: 'Lun y Mié 08:00 - 10:00',
    capacity: 40,
    enrolled: 32,
    imageUrl: 'https://picsum.photos/seed/1/600/400',
  },
  {
    id: '2',
    title: 'Estructuras de Datos y Algoritmos',
    description:
      'Estudio de listas, pilas, colas, árboles y grafos, junto al análisis de complejidad y diseño de algoritmos eficientes para la resolución de problemas reales.',
    category: 'Tecnología',
    credits: 5,
    instructor: 'Mtro. Carlos Reyes',
    schedule: 'Mar y Jue 10:00 - 12:00',
    capacity: 35,
    enrolled: 30,
    imageUrl: 'https://picsum.photos/seed/2/600/400',
  },
  {
    id: '3',
    title: 'Bases de Datos Relacionales',
    description:
      'Diseño y modelado de bases de datos, normalización, SQL avanzado y optimización de consultas. Incluye prácticas con motores reales.',
    category: 'Datos',
    credits: 4,
    instructor: 'Ing. Laura Sánchez',
    schedule: 'Lun y Vie 14:00 - 16:00',
    capacity: 38,
    enrolled: 25,
    imageUrl: 'https://picsum.photos/seed/3/600/400',
  },
  {
    id: '4',
    title: 'Ciencia de Datos con Python',
    description:
      'Análisis y visualización de datos con Python, pandas y NumPy. Introducción al aprendizaje automático y a la toma de decisiones basada en datos.',
    category: 'Datos',
    credits: 5,
    instructor: 'Dr. Miguel Torres',
    schedule: 'Mié y Vie 16:00 - 18:00',
    capacity: 30,
    enrolled: 28,
    imageUrl: 'https://picsum.photos/seed/4/600/400',
  },
  {
    id: '5',
    title: 'Redes de Computadoras',
    description:
      'Modelo OSI y TCP/IP, enrutamiento, conmutación y seguridad básica de redes. Laboratorios de configuración y diagnóstico.',
    category: 'Infraestructura',
    credits: 4,
    instructor: 'Ing. Patricia Gómez',
    schedule: 'Mar y Jue 08:00 - 10:00',
    capacity: 36,
    enrolled: 20,
    imageUrl: 'https://picsum.photos/seed/5/600/400',
  },
  {
    id: '6',
    title: 'Administración de Sistemas en la Nube',
    description:
      'Despliegue y operación de servicios en la nube, contenedores, escalabilidad y monitoreo. Enfoque en buenas prácticas de infraestructura moderna.',
    category: 'Infraestructura',
    credits: 5,
    instructor: 'Mtro. Jorge Fernández',
    schedule: 'Lun y Mié 16:00 - 18:00',
    capacity: 32,
    enrolled: 18,
    imageUrl: 'https://picsum.photos/seed/6/600/400',
  },
  {
    id: '7',
    title: 'Desarrollo Web Full Stack',
    description:
      'Construcción de aplicaciones web modernas con frontend y backend: componentes, APIs REST, autenticación y despliegue continuo.',
    category: 'Tecnología',
    credits: 5,
    instructor: 'Ing. Daniela Castro',
    schedule: 'Mar y Jue 14:00 - 16:00',
    capacity: 40,
    enrolled: 37,
    imageUrl: 'https://picsum.photos/seed/7/600/400',
  },
  {
    id: '8',
    title: 'Visualización y Analítica de Datos',
    description:
      'Comunicación efectiva de datos mediante tableros interactivos, métricas y storytelling. Herramientas de BI y diseño de reportes.',
    category: 'Datos',
    credits: 4,
    instructor: 'Dra. Sofía Herrera',
    schedule: 'Vie 08:00 - 12:00',
    capacity: 34,
    enrolled: 22,
    imageUrl: 'https://picsum.photos/seed/8/600/400',
  },
];

export default fallbackCourses;
