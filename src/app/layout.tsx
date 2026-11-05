import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { aboutMe } from "@/data/aboutme";
import { customMetadata } from "@/data/title-description";
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
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
        className={`${dmSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased`}
      >
        <main className="">{children}</main>
        <footer className="border-t border-[color:var(--rule)] bg-[color:var(--background)]">
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
