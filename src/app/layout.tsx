import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Vignam - Bring Educational Concepts to Life with 3D",
  description: "Create stunning 3D educational content without technical expertise. Build interactive simulations, animations, and VR experiences with Vignam's AI-powered platform.",
  keywords: ["3D education", "interactive simulations", "educational technology", "VR learning", "3D animations", "AI-powered content creation"],
  authors: [{ name: "Vignam Team" }],
  creator: "Vignam",
  publisher: "Vignam",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vignam.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Vignam - Bring Educational Concepts to Life with 3D",
    description: "Create stunning 3D educational content without technical expertise. Build interactive simulations, animations, and VR experiences.",
    url: 'https://vignam.com',
    siteName: 'Vignam',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vignam - 3D Educational Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Vignam - Bring Educational Concepts to Life with 3D",
    description: "Create stunning 3D educational content without technical expertise.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Vignam",
    "description": "Create stunning 3D educational content without technical expertise. Build interactive simulations, animations, and VR experiences.",
    "url": "https://vignam.com",
    "logo": "https://vignam.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "email": "hello@vignam.com"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Montreal",
      "addressCountry": "CA"
    },
    "sameAs": [
      "https://www.youtube.com/channel/vignam",
      "https://twitter.com/vignam",
      "https://linkedin.com/company/vignam"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
