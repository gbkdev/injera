import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';

export const metadata: Metadata = {
  title: 'INJERA — The Journey from Teff to Table | Ethiopian 3D Cultural Experience',
  description:
    'An interactive 3D cultural museum and educational experience documenting Ethiopian injera, 3,000 years of teff agronomy, sourdough fermentation microbiology, and communal dining traditions.',
  keywords: [
    'Injera',
    'Ethiopian food',
    'Teff',
    '3D Experience',
    'Fermentation',
    'Mitad',
    'Mesob',
    'Gursha',
    'Amharic',
    'African culture',
    'Sourdough',
    'Three.js',
  ],
  authors: [{ name: 'Injera Cultural Digital Preservation Team' }],
  openGraph: {
    title: 'INJERA — The Journey from Teff to Table',
    description: 'Experience the 3,000-year story of Ethiopian injera in interactive 3D.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Injera 3D Cultural Experience',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INJERA — The Journey from Teff to Table',
    description: 'Explore the science, history, and communal soul of Ethiopian sourdough injera in 3D.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-ethiopia-obsidian text-ethiopia-linen min-h-screen flex flex-col antialiased selection:bg-ethiopia-clay-500 selection:text-ethiopia-linen">
        <LanguageProvider>
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
