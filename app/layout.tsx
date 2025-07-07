import type { Metadata } from "next";
import { inter } from "../lib/fonts";
import "./globals.css";
import StructuredData from "./components/StructuredData";

export const metadata: Metadata = {
  title: {
    default: 'Alberto (JAG) Pascoe - Digital Transformation Leader',
    template: '%s | Alberto (JAG) Pascoe'
  },
  description: 'Chief Digital Executive with 25+ years experience leading $250M+ digital transformation projects. AI/ML expert, startup founder, and trusted advisor in LATAM.',
  keywords: [
    'digital transformation consultant',
    'AI ML expert LATAM',
    'fintech startup advisor',
    'proptech innovation consultant',
    'chief digital officer consulting',
    'Mexico technology leader'
  ],
  authors: [{ name: 'Alberto (JAG) Pascoe' }],
  creator: 'Alberto (JAG) Pascoe',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://albertopascoe.com',
    title: 'Alberto (JAG) Pascoe - Digital Transformation Leader',
    description: 'Chief Digital Executive with 25+ years experience leading digital transformation projects across LATAM.',
    siteName: 'Alberto (JAG) Pascoe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alberto (JAG) Pascoe - Digital Transformation Leader',
    description: 'Chief Digital Executive with 25+ years experience leading digital transformation projects.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
