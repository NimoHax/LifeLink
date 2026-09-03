import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LifeLink — Your life, connected.",
  description: "A privacy-first personal life operating system.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}