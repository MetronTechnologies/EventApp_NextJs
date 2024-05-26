import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import React from "react";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: "Evently",
  description: "Platform for event management",
  icons: {
    icon: '/assets/images.logo.sng'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const apiKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return (
      <ClerkProvider publishableKey={apiKey}>
        <html lang="en">
          <body className={poppins.variable}>
            {children}
          </body>
        </html>
      </ClerkProvider>
  );
}
