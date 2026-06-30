// Layout raíz del módulo público.
// Define la estructura html/body, importa los estilos globales (Tailwind),
// carga la fuente Inter y renderiza el Header y el Footer comunes.
import { Inter } from 'next/font/google';
import '@/styles/global.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Fuente Inter mediante next/font (sistema de diseño compartido con el portal).
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Metadatos por defecto del sitio (SEO).
export const metadata = {
  title: {
    default: 'Oferta Académica | Módulo Público',
    template: '%s | Oferta Académica',
  },
  description:
    'Catálogo público de cursos universitarios. Consulta la oferta académica sin necesidad de iniciar sesión.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth`}>
      <body className={`${inter.className} flex min-h-screen flex-col bg-white text-neutral-900 antialiased`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
