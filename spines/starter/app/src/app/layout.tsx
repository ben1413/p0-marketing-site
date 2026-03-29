import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project0 Starter",
  description: "Starter spine — Next.js + Project0 Core",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}
