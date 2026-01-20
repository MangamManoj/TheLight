import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TheLight - Bible Chapter Summaries & Practical Insights",
  description: "Transform Bible reading into an engaging, practical experience with AI-generated summaries and actionable insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
