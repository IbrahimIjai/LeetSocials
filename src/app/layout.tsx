import Navbar from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import Providers from "@/providers";
import { Toaster } from "@/components/ui/Toaster";

import "@/styles/globals.css";

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
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        inter.className,
      )}
    >
      <body className="min-h-screen pt-12 antialiased bg-slate-50">
        <Providers>
          {/* @ts-expect-error Server Component */}
          <Navbar />
          {authModal}
          <div className="container h-full pt-12 mx-auto max-w-7xl">
            {children}
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
