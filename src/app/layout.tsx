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
  viewport: "width=device-width, initial-scale=1.0",
  authors: [{ name: "MAJA Corp", url: "https://majasportswear.com" }],
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
