"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Partner {
  id: number;
  company_name: string;
  logo_url: string | null;
  page_url: string | null;
}

const PartnersSection: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const outerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const xRef = useRef(0); // posición actual en px
  const halfWidthRef = useRef(0); // ancho de la mitad (una lista)
  const rafRef = useRef<number | null>(null);
  const decelRafRef = useRef<number | null>(null);

  // velocidad constante base (px/s) - ajustada dinámicamente según ancho
  const DEFAULT_SPEED = 200;
  const MOBILE_SPEED = 70; // más lento en móviles
  const speedRef = useRef(DEFAULT_SPEED);
  // velocidad actual (mutable)

  // Flag para saber si estamos en hover desacelerando la animacion
  const deceleratingRef = useRef(false);
  const [isFinePointer, setIsFinePointer] = useState<boolean>(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch("/api/diamond");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data && data.statusCode === 200 && Array.isArray(data.data)) {
          setPartners(data.data.filter((p: Partner) => !!p.logo_url));
        } else {
          setError("No partners available");
        }
      } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
          setError("Fetch error");
        }
      }
    };
    fetchPartners();
  }, []);

  const items = partners.filter((p) => !!p.logo_url);
  const duplicated = items.length ? [...items, ...items] : [];

  const measure = () => {
    const el = trackRef.current;
    if (!el) return;
    const total = el.scrollWidth;
    const half = total / 2;
    halfWidthRef.current = half;
  };

  useEffect(() => {
    // Ajustar velocidad inicial según ancho de pantalla
    const setInitialSpeed = () => {
      try {
        const w = window.innerWidth || 1024;
        speedRef.current = w <= 768 ? MOBILE_SPEED : DEFAULT_SPEED;
      } catch {
        speedRef.current = DEFAULT_SPEED;
      }
    };

  setInitialSpeed();
    const onResize = () => setInitialSpeed();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!trackRef.current || items.length === 0) return;

    // Detect pointer capability
    try {
      setIsFinePointer(!(window.matchMedia && window.matchMedia("(pointer: coarse)").matches));
    } catch {
      setIsFinePointer(true);
    }

    const firstHalfAnchors = Array.from(trackRef.current.querySelectorAll("a")).slice(
      0,
      items.length
    );
    const imgs = firstHalfAnchors
      .map((a) => a.querySelector("img"))
      .filter((img): img is HTMLImageElement => !!img);

    let loaded = 0;
    const checkReady = () => {
      loaded++;
      if (loaded >= imgs.length) {
        measure();
        setReady(true);
      }
    };

    if (imgs.length === 0) {
      measure();
      setReady(true);
      return;
    }

    imgs.forEach((img) => {
      if (img.complete) {
        checkReady();
      } else {
        img.addEventListener("load", checkReady, { once: true });
        img.addEventListener("error", checkReady, { once: true });
      }
    });

    return () => {
      imgs.forEach((img) => {
        img.removeEventListener("load", checkReady);
        img.removeEventListener("error", checkReady);
      });
    };
  }, [items.length]);

  useEffect(() => {
    if (!trackRef.current) return;
    const ro = new ResizeObserver(() => {
      const prevHalf = halfWidthRef.current;
      measure();
      if (prevHalf && halfWidthRef.current) {
        xRef.current = xRef.current % halfWidthRef.current;
      }
    });
    ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    let last = performance.now();

    const step = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;

      const distance = speedRef.current * dt;
      xRef.current -= distance;

      const half = halfWidthRef.current || 0;
      if (half > 0) {
        if (xRef.current <= -half) {
          xRef.current += half;
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [ready]);

  // Función para desacelerar suavemente la animación (solo para pointers secundarios)
  const desacelerarAnimacion = () => {
    // no desacelerar en dispositivos táctiles/pointer:coarse
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;
    if (deceleratingRef.current) return; // previene múltiples llamadas simultáneas
    deceleratingRef.current = true;

    const decelerationStep = 5; // px/s por frame para reducir
    const minSpeed = 10; // velocidad mínima para detener

    // Usamos un RAF separado para la desaceleración para no interferir con el loop principal
    const slowDown = () => {
      if (speedRef.current > minSpeed) {
        speedRef.current = Math.max(speedRef.current - decelerationStep, minSpeed);
        decelRafRef.current = requestAnimationFrame(slowDown);
      } else {
        // Cuando llegamos a velocidad mínima, dejamos la animación corriendo a minSpeed
        deceleratingRef.current = false;
        if (decelRafRef.current) {
          cancelAnimationFrame(decelRafRef.current);
          decelRafRef.current = null;
        }
      }
    };

    if (decelRafRef.current) cancelAnimationFrame(decelRafRef.current);
    decelRafRef.current = requestAnimationFrame(slowDown);
  };

  // Función para acelerar la animación a velocidad original
  const acelerarAnimacion = () => {
    // Cancelar cualquier RAF de desaceleración en curso y restaurar la velocidad objetivo
    if (decelRafRef.current) {
      cancelAnimationFrame(decelRafRef.current);
      decelRafRef.current = null;
    }

    deceleratingRef.current = false;
    try {
      const w = window.innerWidth || 1024;
      speedRef.current = w <= 768 ? MOBILE_SPEED : DEFAULT_SPEED;
    } catch {
      speedRef.current = DEFAULT_SPEED;
    }
    // No reiniciamos el loop principal: ya está corriendo y usa speedRef.current
  };

  return (
    <section className="relative pt-20 pb-20 overflow-hidden overflow-x-hidden">
      {/* Título */}
      <div className="mx-auto max-w-6xl px-4 md:px-6 relative z-10">
        <h2 className="text-white text-2xl text-center md:text-3xl font-semibold tracking-tight mb-20">
          Nuestros Partners
        </h2>
      </div>

      {/* Carrusel */}
      <div
        ref={outerRef}
        className="relative overflow-hidden mx-auto max-w-6xl px-4 md:px-6"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 6%, rgba(0,0,0,1) 16%, rgba(0,0,0,1) 84%, rgba(0,0,0,0.25) 94%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 6%, rgba(0,0,0,1) 16%, rgba(0,0,0,1) 84%, rgba(0,0,0,0.25) 94%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div
          ref={trackRef}
          className="inline-flex items-center gap-40 will-change-transform"
          style={{
            width: "max-content",
            transform: "translate3d(0,0,0)",
          }}
          {...(isFinePointer
            ? {
                onPointerEnter: () => desacelerarAnimacion(),
                onPointerLeave: () => acelerarAnimacion(),
              }
            : {})}
        >
          {duplicated.map((partner, i) => (
            <a
              key={`${partner.id}-${i}`}
              href={partner.page_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
              aria-label={partner.company_name}
            >
              {partner.logo_url && partner.logo_url.startsWith("/") ? (
                <div className="relative h-40 w-40 sm:w-44">
                  <Image
                    src={partner.logo_url}
                    alt={partner.company_name}
                    fill
                    className="object-contain block filter grayscale hover:grayscale-0 transition duration-300"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div style={{ height: "10rem", width: "auto" }} className="flex items-center">
                  {(() => {
                    try {
                      const url = partner.logo_url ? new URL(partner.logo_url) : null;
                      const allowedHosts = [
                        "s3-alpha-sig.figma.com",
                        "hebbkx1anhila5yf.public.blob.vercel-storage.com",
                        "e48bssyezdxaxnzg.public.blob.vercel-storage.com",
                      ];
                      if (url && allowedHosts.includes(url.hostname)) {
                        return (
                          <Image
                            src={partner.logo_url || ""}
                            alt={partner.company_name}
                            width={180}
                            height={160}
                            className="object-contain block filter grayscale hover:grayscale-0 transition duration-300"
                            sizes="(max-width: 640px) 120px, (max-width: 1024px) 160px, 180px"
                            loading="lazy"
                            decoding="async"
                          />
                        );
                      }
                    } catch {
                      /* fall through to img fallback */
                    }

                    // fallback: use native img to avoid next/image hostname restrictions
                    return (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={partner.logo_url || ""}
                        alt={partner.company_name}
                        width={180}
                        height={160}
                        className="object-contain block filter grayscale hover:grayscale-0 transition duration-300"
                        loading="lazy"
                      />
                    );
                  })()}
                </div>
              )}
            </a>
          ))}
        </div>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600 text-center">
          Error cargando partners: {error}
        </p>
      )}
      {!error && partners.length === 0 && (
        <p className="mt-3 text-sm text-gray-500 text-center">Cargando partners...</p>
      )}

      <style jsx>{`
        /* Accesibilidad: usuarios que prefieren menos animación */
        @media (prefers-reduced-motion: reduce) {
          [style*="will-change"] {
            will-change: auto !important;
          }
          div[ref="trackRef"] {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;
