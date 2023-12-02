import Navbar from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import Providers from "@/providers";
import { Toaster } from "@/components/ui/Toaster";

import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Leet socials",
  description: "A free safe space to share your opinions and earn",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen pt-12 bg-background ">
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* @ts-expect-error Server Component */}
            <Navbar />
            {authModal}
            <div className="container h-full pt-12 mx-auto max-w-7xl">
              {children}
            </div>
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
