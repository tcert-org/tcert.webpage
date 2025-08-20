"use client";

import React, { useEffect, useRef, useState } from "react";

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

  // velocidad constante base (px/s)
  const SPEED = 200;
  // velocidad actual que se podrá desacelerar (px/s)
  const speedRef = useRef(SPEED);

  // Flag para saber si estamos en hover desacelerando la animacion
  const deceleratingRef = useRef(false);

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
      } catch (err: any) {
        setError(err?.message || "Fetch error");
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
    if (!trackRef.current || items.length === 0) return;

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

  // Función para desacelerar suavemente la animación
  const desacelerarAnimacion = () => {
    if (deceleratingRef.current) return; // previene múltiples llamadas simultáneas
    deceleratingRef.current = true;

    const decelerationStep = 5; // px/s por frame para reducir
    const minSpeed = 10; // velocidad mínima para detener

    const slowDown = () => {
      if (speedRef.current > minSpeed) {
        speedRef.current = Math.max(speedRef.current - decelerationStep, minSpeed);
        rafRef.current = requestAnimationFrame(slowDown);
      } else {
        // Cuando llegamos a velocidad mínima, podemos cancelar el animation frame principal
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        deceleratingRef.current = false;
      }
    };

    slowDown();
  };

  // Función para acelerar la animación a velocidad original
  const acelerarAnimacion = () => {
    if (rafRef.current) return; // ya animando

    deceleratingRef.current = false;
    speedRef.current = SPEED;
    let last = performance.now();

    const step = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;

      xRef.current -= speedRef.current * dt;

      const half = halfWidthRef.current || 0;
      if (half > 0 && xRef.current <= -half) {
        xRef.current += half;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${xRef.current}px,0,0)`;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  };

  return (
    <section className="relative pt-20 pb-20 overflow-hidden">
      {/* Título */}
      <div className="mx-auto max-w-6xl px-4 md:px-6">
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
          onMouseEnter={() => {
            desacelerarAnimacion();
          }}
          onMouseLeave={() => {
            acelerarAnimacion();
          }}
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
              <img
                src={partner.logo_url || ""}
                alt={partner.company_name}
                style={{ height: "10rem" }}
                className="block w-auto filter grayscale hover:grayscale-0 transition duration-300"
                sizes="(max-width: 640px) 120px, (max-width: 1024px) 160px, 180px"
                loading="lazy"
                decoding="async"
              />
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
