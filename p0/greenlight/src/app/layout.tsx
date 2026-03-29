import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s — Greenlight",
    default: "Greenlight — Governed Live Ops",
  },
  description:
    "Propose, simulate, approve, and deploy live game changes with a permanent audit record. Every change is attributed, reversible, and defensible.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
