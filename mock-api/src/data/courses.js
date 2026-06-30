// Datos semilla (seed) de cursos.
// Forma de cada curso:
// { id, title, description, category, credits, instructor, schedule, capacity, enrolled, imageUrl }
// La imagen usa el servicio publico picsum.photos con una semilla basada en el id.

export const courses = [
  {
    id: 1,
    title: 'Desarrollo Web Frontend',
    description:
      'Construccion de interfaces modernas con HTML, CSS y JavaScript, ademas de frameworks como React.',
    category: 'Tecnologia',
    credits: 4,
    instructor: 'Ing. Maria Fernandez',
    schedule: 'Lunes y Miercoles 18:00 - 20:00',
    capacity: 30,
    enrolled: 18,
    imageUrl: 'https://picsum.photos/seed/1/600/400',
  },
  {
    id: 2,
    title: 'Bases de Datos',
    description:
      'Diseno relacional, normalizacion y consultas SQL sobre motores como PostgreSQL y MySQL.',
    category: 'Datos',
    credits: 4,
    instructor: 'Dr. Carlos Mendoza',
    schedule: 'Martes y Jueves 19:00 - 21:00',
    capacity: 35,
    enrolled: 25,
    imageUrl: 'https://picsum.photos/seed/2/600/400',
  },
  {
    id: 3,
    title: 'Programacion Orientada a Objetos',
    description:
      'Principios de POO: encapsulamiento, herencia y polimorfismo aplicados con Java.',
    category: 'Tecnologia',
    credits: 5,
    instructor: 'Ing. Lucia Ramos',
    schedule: 'Lunes y Viernes 16:00 - 18:00',
    capacity: 40,
    enrolled: 33,
    imageUrl: 'https://picsum.photos/seed/3/600/400',
  },
  {
    id: 4,
    title: 'Redes y Comunicaciones',
    description:
      'Fundamentos de redes, modelo OSI, protocolos TCP/IP y configuracion de equipos de red.',
    category: 'Infraestructura',
    credits: 3,
    instructor: 'Ing. Jorge Salazar',
    schedule: 'Miercoles 18:00 - 21:00',
    capacity: 28,
    enrolled: 20,
    imageUrl: 'https://picsum.photos/seed/4/600/400',
  },
  {
    id: 5,
    title: 'Inteligencia Artificial',
    description:
      'Introduccion a algoritmos de aprendizaje automatico, redes neuronales y agentes inteligentes.',
    category: 'Datos',
    credits: 5,
    instructor: 'Dra. Ana Quispe',
    schedule: 'Martes y Jueves 17:00 - 19:00',
    capacity: 25,
    enrolled: 24,
    imageUrl: 'https://picsum.photos/seed/5/600/400',
  },
  {
    id: 6,
    title: 'Estructuras de Datos',
    description:
      'Listas, pilas, colas, arboles y grafos, junto al analisis de complejidad algoritmica.',
    category: 'Tecnologia',
    credits: 4,
    instructor: 'Ing. Pedro Vargas',
    schedule: 'Lunes y Miercoles 20:00 - 22:00',
    capacity: 38,
    enrolled: 30,
    imageUrl: 'https://picsum.photos/seed/6/600/400',
  },
  {
    id: 7,
    title: 'Ingenieria de Software',
    description:
      'Metodologias agiles, gestion de requisitos, patrones de diseno y control de versiones.',
    category: 'Tecnologia',
    credits: 4,
    instructor: 'Mg. Sofia Herrera',
    schedule: 'Viernes 18:00 - 22:00',
    capacity: 32,
    enrolled: 22,
    imageUrl: 'https://picsum.photos/seed/7/600/400',
  },
  {
    id: 8,
    title: 'Cloud Computing',
    description:
      'Servicios en la nube, contenedores, despliegue escalable y arquitecturas serverless.',
    category: 'Infraestructura',
    credits: 3,
    instructor: 'Ing. Diego Torres',
    schedule: 'Sabado 09:00 - 13:00',
    capacity: 30,
    enrolled: 15,
    imageUrl: 'https://picsum.photos/seed/8/600/400',
  },
];

export default courses;
