import { NextRequest, NextResponse } from "next/server";

// Proxy vers la recherche hllrecords.com
// Utilisé pour aider à trouver le hllId d'un joueur par son pseudo
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.trim().length < 2) {
    return NextResponse.json(
      { error: "Paramètre q requis (min 2 caractères)" },
      { status: 400 }
    );
  }

  try {
    // hllrecords expose une route de recherche utilisée par l'autocomplete
    const response = await fetch(
      `https://hllrecords.com/api/profiles/search?q=${encodeURIComponent(q)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
          Accept: "application/json",
          Referer: "https://hllrecords.com/",
        },
      }
    );

    if (!response.ok) {
      // Fallback : essayer via le HTML de la recherche
      return NextResponse.json(
        { error: `hllrecords a répondu ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur réseau", message: String(error) },
      { status: 502 }
    );
  }
}
