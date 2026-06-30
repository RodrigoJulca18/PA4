// ============================================================
// LoginPage (Usuario 1)
// Formulario controlado de inicio de sesion con validacion,
// estados de carga y error, y redireccion al dashboard.
// ============================================================

import { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { GraduationCap, LogIn } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.js';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

export default function LoginPage() {
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  // Ruta a la que volver tras autenticarse (o el dashboard por defecto).
  const redirectTo = location.state?.from?.pathname || '/dashboard';

  // Si ya hay sesion activa, no mostramos el login.
  if (!authLoading && isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Validacion basica de los campos del formulario.
  function validate() {
    const next = {};
    if (!form.email.trim()) {
      next.email = 'El correo es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Ingresa un correo valido.';
    }
    if (!form.password) {
      next.password = 'La contrasena es obligatoria.';
    } else if (form.password.length < 6) {
      next.password = 'La contrasena debe tener al menos 6 caracteres.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    setSubmitting(true);
    try {
      await login(form);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        'No se pudo iniciar sesion. Verifica tus credenciales.';
      setServerError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-card ring-1 ring-neutral-200">
        {/* Marca */}
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white shadow-sm">
            <GraduationCap className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Portal del Estudiante
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Inicia sesion para gestionar tus cursos.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <Input
            label="Correo electronico"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="estudiante@isil.edu"
            error={errors.email}
            autoComplete="email"
          />
          <Input
            label="Contrasena"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="******"
            error={errors.password}
            autoComplete="current-password"
          />

          {serverError && <ErrorMessage message={serverError} />}

          <Button type="submit" variant="primary" loading={submitting} block>
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Ingresar
          </Button>
        </form>

        <div className="mt-6 rounded-lg bg-neutral-50 px-4 py-3 text-sm text-neutral-500 ring-1 ring-neutral-200">
          <p className="text-center font-medium text-neutral-700">
            Credenciales de prueba
          </p>
          <div className="mt-2 space-y-1 text-center">
            <p>
              Estudiante:{' '}
              <strong className="text-neutral-700">student@isil.edu</strong> /{' '}
              <strong className="text-neutral-700">123456</strong>
            </p>
            <p>
              Admin:{' '}
              <strong className="text-neutral-700">admin@isil.edu</strong> /{' '}
              <strong className="text-neutral-700">admin123</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
