// Central util para construir la URL del logo de una certificación.
// Acepta: una cadena raw (logo_url) y el nombre de la certificación para fallbacks.
export function buildLogoPath(raw?: string, certName?: string) {
  const BLOB_BASE =
    "https://e48bssyezdxaxnzg.public.blob.vercel-storage.com/logos_insignias/";
  const DEFAULT_LOGO = BLOB_BASE + "scrum-foundation.svg";

  const candidate = raw?.trim();
  if (candidate && candidate !== "") {
    // Si ya viene una URL absoluta (http/https), usar tal cual
    if (/^https?:\/\//i.test(candidate)) return candidate;
    // Si es una ruta absoluta dentro de la app
    if (candidate.startsWith("/")) return candidate;
    // Si es un nombre/relativo, concatenar al base del blob
    return BLOB_BASE + candidate;
  }

  // Fallbacks por nombre de certificación
  const lowerName = certName?.toLowerCase() || "";
  if (lowerName.includes("scrum master")) return BLOB_BASE + "scrum-master.svg";
  if (lowerName.includes("scrum developer")) return BLOB_BASE + "scrum-developers.svg";

  // Default final
  return DEFAULT_LOGO;
}
