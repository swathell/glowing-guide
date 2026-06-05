import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OBS Mobile Detail",
  description: "Premium mobile detailing support pages for OBS Mobile Detail."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
