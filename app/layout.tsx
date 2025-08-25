import { StackProvider, StackTheme } from "@stackframe/stack";
import type { Metadata } from "next";

import "./globals.css";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { stackServerApp } from "@/stack";
import { lato, merriweatherSans } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "Custom Resume Generator | ATS-Friendly Resume Builder",
  description:
    "Smart resume generator that abstracts formatting logic for ATS optimization. Create professional resumes with intelligent section management and customizable layouts. Built for job seekers who want to focus on content, not formatting.",
  keywords:
    "resume generator, ATS resume, resume builder, job application, career tools, resume formatter, professional resume, resume template",
  authors: [{ name: "Sapphyra Wiser", url: "https://sapphyra.dev" }],
  creator: "Sapphyra Wiser",
  publisher: "Sapphyra Wiser",
  metadataBase: new URL("https://resume-gen.sapphyra.dev"),
  alternates: {
    canonical: "https://resume-gen.sapphyra.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Custom Resume Generator",
    url: "https://resume-gen.sapphyra.dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="flex justify-center" lang="en" suppressHydrationWarning>
      <body
        className={`${merriweatherSans.variable} ${lato.variable} h-lvh flex flex-col w-full relative max-w-[1200px]`}
      >
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <div className="flex flex-col justify-between flex-1 overflow-y-auto">
                <main className="flex flex-col flex-1">{children}</main>
                <Footer />
              </div>
            </ThemeProvider>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
