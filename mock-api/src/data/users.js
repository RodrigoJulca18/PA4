// Datos semilla (seed) de usuarios.
// La contrasena se almacena UNICAMENTE en este archivo de datos y
// NUNCA debe devolverse en las respuestas de la API.
//
// El campo `role` define el nivel de acceso:
// - "student": usuario estandar.
// - "admin": acceso a los endpoints de administracion.

export const users = [
  {
    id: 1,
    name: 'Estudiante Demo',
    email: 'student@isil.edu',
    password: '123456', // Solo para demostracion. Nunca exponer en respuestas.
    role: 'student',
  },
  {
    id: 2,
    name: 'Maria Torres',
    email: 'maria@isil.edu',
    password: '123456', // Solo para demostracion. Nunca exponer en respuestas.
    role: 'student',
  },
  {
    id: 99,
    name: 'Administrador',
    email: 'admin@isil.edu',
    password: 'admin123', // Solo para demostracion. Nunca exponer en respuestas.
    role: 'admin',
  },
];

export default users;
