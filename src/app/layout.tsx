import type { Metadata } from "next";
import '../index.css';

export const metadata: Metadata = {
  title: "No-Code Authentication Builder",
  description: "Design custom authentication flows with drag-and-drop components.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
