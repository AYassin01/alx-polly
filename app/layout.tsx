/**
 * Root Layout Component
 * 
 * This is the main layout component for the entire application.
 * It wraps all pages with necessary providers and global UI elements.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/app/auth/context";
import { Toaster } from "@/components/ui/toaster";

// Load and configure the Geist Sans font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Load and configure the Geist Mono font for code and monospaced text
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Application metadata for SEO and browser display
 */
export const metadata: Metadata = {
  title: "ALX Polly - Create and Share Polls",
  description: "A modern polling application built with Next.js",
};

/**
 * RootLayout component that provides the base structure for all pages
 * 
 * This component wraps the entire application with:
 * - Theme provider for dark/light mode support
 * - Authentication provider for user auth state
 * - Global navigation and layout structure
 * - Toast notifications system
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The page content to render
 * @returns {JSX.Element} The complete application layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Theme provider enables dark/light mode switching */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Auth provider makes user authentication state available throughout the app */}
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              {/* Global navigation bar */}
              <Navbar />
              {/* Main content area */}
              <main className="flex-1">{children}</main>
            </div>
            {/* Toast notification container */}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
