"use client";

import React, { useEffect, useRef, useState } from "react";

// Simple cursor trail: a few fading circles that follow the pointer.
export default function CursorTrail() {
  const trailRef = useRef<HTMLDivElement | null>(null);
  const positions = useRef<Array<{ x: number; y: number }>>([]);
  const rafRef = useRef<number | null>(null);
  // Track client mount and screen width on the client so we can avoid
  // rendering the trail on small screens (mobile reference).
  const [mounted, setMounted] = useState(false);
  const [isMobileWidth, setIsMobileWidth] = useState(false);
  const [isOverContent, setIsOverContent] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobileWidth(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Function to check if cursor is over content elements
  const isOverContentElement = (e: PointerEvent): boolean => {
    const target = e.target as Element;
    if (!target) return false;

    // Check if cursor is over content elements that should disable the trail
    const contentSelectors = [
      'img', 'button', 'a', 'input', 'textarea', 'select',
      '[role="button"]', '[data-content]', 
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span:not([class*="cursor-trail"])',
      // Específicos para esta app
      '.card', '.badge', '.testimonial', '.partner', '.nav',
      // Clases que indican contenido
      '[class*="content"]', '[class*="card"]', '[class*="text"]',
      '[class*="title"]', '[class*="button"]', '[class*="link"]',
      '[class*="form"]', '[class*="input"]',
      // Componentes específicos de la app
      '.course-card', '.contact-form', '.navbar', '.footer'
    ];

    // Check if the target or any parent matches content selectors
    let element: Element | null = target;
    while (element && element !== document.body) {
      // Skip cursor trail elements
      if (element.classList.contains('cursor-trail-dot') || 
          element.hasAttribute('aria-hidden')) {
        return false;
      }

      for (const selector of contentSelectors) {
        try {
          if (element.matches(selector)) {
            return true;
          }
        } catch {
          // Invalid selector, continue
        }
      }
      element = element.parentElement;
    }

    // Additional check: if the target has text content or is interactive
    if (target.textContent && target.textContent.trim().length > 0) {
      const tagName = target.tagName.toLowerCase();
      if (['div', 'section', 'article', 'header', 'main', 'footer'].includes(tagName)) {
        // These are usually containers, check if they have significant text
        const directText = Array.from(target.childNodes)
          .filter(node => node.nodeType === Node.TEXT_NODE)
          .map(node => node.textContent || '')
          .join('')
          .trim();
        if (directText.length > 10) {
          return true;
        }
      }
    }

    return false;
  };

  useEffect(() => {
    // Re-run effect after mount or when isMobileWidth changes. This ensures the
    // trail initializes once the client has mounted and the DOM is rendered
    // (otherwise trailRef.current is null during SSR/hydration).
    // Do nothing on mobile widths to avoid running pointer listeners / RAF on small screens.
    if (isMobileWidth) return;

    const container = trailRef.current;
    if (!container) return;

    const onMove = (e: PointerEvent) => {
      // Check if cursor is over content
      const overContent = isOverContentElement(e);
      setIsOverContent(overContent);

      // Only add positions when NOT over content
      if (!overContent) {
        positions.current.unshift({ x: e.clientX, y: e.clientY });
        // keep a short trail
        if (positions.current.length > 8) positions.current.length = 8;
      } else {
        // Gradually reduce trail length when over content
        if (positions.current.length > 0) {
          positions.current.length = Math.max(0, positions.current.length - 1);
        }
      }
    };

    const render = () => {
      const nodes = container.children;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i] as HTMLElement;
        const pos = positions.current[i] || positions.current[positions.current.length - 1];
        if (!pos) {
          // Hide node when no position
          node.style.opacity = '0';
          continue;
        }
        const t = 1 - i / nodes.length; // older -> smaller opacity
        // Reduce opacity when over content
        const baseOpacity = isOverContent ? 0.05 : 0.12;
        const opacityMultiplier = isOverContent ? 0.2 : 0.6;
        
        node.style.transform = `translate3d(${pos.x - 8}px, ${pos.y - 8}px, 0) scale(${0.6 + t * 0.8})`;
        node.style.opacity = `${baseOpacity + t * opacityMultiplier}`;
      }
      rafRef.current = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove);
    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, isMobileWidth, isOverContent]);
  // If we're not mounted yet (SSR) or on mobile width, don't render anything.
  if (!mounted || isMobileWidth) return null;

  return (
    <div
      ref={trailRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1000]"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 via-purple-500 to-purple-500 blur-lg mix-blend-screen cursor-trail-dot"
          style={{
            left: 0,
            top: 0,
            transform: "translate3d(-9999px, -9999px, 0)",
            opacity: 0,
            transition: "transform 0.08s linear, opacity 120ms linear",
          }}
        />
      ))}
    </div>
  );
}
