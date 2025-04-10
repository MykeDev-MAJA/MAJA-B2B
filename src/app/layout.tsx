import type { Metadata } from "next";
import "./globals.css";
import React from 'react';
import Navbar from '@/components/shared/Navbar/Navbar';
import { Footer } from "@/components/shared/Footer/Footer";
import { Toaster } from 'sonner'
import { inter } from '@/config/fonts';
import { unstable_ViewTransition as ViewTransition } from 'react'

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  metadataBase: new URL('https://b2b-maja-corp.netlify.app'),
  title: {
    template: '%s | MAJA Corp',
    default: 'MAJA Corp - Representa el valor de tu empresa',
  },
  description: 'Un catálogo con la mejor selección de nuestras prendas, especiales para tu empresa y equipo de trabajo',
  keywords: "B2B, negocio, MAJA Corp, soluciones empresariales",
  authors: [{ name: "MAJA Corp", url: "https://b2b-maja-corp.netlify.app" }],
  openGraph: {
    title: "MAJA Corp",
    description: "El mejor B2B para tu negocio",
    url: "https://b2b-maja-corp.netlify.app",
    siteName: "MAJA Corp",
    images: [ 
      {
        url: "https://b2b-maja-corp.netlify.app/images/ImagesOg/Home/capibara_nadando.webp", 
        width: 1200,
        height: 630,
        alt: "Imagen de capibara nadando",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang="es" className={`${inter.variable} ${inter.className}`}>
    <body>
      <ViewTransition>
        <Navbar />
        {children}
        <Footer />
        <Toaster 
          position="bottom-right" 
          richColors 
          closeButton 
          
        />
      </ViewTransition>
    </body>
  </html>
);

export default Layout;
