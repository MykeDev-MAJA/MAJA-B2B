import type { Metadata } from "next";
import "./globals.css";
import React from 'react';
import Navbar from '@/components/shared/Navbar/Navbar';
import { Footer } from "@/components/shared/Footer/Footer";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "MAJA Corp",
  description: "El mejor B2B para tu negocio",
  keywords: "B2B, negocio, MAJA Corp, soluciones empresariales",
  authors: [{ name: "MAJA Corp", url: "https://majasportswear.com" }],
  openGraph: {
    title: "MAJA Corp",
    description: "El mejor B2B para tu negocio",
    url: "https://majasportswear.com",
    siteName: "MAJA Corp",
    images: [ 
      {
        url: "https://b2b-maja-corp.netlify.app/images/ImagesOg/Home/capibara_nadando.webp", 
        width: 800,
        height: 600,
        alt: "Descripción de la imagen",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang="es">
    <body>
      <Navbar />
      {children}
      <Footer />
    </body>
  </html>
);

export default Layout;
