import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageErrorBoundary, SectionErrorBoundary } from "@/components/error-boundaries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio - Creative Web Designer & Developer",
  description: "Professional portfolio showcasing creative web design and development projects. Specializing in modern, responsive websites and user experiences.",
  keywords: ["web design", "web development", "portfolio", "creative", "UI/UX"],
  authors: [{ name: "Alex Johnson" }],
  creator: "Alex Johnson",
  metadataBase: new URL("https://portfolio.example.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio.example.com",
    title: "Portfolio - Creative Web Designer & Developer",
    description: "Professional portfolio showcasing creative web design and development projects.",
    siteName: "Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Creative Web Designer & Developer",
    description: "Professional portfolio showcasing creative web design and development projects.",
    creator: "@yourusername",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {/* Skip to content link for keyboard users */}
        <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 bg-primary text-primary-foreground px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageErrorBoundary pageName="Portfolio Layout">
            <header>
              <SectionErrorBoundary sectionName="Navigation">
                <Navigation variant="header" />
              </SectionErrorBoundary>
            </header>
            <main id="main-content" className="min-h-screen">
              {children}
            </main>
            <SectionErrorBoundary sectionName="Footer">
              <Footer />
            </SectionErrorBoundary>
          </PageErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
