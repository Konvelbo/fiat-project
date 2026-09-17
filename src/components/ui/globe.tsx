"use client";

import React, { useEffect, useRef } from "react";
import worldGeoData from "./world-geo.json";

interface CobeGlobeProps {
  className?: string;
}

interface WorldGeo {
  polygons: Array<Array<[number, number]>>; // [lat, lng]
  dots: Array<[number, number, number]>; // [lat, lng, isAccent]
}

const WORLD_GEO: WorldGeo = worldGeoData as WorldGeo;

export function CobeGlobe({ className = "" }: CobeGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Rotation angles, drag state & smooth mobile momentum physics
  const rotX = useRef(0.24); // Axial tilt ~14°
  const rotY = useRef(-0.25); // Framing centered around West Africa & Atlantic
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const velocityX = useRef(0);
  const velocityY = useRef(0);
  const pointerIdRef = useRef<number | null>(null);

  // 3D Spherical Coordinates Projection (North is UP, smooth spherical perspective)
  const latLngTo3D = (lat: number, lng: number, radius: number) => {
    const latRad = lat * (Math.PI / 180);
    const lngRad = lng * (Math.PI / 180);

    const x = radius * Math.cos(latRad) * Math.sin(lngRad);
    const y = radius * Math.sin(latRad);
    const z = radius * Math.cos(latRad) * Math.cos(lngRad);

    // Rotate around Y axis (longitude)
    const cosY = Math.cos(rotY.current);
    const sinY = Math.sin(rotY.current);
    const x1 = x * cosY + z * sinY;
    const z1 = -x * sinY + z * cosY;

    // Rotate around X axis (axial tilt)
    const cosX = Math.cos(rotX.current);
    const sinX = Math.sin(rotX.current);
    const y2 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;

    return { x: x1, y: -y2, z: z2 };
  };

  // Main Render Loop
  useEffect(() => {
    let animId: number;

    const drawGlobeOnCanvas = (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width || 760;
      const height = rect.height || 760;
      const cx = width / 2;
      const cy = height / 2;
      const radius = width * 0.43; // Monumental size filling container

      ctx.clearRect(0, 0, width, height);

      // 1. Atmosphere Radial Sunset Glow (Blends seamlessly with the warm cream background)
      const auraOuter = radius * 1.18;
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.88, cx, cy, auraOuter);
      glowGrad.addColorStop(0, "rgba(234, 88, 12, 0.32)");
      glowGrad.addColorStop(0.45, "rgba(251, 146, 60, 0.14)");
      glowGrad.addColorStop(1, "rgba(234, 88, 12, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, auraOuter, 0, Math.PI * 2);
      ctx.fill();

      // 2. Planet Shaded Sphere Body (Warm ivory/cream gradient matching the website)
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.32,
        cy - radius * 0.32,
        radius * 0.08,
        cx,
        cy,
        radius
      );
      sphereGrad.addColorStop(0, "#fefcf9");
      sphereGrad.addColorStop(0.55, "#f5efe5");
      sphereGrad.addColorStop(0.85, "#e8dfd2");
      sphereGrad.addColorStop(1, "#d9cdc0");

      ctx.save();
      ctx.shadowColor = "rgba(234, 88, 12, 0.22)";
      ctx.shadowBlur = 24;
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Inner Horizon Edge Lighting (Sunset Rim)
      const rimGrad = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.82,
        cx,
        cy,
        radius
      );
      rimGrad.addColorStop(0, "rgba(234, 88, 12, 0)");
      rimGrad.addColorStop(0.72, "rgba(251, 146, 60, 0.25)");
      rimGrad.addColorStop(1, "rgba(234, 88, 12, 0.65)");

      ctx.fillStyle = rimGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // 4. Subtle Latitude & Longitude Grid Lines
      ctx.lineWidth = 0.75;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.strokeStyle = "rgba(28, 38, 35, 0.07)";
        ctx.beginPath();
        let first = true;
        for (let lng = -180; lng <= 180; lng += 8) {
          const pt = latLngTo3D(lat, lng, radius);
          if (pt.z > 0) {
            if (first) {
              ctx.moveTo(cx + pt.x, cy + pt.y);
              first = false;
            } else {
              ctx.lineTo(cx + pt.x, cy + pt.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      for (let lng = -180; lng <= 180; lng += 45) {
        ctx.strokeStyle = "rgba(28, 38, 35, 0.07)";
        ctx.beginPath();
        let first = true;
        for (let lat = -80; lat <= 80; lat += 8) {
          const pt = latLngTo3D(lat, lng, radius);
          if (pt.z > 0) {
            if (first) {
              ctx.moveTo(cx + pt.x, cy + pt.y);
              first = false;
            } else {
              ctx.lineTo(cx + pt.x, cy + pt.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      }

      // 5. Authentic World Continent Dense Dotted Matrix (Natural Earth 6,700+ Geographic Points)
      WORLD_GEO.dots.forEach(([lat, lng, isAccent]) => {
        const pt = latLngTo3D(lat, lng, radius);
        if (pt.z > 0) {
          const depth = pt.z / radius;
          const alpha = 0.25 + depth * 0.75;
          const dotSize = 1.1 + depth * 0.9;

          if (isAccent === 1) {
            ctx.fillStyle = `rgba(234, 88, 12, ${alpha * 0.88})`;
          } else {
            ctx.fillStyle = `rgba(28, 38, 35, ${alpha * 0.85})`;
          }

          ctx.beginPath();
          ctx.arc(cx + pt.x, cy + pt.y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 6. High-Precision Continent Outlines (All 128 Natural Earth Polygons)
      ctx.strokeStyle = "rgba(28, 38, 35, 0.18)";
      ctx.lineWidth = 0.85;

      WORLD_GEO.polygons.forEach((poly) => {
        ctx.beginPath();
        let first = true;
        for (let i = 0; i < poly.length; i++) {
          const [lat, lng] = poly[i];
          const pt = latLngTo3D(lat, lng, radius);
          if (pt.z > -radius * 0.15) {
            if (first) {
              ctx.moveTo(cx + pt.x, cy + pt.y);
              first = false;
            } else {
              ctx.lineTo(cx + pt.x, cy + pt.y);
            }
          } else {
            first = true;
          }
        }
        ctx.stroke();
      });
    };

    const render = () => {
      if (!isDragging.current) {
        // Silky smooth momentum inertia when released
        if (Math.abs(velocityX.current) > 0.00005 || Math.abs(velocityY.current) > 0.00005) {
          rotY.current += velocityX.current;
          rotX.current = Math.max(-0.85, Math.min(0.85, rotX.current + velocityY.current));
          velocityX.current *= 0.92;
          velocityY.current *= 0.92;
        } else {
          rotY.current += 0.0022; // Smooth gentle auto-rotation
        }
      }

      if (canvasRef.current) {
        drawGlobeOnCanvas(canvasRef.current);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  // Handle Resize for full canvas resolution (crisp DPR)
  useEffect(() => {
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (canvasRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const size = Math.min(rect.width || 760, rect.height || rect.width || 760);
        canvasRef.current.width = size * dpr;
        canvasRef.current.height = size * dpr;
        canvasRef.current.style.width = `${size}px`;
        canvasRef.current.style.height = `${size}px`;
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) ctx.scale(dpr, dpr);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pointer drag handlers with capture and velocity tracking
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    velocityX.current = 0;
    velocityY.current = 0;
    pointerIdRef.current = e.pointerId;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;

    const speed = 0.0055;
    rotY.current += dx * speed;
    rotX.current = Math.max(-0.85, Math.min(0.85, rotX.current - dy * speed));

    velocityX.current = dx * speed * 0.75;
    velocityY.current = -dy * speed * 0.75;

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDragging.current = false;
    try {
      if (pointerIdRef.current !== null) {
        e.currentTarget.releasePointerCapture(pointerIdRef.current);
      }
    } catch {}
    pointerIdRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square max-w-[680px] sm:max-w-[760px] lg:max-w-[840px] xl:max-w-[880px] mx-auto flex items-center justify-center select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ touchAction: "none" }}
        className="w-full h-full cursor-grab active:cursor-grabbing rounded-full touch-none select-none"
      />
    </div>
  );
}

export const Globe = CobeGlobe;
export default CobeGlobe;
