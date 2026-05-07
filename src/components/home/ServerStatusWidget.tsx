"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/layout/ClientLayout";
import { translations } from "@/data/translations";

interface ServerStatus {
  online: boolean;
  name?: string;
  map?: string;
  players?: number;
  maxPlayers?: number;
  score?: { allied: number; axis: number };
  error?: string;
}

export default function ServerStatusWidget() {
  const { lang } = useLang();
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Replace with the actual server IP!
  const serverIp = "37.59.123.143:7777"; 

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("/api/server-status");
        if (!res.ok) throw new Error("Erreur de récupération");
        const data = await res.json();
        setStatus(data);
      } catch (e) {
        setStatus({ online: false });
      } finally {
        setIsLoading(false);
      }
    }

    fetchStatus();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-[#0C0D0B] border border-[#2A2E27] p-4 flex items-center justify-center h-24 animate-pulse">
        <div className="text-[#5A5C50] font-mono text-xs uppercase tracking-widest">
          {lang === "fr" ? "Connexion au serveur..." : "Connecting to server..."}
        </div>
      </div>
    );
  }

  if (!status || !status.online) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-[#0C0D0B] border border-[#2A2E27] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
          <h3 className="text-[#8A8C85] font-display text-lg tracking-widest uppercase">
            {lang === "fr" ? "Serveur Hors Ligne" : "Server Offline"}
          </h3>
        </div>
        <div className="text-[#5A5C50] font-mono text-xs">IP: {serverIp}</div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-[#0C0D0B] border border-[#2A2E27] p-4 sm:p-5 overflow-hidden group hover:border-[#C45C1A]/50 transition-colors duration-300">
      {/* Ligne déco supérieure */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C45C1A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        
        {/* Info Serveur */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8A9B56] animate-pulse shadow-[0_0_8px_rgba(138,155,86,0.6)]" title="Online" />
            <h3 className="text-[#E8E4DA] font-mono text-sm sm:text-base font-bold truncate">
              {status.name}
            </h3>
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-[#1E2318] text-[#8A8C85] border border-[#3A3B33] px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest">
              IP: {serverIp}
            </span>
          </div>
        </div>

        {/* Détails (Map & Players) */}
        <div className="flex items-center gap-6 sm:gap-8 shrink-0">
          {/* Map */}
          <div className="flex flex-col items-end">
            <span className="text-[#5A5C50] text-[10px] font-mono uppercase tracking-widest mb-1">
              {lang === "fr" ? "Carte Actuelle" : "Current Map"}
            </span>
            <span className="text-[#C45C1A] text-sm font-mono uppercase truncate max-w-[200px]" title={status.map}>
              {status.map}
            </span>
          </div>

          {/* Séparateur vertical */}
          <div className="hidden sm:block w-px h-8 bg-[#2A2E27]" />

          {/* Joueurs */}
          <div className="flex flex-col items-end min-w-[70px]">
            <span className="text-[#5A5C50] text-[10px] font-mono uppercase tracking-widest mb-1">
              {lang === "fr" ? "Joueurs" : "Players"}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[#E8E4DA] font-mono text-base font-bold">
                {status.players}
              </span>
              <span className="text-[#5A5C50] font-mono text-sm">/</span>
              <span className="text-[#8A8C85] font-mono text-sm">
                {status.maxPlayers}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
