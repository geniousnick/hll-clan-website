import { NextResponse } from "next/server";

export const revalidate = 30; // Mise en cache de 30 secondes pour ne pas spammer le serveur CRCON

export async function GET() {
  try {
    const res = await fetch("https://rcon.l9o.fr/api/get_public_info", {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      throw new Error(`Erreur HTTP: ${res.status}`);
    }

    const data = await res.json();

    if (!data || !data.result) {
      throw new Error("Format de réponse invalide");
    }

    const result = data.result;
    const isOnline = true; // Si l'API répond, c'est que le serveur est en ligne (ou géré par CRCON)

    return NextResponse.json({
      online: isOnline,
      name: result.name?.short_name || result.name?.name || "L9o Serveur",
      map: result.current_map?.map?.pretty_name || "Unknown Map",
      mapImage: result.current_map?.map?.image_name || null,
      players: result.player_count || 0,
      maxPlayers: result.max_player_count || 100,
      score: result.score || { allied: 0, axis: 0 },
    });
  } catch (error) {
    console.error("Erreur API Server Status:", error);
    return NextResponse.json(
      { online: false, error: "Serveur injoignable" },
      { status: 500 }
    );
  }
}
