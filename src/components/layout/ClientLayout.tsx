"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Lang } from "@/data/translations";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<Lang>("fr");

  // Inject lang into children via a Context pattern
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <Navbar lang={lang} onLangChange={setLang} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
    </LangContext.Provider>
  );
}

// Simple language context
import { createContext, useContext } from "react";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const LangContext = createContext<LangContextType>({
  lang: "fr",
  setLang: () => {},
});

export const useLang = () => useContext(LangContext);
