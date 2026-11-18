import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./projects.css";
import "./shell.css";
import { dashboardConfig } from "@/config/dashboard";
import { ThemeProvider } from "@/components/theme-provider";
import { PaletteProvider } from "@/components/palette-provider";
import { Toaster } from "@/components/ui/sonner";

const dashboardSans = DM_Sans({
  variable: "--font-dashboard-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: dashboardConfig.name,
  description: dashboardConfig.description,
  other: {
    "color-scheme": "dark light",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-palette={dashboardConfig.defaultPalette}
      suppressHydrationWarning
      className={`${dashboardSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme={dashboardConfig.defaultTheme}
          enableSystem={false}
          disableTransitionOnChange
        >
          <PaletteProvider>
            {children}
            <Toaster position="bottom-right" richColors />
          </PaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
