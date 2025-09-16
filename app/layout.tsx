import '../src/index.css';
import type { Metadata } from "next";

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
