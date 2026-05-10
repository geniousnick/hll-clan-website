import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "La 9ème Ombre [L9O] — Clan Compétitif Hell Let Loose",
  description:
    "Site officiel du clan La 9ème Ombre [L9O], équipe compétitive sur Hell Let Loose. Tactique, discipline, cohésion. Competitive Hell Let Loose clan — tactical, disciplined, united.",
  keywords: [
    "La 9ème Ombre",
    "L9O",
    "Hell Let Loose",
    "HLL",
    "clan",
    "compétitif",
    "esports",
    "tactique",
    "competitive",
  ],
  openGraph: {
    title: "La 9ème Ombre [L9O] — Clan Compétitif Hell Let Loose",
    description:
      "Site officiel du clan L9O. Compétitif · Tactique · Uni.",
    type: "website",
  },
  verification: {
    google: "A9u4Ma0YgvUN32LEKnWIKMlHcEqmLgL1TnKjNVDMjm0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
