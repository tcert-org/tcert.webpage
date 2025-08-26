import React from "react";

/**
 * Convierte un texto que puede contener puntos y coma (';') o saltos de línea
 * en un React.ReactNode con saltos visibles (elementos <br />).
 * Ejemplo: "a;b;c" => ["a", <br />, "b", <br />, "c"]
 */
export function formatWithLineBreaks(text?: string): React.ReactNode {
  if (!text) return null;

  // Normalizar: reemplazar CRLF por LF
  const normalized = text.replace(/\r\n/g, "\n");

  // Dividir tanto por ';' como por saltos de línea (el cliente dijo que ';' representa Enter)
  const parts = normalized.split(/;|\n/).map((s) => s.trim()).filter(Boolean);

  // Intercalar con <br />
  return parts.flatMap((part, i) => (i === parts.length - 1 ? [part] : [part, <br key={i} />]));
}

export default formatWithLineBreaks;
