import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif, PT_Serif } from "next/font/google";
import "./globals.css";
import { aboutMe } from "@/data/aboutme";
import { customMetadata } from "@/data/title-description";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: customMetadata.title || aboutMe.name,
  description: customMetadata.description || aboutMe.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerif.variable} ${ptSerif.variable} antialiased`}
      >
        <main className="">{children}</main>
        <footer className="border-t border-zinc-200 bg-[#FFFCF8]">
          <div className="mx-auto max-w-screen-lg px-8 py-10 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="text-sm text-zinc-600">
              <p>
                © {new Date().getFullYear()} {aboutMe.name}.
              </p>
              {aboutMe.secretDescription && (
                <p className="text-xs text-zinc-500 mt-3">
                  {aboutMe.secretDescription}
                </p>
              )}
            </div>
            <p className="text-xs text-zinc-500">
              Last updated{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}{" "}
              ·{" "}
              <a
                href="https://github.com/n0w0f/n0w0f.github.io"
                className="underline hover:text-[color:var(--accent-strong)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
