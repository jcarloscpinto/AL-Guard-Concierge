import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AL Guard Concierge",
  description: "Concierge-first operations platform MVP foundation",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT">
      <body>{children}</body>
    </html>
  );
}
