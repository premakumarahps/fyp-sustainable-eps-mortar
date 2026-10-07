import React, { useEffect, useRef } from 'react';
import {
  MICROGRAPH_1_CSH_GEL,
  MICROGRAPH_2_PP_FIBERS,
  MICROGRAPH_3_COATED_EPS
} from './infographicImages';

export const FuturisticInfographic: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const NS = "http://www.w3.org/2000/svg";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const C = [423.5, 385];

    // Outer radar bounding hexagon
    const OUT = [
      [423.5, 189],
      [583, 290.5],
      [583, 480],
      [423.5, 578],
      [264, 480],
      [264, 290.5]
    ];

    // Comprehensive 2x2 Experimental Datasets (20% vs 40% EPS Replacement)
    const EPS_DATA = {
      "20": {
        label: "20% EPS",
        sublabel: "Structural Matrix (1969 kg/m³)",
        metrics: {
          fc: { sign: "+", val: 54, sub: "10.15 → 15.62 MPa" },
          fr: { sign: "+", val: 71, sub: "2.10 → 3.59 MPa" },
          toughness: { sign: "+", val: 45, sub: "12.58 → 18.24 mJ/mm³" },
          casi: { sign: "-", val: 71, sub: "23.50 → 6.80 Ca/Si" },
          carbon: { sign: "-", val: 40, sub: "53.5 → 32.3 kg/MPa" },
          cost: { sign: "+", val: 18, sub: "0.275 → 0.323 MPa/kLKR" }
        },
        UPG: [
          [423.5, 214.5], // Top: fc (+54%, 87% radius)
          [567.1, 300.0], // Top-Right: Toughness (+45%, 90% radius)
          [557.5, 464.8], // Bottom-Right: Carbon (-40%, 84% radius)
          [423.5, 545.2], // Bottom: Cost (+18%, 83% radius)
          [299.1, 459.1], // Bottom-Left: ITZ (-71%, 78% radius)
          [281.5, 300.9]  // Top-Left: Flexural (+71%, 89% radius)
        ],
        CONV: [
          [423.5, 275.2], // Top: fc (56% radius)
          [522.4, 326.4], // Top-Right: Toughness (62% radius)
          [506.4, 434.4], // Bottom-Right: Carbon (52% radius)
          [423.5, 520.1], // Bottom: Cost (70% radius)
          [362.9, 421.1], // Bottom-Left: ITZ (38% radius)
          [331.0, 330.2]  // Top-Left: Flexural (58% radius)
        ]
      },
      "40": {
        label: "40% EPS",
        sublabel: "Ultra-Lightweight (1734 kg/m³)",
        metrics: {
          fc: { sign: "+", val: 70, sub: "4.20 → 7.15 MPa" },
          fr: { sign: "+", val: 95, sub: "0.95 → 1.85 MPa" },
          toughness: { sign: "+", val: 105, sub: "1.87 → 3.84 mJ/mm³" },
          casi: { sign: "-", val: 77, sub: "24.85 → 5.65 Ca/Si" },
          carbon: { sign: "-", val: 26, sub: "130.0 → 95.7 kg/MPa" },
          cost: { sign: "+", val: 34, sub: "0.098 → 0.131 MPa/kLKR" }
        },
        UPG: [
          [423.5, 257.6], // Top: fc (+70%, 65% radius)
          [571.8, 297.1], // Top-Right: Toughness (+105%, 93% radius)
          [516.0, 440.1], // Bottom-Right: Carbon (-26%, 58% radius)
          [423.5, 524.0], // Bottom: Cost (+34%, 72% radius)
          [291.1, 463.9], // Bottom-Left: ITZ (-77%, 83% radius)
          [299.1, 311.3]  // Top-Left: Flexural (+95%, 78% radius)
        ],
        CONV: [
          [423.5, 310.5], // Top: fc (38% radius)
          [495.3, 342.5], // Top-Right: Toughness (45% radius)
          [490.5, 424.9], // Bottom-Right: Carbon (42% radius)
          [423.5, 485.4], // Bottom: Cost (52% radius)
          [367.7, 418.2], // Bottom-Left: ITZ (35% radius)
          [359.7, 347.2]  // Top-Left: Flexural (40% radius)
        ]
      }
    };

    const d20 = EPS_DATA["20"];
    const d40 = EPS_DATA["40"];

    const vals20 = [54, 71, 45, 71, 40, 18];
    const vals40 = [70, 95, 105, 77, 26, 34];
    const signs = ["+", "+", "+", "-", "-", "+"];

    const scaled = (V: number[][], f: number) => V.map(v => [C[0] + f * (v[0] - C[0]), C[1] + f * (v[1] - C[1])]);
    const d = (pts: number[][]) => pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ") + " Z";

    const hexClipPath = root.querySelector("#hexClipPath");
    if (hexClipPath) hexClipPath.setAttribute("d", d(OUT));

    const hexFill = root.querySelector("#hexFill");
    if (hexFill) hexFill.setAttribute("d", d(OUT));

    const rings = root.querySelector("#rings");
    if (rings && rings.children.length === 0) {
      [0.2, 0.4, 0.6, 0.8, 1].forEach(f => {
        const p = document.createElementNS(NS, "path");
        p.setAttribute("d", d(scaled(OUT, f)));
        p.setAttribute("fill", "none");
        p.setAttribute("stroke", f === 1 ? "#446c9c" : "#33527a");
        p.setAttribute("stroke-opacity", f === 1 ? "1" : ".85");
        p.setAttribute("stroke-width", f === 1 ? "1.8" : "1.3");
        rings.appendChild(p);
      });
    }

    const spokes = root.querySelector("#spokes");
    if (spokes && spokes.children.length === 0) {
      OUT.forEach(v => {
        const l = document.createElementNS(NS, "line");
        l.setAttribute("x1", String(C[0]));
        l.setAttribute("y1", String(C[1]));
        l.setAttribute("x2", String(v[0]));
        l.setAttribute("y2", String(v[1]));
        l.setAttribute("stroke", "#33527a");
        l.setAttribute("stroke-opacity", ".80");
        l.setAttribute("stroke-width", "1.3");
        spokes.appendChild(l);
      });
    }

    const convElements = [
      root.querySelector("#convVolGlow"),
      root.querySelector("#convVolWarm"),
      root.querySelector("#convGlowAura"),
      root.querySelector("#convGlowTight"),
      root.querySelector("#convPoly"),
      root.querySelector("#convCoreLine")
    ].filter(Boolean) as SVGElement[];

    const upgElements = [
      root.querySelector("#upgVolRim"),
      root.querySelector("#upgVolLime"),
      root.querySelector("#upgVolCyanBottom"),
      root.querySelector("#upgVolCyanLeft"),
      root.querySelector("#upgVolCyanTop"),
      root.querySelector("#upgGlowAura"),
      root.querySelector("#upgGlowTight"),
      root.querySelector("#upgPoly"),
      root.querySelector("#upgCoreLine")
    ].filter(Boolean) as SVGElement[];

    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const clamp = (t: number) => Math.max(0, Math.min(1, t));
    const livingMorph = (t: number) => {
      const p = clamp(t);
      return p * p * p * (p * (p * 6 - 15) + 10);
    };

    const numElems = [
      root.querySelector("#v54"),
      root.querySelector("#v71"),
      root.querySelector("#v105"),
      root.querySelector("#v77"),
      root.querySelector("#v40"),
      root.querySelector("#v34")
    ];

    const subElems = [
      root.querySelector("#sub_fc"),
      root.querySelector("#sub_fr"),
      root.querySelector("#sub_toughness"),
      root.querySelector("#sub_casi"),
      root.querySelector("#sub_carbon"),
      root.querySelector("#sub_cost")
    ];

    const pill = root.querySelector("#togglePill") as SVGElement | null;
    const t20 = root.querySelector("#txtEps20") as SVGElement | null;
    const t40 = root.querySelector("#txtEps40") as SVGElement | null;
    const subLabel = root.querySelector("#epsSublabel") as SVGElement | null;

    let targetMu = 0; // 0 = 20% EPS, 1 = 40% EPS

    const setManualLevel = (lvl: string) => {
      targetMu = lvl === "20" ? 0 : 1;
    };

    const btn20 = root.querySelector("#btnEps20");
    const btn40 = root.querySelector("#btnEps40");
    const onBtn20 = () => setManualLevel("20");
    const onBtn40 = () => setManualLevel("40");

    if (btn20) btn20.addEventListener("click", onBtn20);
    if (btn40) btn40.addEventListener("click", onBtn40);

    let currentMu = 0;
    let lastActiveMode = "20";
    let animId = 0;
    let startTimestamp: number | null = null;
    let lastFrameTime: number | null = null;

    function frame(now: number) {
      if (startTimestamp === null) startTimestamp = now;
      if (lastFrameTime === null) lastFrameTime = now;
      const dt = Math.min((now - lastFrameTime) / 1000, 0.1);
      lastFrameTime = now;

      const t0 = startTimestamp;
      const t = reduce ? 99 : (now - t0) / 1000;
      const entrance = clamp((t - 0.5) / 1.8);
      const pe = ease(entrance);
      const amp = reduce ? 0 : 0.014 * clamp((t - 2.2) / 1.5);

      // Smooth, responsive, comfortable spring-damping interpolation (frame-rate independent)
      const factor = reduce ? 1.0 : (1 - Math.exp(-9.5 * dt));
      currentMu += (targetMu - currentMu) * factor;
      if (Math.abs(targetMu - currentMu) < 0.0005) {
        currentMu = targetMu;
      }

      // UI Pill Indicator
      if (pill) {
        pill.setAttribute("transform", "translate(" + (currentMu * 102).toFixed(2) + ", 0)");
      }
      const is40 = currentMu >= 0.5;
      const currentMode = is40 ? "40" : "20";
      if (currentMode !== lastActiveMode) {
        lastActiveMode = currentMode;
        if (is40) {
          if (t40) t40.style.fill = "#052433";
          if (t20) t20.style.fill = "#7ea4c4";
          if (subLabel) subLabel.textContent = d40.sublabel;
        } else {
          if (t20) t20.style.fill = "#052433";
          if (t40) t40.style.fill = "#7ea4c4";
          if (subLabel) subLabel.textContent = d20.sublabel;
        }
        const curData = is40 ? d40 : d20;
        if (subElems[0]) subElems[0].textContent = curData.metrics.fc.sub;
        if (subElems[1]) subElems[1].textContent = curData.metrics.fr.sub;
        if (subElems[2]) subElems[2].textContent = curData.metrics.toughness.sub;
        if (subElems[3]) subElems[3].textContent = curData.metrics.casi.sub;
        if (subElems[4]) subElems[4].textContent = curData.metrics.carbon.sub;
        if (subElems[5]) subElems[5].textContent = curData.metrics.cost.sub;
      }

      const textOpac = (0.35 + 0.65 * Math.pow(Math.abs(currentMu - 0.5) * 2, 1.4)).toFixed(2);
      subElems.forEach(el => {
        if (el) el.setAttribute("opacity", textOpac);
      });
      if (subLabel) {
        subLabel.setAttribute("opacity", textOpac);
      }

      const baseConv: number[][] = [];
      const baseUpg: number[][] = [];

      for (let i = 0; i < 6; i++) {
        const c20 = d20.CONV[i], c40 = d40.CONV[i];
        const u20 = d20.UPG[i], u40 = d40.UPG[i];

        const cx = (1 - currentMu) * c20[0] + currentMu * c40[0];
        const cy = (1 - currentMu) * c20[1] + currentMu * c40[1];
        const ux = (1 - currentMu) * u20[0] + currentMu * u40[0];
        const uy = (1 - currentMu) * u20[1] + currentMu * u40[1];

        const pcConv = clamp((t - 0.3) / 1.4);
        const pcUpg = clamp((t - 0.8) / 1.7);

        const ec = ease(pcConv);
        const eu = ease(pcUpg);

        const waveK = 1 + amp * Math.sin(t * 1.4 + i * 1.1);

        baseConv.push([
          C[0] + ec * (cx - C[0]) * waveK,
          C[1] + ec * (cy - C[1]) * waveK
        ]);

        baseUpg.push([
          C[0] + eu * (ux - C[0]) * waveK,
          C[1] + eu * (uy - C[1]) * waveK
        ]);

        const targetVal = (1 - currentMu) * vals20[i] + currentMu * vals40[i];
        const curDisplayVal = Math.round(targetVal * pe);
        if (numElems[i]) {
          numElems[i]!.textContent = signs[i] + curDisplayVal + "%";
        }
      }

      const cd = d(baseConv);
      convElements.forEach(el => el.setAttribute("d", cd));
      const ud = d(baseUpg);
      upgElements.forEach(el => el.setAttribute("d", ud));

      if (!reduce) {
        animId = requestAnimationFrame(frame);
      }
    }

    animId = requestAnimationFrame(frame);

    // Legend Series Highlighting
    const legendItems = root.querySelectorAll<HTMLElement>(".legend-item");
    const cleanupFns: Array<() => void> = [];

    legendItems.forEach(el => {
      const s = el.dataset.series;
      const on = () => {
        if (s === "conv") {
          upgElements.forEach(e => e.classList.add("dim"));
        } else {
          convElements.forEach(e => e.classList.add("dim"));
        }
      };
      const off = () => {
        [...convElements, ...upgElements].forEach(e => e.classList.remove("dim"));
      };
      el.addEventListener("mouseenter", on);
      el.addEventListener("mouseleave", off);
      el.addEventListener("click", () => { on(); setTimeout(off, 1800); });
      cleanupFns.push(() => {
        el.removeEventListener("mouseenter", on);
        el.removeEventListener("mouseleave", off);
      });
    });

    // Floating background particle bubbles (20 particles)
    const particles = root.querySelector("#particles");
    if (particles && !reduce && particles.children.length === 0) {
      for (let i = 0; i < 20; i++) {
        const c = document.createElementNS(NS, "circle");
        const x = Math.random() * 1376, y = Math.random() * 768;
        c.setAttribute("cx", String(x));
        c.setAttribute("cy", String(y));
        c.setAttribute("r", (1.5 + Math.random() * 2.2).toFixed(1));
        c.setAttribute("fill", i % 3 ? "#14b8ea" : "#12c9a0");
        c.setAttribute("opacity", (0.22 + Math.random() * 0.25).toFixed(2));
        const a = document.createElementNS(NS, "animate");
        a.setAttribute("attributeName", "cy");
        a.setAttribute("values", y + ";" + (y - 60 - Math.random() * 80) + ";" + y);
        a.setAttribute("dur", (9 + Math.random() * 9).toFixed(1) + "s");
        a.setAttribute("repeatCount", "indefinite");
        c.appendChild(a);
        particles.appendChild(c);
      }
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (btn20) btn20.removeEventListener("click", onBtn20);
      if (btn40) btn40.removeEventListener("click", onBtn40);
      cleanupFns.forEach(fn => fn());
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full relative select-none">
      <style>{`
        .futuristic-infographic text { font-family: "Open Sans", "Segoe UI", system-ui, sans-serif; fill: #0c2a3b; }
        .futuristic-infographic .lg { font-size: 21.5px; }
        .futuristic-infographic .ax { font-size: 26px; }
        .futuristic-infographic .sm { font-size: 20px; }
        .futuristic-infographic .ct { font-size: 25px; }
        .futuristic-infographic .cp { font-size: 23px; }
        .futuristic-infographic .num { font-weight: 700; }
        .futuristic-infographic .fade { opacity: 0; animation: infoFadeIn .9s ease forwards; animation-delay: var(--d, 0s); }
        @keyframes infoFadeIn { to { opacity: 1; } }
        .futuristic-infographic .pop { opacity: 0; transform-box: fill-box; transform-origin: center; animation: infoPop .9s cubic-bezier(.2,.9,.25,1.12) forwards; animation-delay: var(--d, 0s); }
        @keyframes infoPop { from { opacity: 0; transform: scale(.8); } to { opacity: 1; transform: scale(1); } }
        .futuristic-infographic .draw { opacity: 0; stroke-dasharray: 1; stroke-dashoffset: 1; animation: infoDraw 1.3s ease forwards; animation-delay: var(--d, 0s); }
        @keyframes infoDraw { 0% { opacity: 0; stroke-dashoffset: 1; } 10% { opacity: 1; } 100% { opacity: 1; stroke-dashoffset: 0; } }
        .futuristic-infographic .draw-leader { opacity: 0; stroke-dasharray: 1; stroke-dashoffset: 1; animation: infoDrawLeader .55s cubic-bezier(.25,.9,.3,1) forwards; animation-delay: var(--d, 0s); }
        @keyframes infoDrawLeader { 0% { opacity: 0; stroke-dashoffset: 1; } 10% { opacity: 1; } 100% { opacity: 1; stroke-dashoffset: 0; } }
        .futuristic-infographic .runner { stroke-dasharray: .13 .87; stroke-dashoffset: 1; animation: infoRun 4.6s linear infinite; animation-delay: var(--d, 0s); }
        @keyframes infoRun { to { stroke-dashoffset: 0; } }
        .futuristic-infographic .hoverable { transition: transform .35s cubic-bezier(.2,.9,.3,1); transform-box: fill-box; transform-origin: center; }
        .futuristic-infographic .hoverable:hover { transform: scale(1.05); }
        .futuristic-infographic .legend-item { cursor: pointer; }
        .futuristic-infographic .dim { opacity: .15 !important; }
        .futuristic-infographic #radar path { transition: opacity .3s; }
        .futuristic-infographic .pulse-stream { stroke-dasharray: .12 .38; stroke-dashoffset: 1; animation: infoOpticalPulse 4.8s linear infinite; }
        .futuristic-infographic .pulse-stream-2 { stroke-dasharray: .12 .38; stroke-dashoffset: 1; animation: infoOpticalPulse 4.8s linear infinite; animation-delay: -2.4s; }
        @keyframes infoOpticalPulse { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        .futuristic-infographic .arrow-sync { animation: infoArrowWave 2.6s ease-in-out infinite; transform-origin: center; }
        .futuristic-infographic .ar-1 { animation-delay: 0s; }
        .futuristic-infographic .ar-2 { animation-delay: 0.30s; }
        .futuristic-infographic .ar-3 { animation-delay: 0.60s; }
        @keyframes infoArrowWave { 0%,100% { opacity: 0.20; stroke: #3f86ad; transform: translateX(0); } 40% { opacity: 0.90; stroke: #1685a8; transform: translateX(-3px); } 70% { opacity: 0.30; stroke: #3f86ad; transform: translateX(-1px); } }
        @media (prefers-reduced-motion: reduce) {
          .futuristic-infographic .fade, .futuristic-infographic .pop { animation: none; opacity: 1; }
          .futuristic-infographic .draw, .futuristic-infographic .draw-leader { animation: none; stroke-dashoffset: 0; }
          .futuristic-infographic .runner, .futuristic-infographic .pulse-stream, .futuristic-infographic .pulse-stream-2 { animation: none; }
          .futuristic-infographic .arrow-sync { animation: none; opacity: .8; }
        }
      `}</style>

      <svg
        id="stage"
        viewBox="0 0 1376 768"
        role="img"
        aria-labelledby="infographicTitle infographicDesc"
        className="futuristic-infographic w-full h-auto block"
      >
        <title id="infographicTitle">Conventional versus upgraded sustainable EPS mortar</title>
        <desc id="infographicDesc">Radar chart comparing the two mortars: +54% compressive strength, +105% toughness, -77% ITZ Ca/Si, with micrographs of C-S-H gel bonding, polypropylene fibers bridging microcracks and surface-coated EPS beads.</desc>
        
        <defs>
          <linearGradient id="cardFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff"/><stop offset="1" stopColor="#f2f9fd"/></linearGradient>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#00e5ff"/><stop offset=".55" stopColor="#00f5a0"/><stop offset="1" stopColor="#10b981"/></linearGradient>
          <linearGradient id="steel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b8d2e4"/><stop offset=".5" stopColor="#7ea3c0"/><stop offset="1" stopColor="#5c84a5"/></linearGradient>
          <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#14c6ea" stopOpacity="0"/><stop offset="1" stopColor="#14c6ea" stopOpacity=".30"/></linearGradient>
          <linearGradient id="numGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#00a86b"/><stop offset="1" stopColor="#009688"/></linearGradient>

          {/* Dark Obsidian 3D Prism Backdrop Gradient & Depth Shadow */}
          <linearGradient id="darkHexBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0e1b2e"/>
            <stop offset="50%" stopColor="#0a1422"/>
            <stop offset="100%" stopColor="#060c16"/>
          </linearGradient>

          <filter id="hexDropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="#071b2d" floodOpacity="0.45"/>
          </filter>

          {/* High-Luminance Electric Neon Laser Stroke Gradients */}
          <linearGradient id="neonUpgStroke" gradientUnits="userSpaceOnUse" x1="280" y1="280" x2="580" y2="380">
            <stop offset="0%" stopColor="#00e5ff"/>
            <stop offset="28%" stopColor="#00f5d4"/>
            <stop offset="58%" stopColor="#00ffa3"/>
            <stop offset="85%" stopColor="#00ff66"/>
            <stop offset="100%" stopColor="#14ff70"/>
          </linearGradient>

          <linearGradient id="neonConvStroke" gradientUnits="userSpaceOnUse" x1="280" y1="280" x2="520" y2="480">
            <stop offset="0%" stopColor="#ff1a3c"/>
            <stop offset="35%" stopColor="#ff3b53"/>
            <stop offset="70%" stopColor="#ff5e42"/>
            <stop offset="100%" stopColor="#ff793f"/>
          </linearGradient>

          {/* Multi-Apex Inward Volumetric Radial Glows for Conventional Polygon */}
          <radialGradient id="volConvGlow" cx="415" cy="385" r="155" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff2b44" stopOpacity="0.10"/>
            <stop offset="40%" stopColor="#ff3e56" stopOpacity="0.26"/>
            <stop offset="75%" stopColor="#ff2b44" stopOpacity="0.45"/>
            <stop offset="100%" stopColor="#ff1a3c" stopOpacity="0.30"/>
          </radialGradient>

          <radialGradient id="volConvWarm" cx="370" cy="350" r="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff3b53" stopOpacity="0.55"/>
            <stop offset="50%" stopColor="#ff5e42" stopOpacity="0.22"/>
            <stop offset="100%" stopColor="#ff5e42" stopOpacity="0"/>
          </radialGradient>

          {/* Multi-Apex Inward Volumetric Radial Glows for Upgraded Polygon */}
          <radialGradient id="volUpgRim" cx="423.5" cy="385" r="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.0"/>
            <stop offset="50%" stopColor="#00f5b8" stopOpacity="0.05"/>
            <stop offset="80%" stopColor="#00f5b8" stopOpacity="0.22"/>
            <stop offset="100%" stopColor="#00ff66" stopOpacity="0.32"/>
          </radialGradient>

          <radialGradient id="volUpgLime" cx="570" cy="298" r="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00ff66" stopOpacity="0.60"/>
            <stop offset="45%" stopColor="#00f5b8" stopOpacity="0.22"/>
            <stop offset="100%" stopColor="#00f5b8" stopOpacity="0"/>
          </radialGradient>

          <radialGradient id="volUpgCyanBottom" cx="423.5" cy="524" r="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.58"/>
            <stop offset="45%" stopColor="#00e5ff" stopOpacity="0.20"/>
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0"/>
          </radialGradient>

          <radialGradient id="volUpgCyanLeft" cx="281.5" cy="301" r="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.58"/>
            <stop offset="45%" stopColor="#00f0ff" stopOpacity="0.20"/>
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0"/>
          </radialGradient>

          <radialGradient id="volUpgCyanTop" cx="423.5" cy="214.5" r="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.52"/>
            <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.16"/>
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0"/>
          </radialGradient>

          {/* Laser Bloom Filters Calibrated for Dark Obsidian Base */}
          <filter id="neonBloomEmeraldAura" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10.0" result="aura"/>
          </filter>

          <filter id="neonBloomEmeraldTight" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" result="tight"/>
            <feMerge>
              <feMergeNode in="tight"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="neonBloomCoralAura" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9.0" result="auraC"/>
          </filter>

          <filter id="neonBloomCoralTight" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="tightC"/>
            <feMerge>
              <feMergeNode in="tightC"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="soft" x="-20%" y="-30%" width="140%" height="170%"><feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#0a4666" floodOpacity=".15"/></filter>
          <filter id="orbShadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#08607f" floodOpacity=".28"/></filter>
          <filter id="blur8"><feGaussianBlur stdDeviation="8"/></filter>
          <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <radialGradient id="gloss" cx=".3" cy=".22" r=".8"><stop offset="0" stopColor="#fff" stopOpacity=".22"/><stop offset=".45" stopColor="#fff" stopOpacity="0"/></radialGradient>
          
          <clipPath id="clipHex"><path id="hexClipPath" d=""/></clipPath>
          <clipPath id="clip1"><circle r="99.5"/></clipPath>
          <clipPath id="clip2"><circle r="93.5"/></clipPath>
          <clipPath id="clip3"><circle r="93.5"/></clipPath>
          
          <linearGradient id="busLineFadeLeft" x1="860" y1="388.5" x2="740" y2="388.5" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3f86ad" stopOpacity="0.80"/>
            <stop offset="45%" stopColor="#3f86ad" stopOpacity="0.80"/>
            <stop offset="100%" stopColor="#3f86ad" stopOpacity="0"/>
          </linearGradient>

          {/* Scientific Optical Pulse Gradient */}
          <linearGradient id="opticalPulseGrad" x1="895" y1="0" x2="740" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#148ab0" stopOpacity="0.25"/>
            <stop offset="45%" stopColor="#3eb3d8" stopOpacity="0.95"/>
            <stop offset="90%" stopColor="#7cd4f0" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="#3f86ad" stopOpacity="0"/>
          </linearGradient>

          {/* Toggle Active Glow Gradient */}
          <linearGradient id="toggleActiveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00e5ff"/>
            <stop offset="50%" stopColor="#00f5a0"/>
            <stop offset="100%" stopColor="#14ff70"/>
          </linearGradient>
        </defs>

        {/* 100% Transparent Background with Animated Floating Particle Bubbles */}
        <g id="particles"></g>

        {/* RADAR: Sleek 3D Isometric Obsidian Prism Viewport */}
        <g id="radar" className="fade" style={{ ['--d' as any]: '.15s' }}>
          {/* 3D Isometric Prism Container Backdrop */}
          <polygon id="isoPrismBackdrop" className="pop" style={{ ['--d' as any]: '.18s' }} points="423.5,150 622,265 622,509 423.5,621 225,509 225,265" fill="url(#darkHexBg)" stroke="#1a3152" strokeWidth="1.8" filter="url(#hexDropShadow)"/>

          {/* 3D Isometric depth wireframe container */}
          <g id="iso3DBox" className="fade" style={{ ['--d' as any]: '.25s' }} stroke="#365882" strokeOpacity="0.80" strokeWidth="1.4" fill="none">
            <path d="M423.5 189 L423.5 150 M583 290.5 L622 265 M583 480 L622 509 M423.5 578 L423.5 621 M264 480 L225 509 M264 290.5 L225 265"/>
            <polygon points="423.5,150 622,265 622,509 423.5,621 225,509 225,265" strokeDasharray="3 3" strokeOpacity="0.40"/>
          </g>

          {/* Front Hexagon Grid Canvas */}
          <path id="hexFill" fill="#0b1626" fillOpacity="0.45" className="fade" style={{ ['--d' as any]: '.32s' }}/>
          <g id="rings" className="fade" style={{ ['--d' as any]: '.38s' }}></g>
          <g id="spokes" className="fade" style={{ ['--d' as any]: '.44s' }}></g>

          {/* Conventional Mortar: Multi-Apex Volumetric Glows + Laser Contours */}
          <g id="convRadarGroup" className="fade" style={{ ['--d' as any]: '.50s' }}>
            <path id="convVolGlow" fill="url(#volConvGlow)" stroke="none"/>
            <path id="convVolWarm" fill="url(#volConvWarm)" stroke="none"/>
            <path id="convGlowAura" fill="none" stroke="url(#neonConvStroke)" strokeWidth="16" strokeOpacity="0.65" strokeLinejoin="round" filter="url(#neonBloomCoralAura)"/>
            <path id="convGlowTight" fill="none" stroke="url(#neonConvStroke)" strokeWidth="5.0" strokeOpacity="0.95" strokeLinejoin="round" filter="url(#neonBloomCoralTight)"/>
            <path id="convPoly" fill="none" stroke="url(#neonConvStroke)" strokeWidth="2.6" strokeLinejoin="round"/>
            <path id="convCoreLine" fill="none" stroke="#ffe0e4" strokeWidth="1.0" strokeOpacity="0.80" strokeLinejoin="round"/>
          </g>

          {/* Upgraded Mortar: Multi-Apex Volumetric Glows + White-Hot Laser Core */}
          <g id="upgRadarGroup" className="fade" style={{ ['--d' as any]: '.65s' }}>
            <path id="upgVolRim" fill="url(#volUpgRim)" stroke="none"/>
            <path id="upgVolLime" fill="url(#volUpgLime)" stroke="none"/>
            <path id="upgVolCyanBottom" fill="url(#volUpgCyanBottom)" stroke="none"/>
            <path id="upgVolCyanLeft" fill="url(#volUpgCyanLeft)" stroke="none"/>
            <path id="upgVolCyanTop" fill="url(#volUpgCyanTop)" stroke="none"/>
            <path id="upgGlowAura" fill="none" stroke="url(#neonUpgStroke)" strokeWidth="18" strokeOpacity="0.75" strokeLinejoin="round" filter="url(#neonBloomEmeraldAura)"/>
            <path id="upgGlowTight" fill="none" stroke="url(#neonUpgStroke)" strokeWidth="5.5" strokeOpacity="0.98" strokeLinejoin="round" filter="url(#neonBloomEmeraldTight)"/>
            <path id="upgPoly" fill="none" stroke="url(#neonUpgStroke)" strokeWidth="2.8" strokeLinejoin="round"/>
            <path id="upgCoreLine" fill="none" stroke="#ffffff" strokeWidth="1.3" strokeOpacity="0.95" strokeLinejoin="round"/>
          </g>
          
          <g id="dots" style={{ display: 'none' }}></g>
        </g>

        {/* PRECISION TECHNICAL CALLOUT LEADERS */}
        {/* 1. Top Leader: Compressive Strength */}
        <g id="callout-top">
          <g className="fade" style={{ ['--d' as any]: '1.05s' }}>
            <line x1="418" y1="110" x2="429" y2="110" stroke="#167a9e" strokeWidth="2.2" strokeLinecap="round"/>
            <circle cx="423.5" cy="110" r="2.0" fill="#167a9e"/>
          </g>
          <path className="draw-leader" pathLength="1" style={{ ['--d' as any]: '1.05s' }} stroke="#2382a8" strokeOpacity="0.80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M 423.5 110 L 423.5 150"/>
          <g className="pop" style={{ ['--d' as any]: '1.30s' }}>
            <circle cx="423.5" cy="150" r="6.0" fill="none" stroke="#2382a8" strokeWidth="1.0" strokeOpacity="0.55"/>
            <circle cx="423.5" cy="150" r="3.4" fill="#00d4c8" stroke="#ffffff" strokeWidth="1.2"/>
          </g>
        </g>

        {/* 2. Top-Left Leader: Flexural Strength */}
        <g id="callout-top-left">
          <g className="fade" style={{ ['--d' as any]: '1.18s' }}>
            <line x1="202" y1="227" x2="202" y2="237" stroke="#167a9e" strokeWidth="2.2" strokeLinecap="round"/>
            <circle cx="202" cy="232" r="2.0" fill="#167a9e"/>
          </g>
          <path className="draw-leader" pathLength="1" style={{ ['--d' as any]: '1.18s' }} stroke="#2382a8" strokeOpacity="0.80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M 202 232 H 212 L 225 265"/>
          <g className="pop" style={{ ['--d' as any]: '1.43s' }}>
            <circle cx="225" cy="265" r="6.0" fill="none" stroke="#2382a8" strokeWidth="1.0" strokeOpacity="0.55"/>
            <circle cx="225" cy="265" r="3.4" fill="#00d4c8" stroke="#ffffff" strokeWidth="1.2"/>
          </g>
        </g>

        {/* 3. Top-Right Leader: Fracture Toughness */}
        <g id="callout-top-right">
          <g className="fade" style={{ ['--d' as any]: '1.30s' }}>
            <line x1="644" y1="227" x2="644" y2="237" stroke="#167a9e" strokeWidth="2.2" strokeLinecap="round"/>
            <circle cx="644" cy="232" r="2.0" fill="#167a9e"/>
          </g>
          <path className="draw-leader" pathLength="1" style={{ ['--d' as any]: '1.30s' }} stroke="#2382a8" strokeOpacity="0.80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M 644 232 H 634 L 622 265"/>
          <g className="pop" style={{ ['--d' as any]: '1.55s' }}>
            <circle cx="622" cy="265" r="6.0" fill="none" stroke="#2382a8" strokeWidth="1.0" strokeOpacity="0.55"/>
            <circle cx="622" cy="265" r="3.4" fill="#00d4c8" stroke="#ffffff" strokeWidth="1.2"/>
          </g>
        </g>

        {/* 4. Bottom-Left Leader: ITZ Refinement */}
        <g id="callout-bottom-left">
          <g className="fade" style={{ ['--d' as any]: '1.42s' }}>
            <line x1="202" y1="537" x2="202" y2="547" stroke="#167a9e" strokeWidth="2.2" strokeLinecap="round"/>
            <circle cx="202" cy="542" r="2.0" fill="#167a9e"/>
          </g>
          <path className="draw-leader" pathLength="1" style={{ ['--d' as any]: '1.42s' }} stroke="#2382a8" strokeOpacity="0.80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M 202 542 H 212 L 225 509"/>
          <g className="pop" style={{ ['--d' as any]: '1.67s' }}>
            <circle cx="225" cy="509" r="6.0" fill="none" stroke="#2382a8" strokeWidth="1.0" strokeOpacity="0.55"/>
            <circle cx="225" cy="509" r="3.4" fill="#00d4c8" stroke="#ffffff" strokeWidth="1.2"/>
          </g>
        </g>

        {/* 5. Bottom-Right Leader: Carbon Footprint */}
        <g id="callout-bottom-right">
          <g className="fade" style={{ ['--d' as any]: '1.55s' }}>
            <line x1="644" y1="537" x2="644" y2="547" stroke="#167a9e" strokeWidth="2.2" strokeLinecap="round"/>
            <circle cx="644" cy="542" r="2.0" fill="#167a9e"/>
          </g>
          <path className="draw-leader" pathLength="1" style={{ ['--d' as any]: '1.55s' }} stroke="#2382a8" strokeOpacity="0.80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M 644 542 H 634 L 622 509"/>
          <g className="pop" style={{ ['--d' as any]: '1.80s' }}>
            <circle cx="622" cy="509" r="6.0" fill="none" stroke="#2382a8" strokeWidth="1.0" strokeOpacity="0.55"/>
            <circle cx="622" cy="509" r="3.4" fill="#00d4c8" stroke="#ffffff" strokeWidth="1.2"/>
          </g>
        </g>

        {/* 6. Bottom Leader: Strength-to-Cost Efficiency */}
        <g id="callout-bottom">
          <g className="fade" style={{ ['--d' as any]: '1.68s' }}>
            <line x1="418" y1="661" x2="429" y2="661" stroke="#167a9e" strokeWidth="2.2" strokeLinecap="round"/>
            <circle cx="423.5" cy="661" r="2.0" fill="#167a9e"/>
          </g>
          <path className="draw-leader" pathLength="1" style={{ ['--d' as any]: '1.68s' }} stroke="#2382a8" strokeOpacity="0.80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M 423.5 661 L 423.5 621"/>
          <g className="pop" style={{ ['--d' as any]: '1.93s' }}>
            <circle cx="423.5" cy="621" r="6.0" fill="none" stroke="#2382a8" strokeWidth="1.0" strokeOpacity="0.55"/>
            <circle cx="423.5" cy="621" r="3.4" fill="#00d4c8" stroke="#ffffff" strokeWidth="1.2"/>
          </g>
        </g>

        {/* LEGEND SELECTORS & REPLACEMENT LEVEL CONTROLLER */}
        <g>
          {/* Conventional EPS item (Line 1) */}
          <g className="legend-item hoverable fade" data-series="conv" style={{ cursor: 'pointer', ['--d' as any]: '.80s' }}>
            <rect x="24" y="24" width="28" height="18" rx="9" fill="url(#volConvGlow)" stroke="#ff2e43" strokeWidth="1.8"/>
            <circle cx="38" cy="33" r="3.5" fill="#ff3b53" filter="url(#dotGlow)"/>
            <text className="sm" x="60" y="38" style={{ fontSize: '14.5px', fontWeight: 700, fill: '#c0291e', letterSpacing: '0.25px' }}>Conventional EPS</text>
          </g>

          {/* Upgraded EPS item (Line 2) */}
          <g className="legend-item hoverable fade" data-series="upg" style={{ cursor: 'pointer', ['--d' as any]: '.90s' }}>
            <rect x="24" y="50" width="28" height="18" rx="9" fill="url(#volUpgLime)" stroke="#00ff66" strokeWidth="1.8"/>
            <circle cx="38" cy="59" r="3.5" fill="#00e5ff" filter="url(#dotGlow)"/>
            <text className="sm" x="60" y="64" style={{ fontSize: '14.5px', fontWeight: 700, fill: '#067d6c', letterSpacing: '0.25px' }}>Upgraded EPS</text>
          </g>

          {/* Interactive Dual-Pill EPS Level Switcher */}
          <g id="epsLevelControl" className="pop" style={{ ['--d' as any]: '1.00s' }}>
            <rect x="24" y="82" width="206" height="32" rx="16" fill="#081424" fillOpacity="0.92" stroke="#1c3d63" strokeWidth="1.3" filter="url(#soft)"/>
            <rect id="togglePill" x="26" y="84" width="100" height="28" rx="14" fill="url(#toggleActiveGrad)" stroke="#00ffa3" strokeWidth="1.1"/>
            
            <g id="btnEps20" className="hoverable" style={{ cursor: 'pointer' }}>
              <rect x="26" y="84" width="100" height="28" rx="14" fill="transparent"/>
              <text id="txtEps20" x="76" y="102.5" textAnchor="middle" style={{ fontSize: '12.5px', fontWeight: 700, fill: '#052433', letterSpacing: '0.25px', transition: 'fill 0.3s' }}>20% EPS</text>
            </g>
            
            <g id="btnEps40" className="hoverable" style={{ cursor: 'pointer' }}>
              <rect x="128" y="84" width="100" height="28" rx="14" fill="transparent"/>
              <text id="txtEps40" x="178" y="102.5" textAnchor="middle" style={{ fontSize: '12.5px', fontWeight: 700, fill: '#7ea4c4', letterSpacing: '0.25px', transition: 'fill 0.3s' }}>40% EPS</text>
            </g>

            <text id="epsSublabel" x="127" y="130" textAnchor="middle" style={{ fontSize: '11.5px', fontWeight: 600, fill: '#35678b', letterSpacing: '0.2px' }}>Structural Matrix (1969 kg/m³)</text>
          </g>
        </g>

        {/* 6 BENCHMARK PARAMETER ANIMATED CARDS */}
        {/* 1. Top: Compressive Strength (+54%) */}
        <g className="pop" style={{ ['--d' as any]: '1.05s' }}>
          <g className="hoverable">
            <rect x="298.5" y="36" width="250" height="74" rx="16" fill="url(#cardFill)" stroke="#8fcfe6" strokeOpacity=".75" filter="url(#soft)"/>
            <rect className="runner" x="298.5" y="36" width="250" height="74" rx="16" pathLength="1" fill="none" stroke="url(#ring)" strokeWidth="2.6" style={{ ['--d' as any]: '0s' }}/>
            <text className="ct" x="423.5" y="59" textAnchor="middle" style={{ fontSize: '16.5px', fontWeight: 600, fill: '#0c2a3b' }}>Compressive Strength</text>
            <text id="v54" className="num" x="423.5" y="86" textAnchor="middle" style={{ fontSize: '28px', fontWeight: 700, fill: 'url(#numGrad)' }}>+0%</text>
            <text id="sub_fc" x="423.5" y="101" textAnchor="middle" style={{ fontSize: '11px', fontWeight: 600, fill: '#42708c' }}>10.15 → 15.62 MPa</text>
          </g>
        </g>

        {/* 2. Left Top: Flexural Strength (+71%) */}
        <g className="pop" style={{ ['--d' as any]: '1.18s' }}>
          <g className="hoverable">
            <rect x="22" y="195" width="180" height="74" rx="16" fill="url(#cardFill)" stroke="#8fcfe6" strokeOpacity=".75" filter="url(#soft)"/>
            <rect className="runner" x="22" y="195" width="180" height="74" rx="16" pathLength="1" fill="none" stroke="url(#ring)" strokeWidth="2.6" style={{ ['--d' as any]: '-0.8s' }}/>
            <text className="ct" x="112" y="218" textAnchor="middle" style={{ fontSize: '15.5px', fontWeight: 600, fill: '#0c2a3b' }}>Flexural Strength</text>
            <text id="v71" className="num" x="112" y="245" textAnchor="middle" style={{ fontSize: '28px', fontWeight: 700, fill: 'url(#numGrad)' }}>+0%</text>
            <text id="sub_fr" x="112" y="260" textAnchor="middle" style={{ fontSize: '11px', fontWeight: 600, fill: '#42708c' }}>2.10 → 3.59 MPa</text>
          </g>
        </g>

        {/* 3. Right Top: Fracture Toughness (+105%) */}
        <g className="pop" style={{ ['--d' as any]: '1.30s' }}>
          <g className="hoverable">
            <rect x="644" y="195" width="190" height="74" rx="16" fill="url(#cardFill)" stroke="#8fcfe6" strokeOpacity=".75" filter="url(#soft)"/>
            <rect className="runner" x="644" y="195" width="190" height="74" rx="16" pathLength="1" fill="none" stroke="url(#ring)" strokeWidth="2.6" style={{ ['--d' as any]: '-1.6s' }}/>
            <text className="ct" x="739" y="218" textAnchor="middle" style={{ fontSize: '15.5px', fontWeight: 600, fill: '#0c2a3b' }}>Fracture Toughness</text>
            <text id="v105" className="num" x="739" y="245" textAnchor="middle" style={{ fontSize: '28px', fontWeight: 700, fill: 'url(#numGrad)' }}>+0%</text>
            <text id="sub_toughness" x="739" y="260" textAnchor="middle" style={{ fontSize: '11px', fontWeight: 600, fill: '#42708c' }}>12.58 → 18.24 mJ/mm³</text>
          </g>
        </g>

        {/* 4. Left Bottom: ITZ Refinement (-77%) */}
        <g className="pop" style={{ ['--d' as any]: '1.42s' }}>
          <g className="hoverable">
            <rect x="22" y="505" width="180" height="74" rx="16" fill="url(#cardFill)" stroke="#8fcfe6" strokeOpacity=".75" filter="url(#soft)"/>
            <rect className="runner" x="22" y="505" width="180" height="74" rx="16" pathLength="1" fill="none" stroke="url(#ring)" strokeWidth="2.6" style={{ ['--d' as any]: '-2.4s' }}/>
            <text className="ct" x="112" y="528" textAnchor="middle" style={{ fontSize: '15.5px', fontWeight: 600, fill: '#0c2a3b' }}>ITZ Refinement</text>
            <text id="v77" className="num" x="112" y="555" textAnchor="middle" style={{ fontSize: '28px', fontWeight: 700, fill: 'url(#numGrad)' }}>-0%</text>
            <text id="sub_casi" x="112" y="570" textAnchor="middle" style={{ fontSize: '11px', fontWeight: 600, fill: '#42708c' }}>23.50 → 6.80 Ca/Si</text>
          </g>
        </g>

        {/* 5. Right Bottom: Carbon Footprint (-40%) */}
        <g className="pop" style={{ ['--d' as any]: '1.55s' }}>
          <g className="hoverable">
            <rect x="644" y="505" width="190" height="74" rx="16" fill="url(#cardFill)" stroke="#8fcfe6" strokeOpacity=".75" filter="url(#soft)"/>
            <rect className="runner" x="644" y="505" width="190" height="74" rx="16" pathLength="1" fill="none" stroke="url(#ring)" strokeWidth="2.6" style={{ ['--d' as any]: '-3.2s' }}/>
            <text className="ct" x="739" y="528" textAnchor="middle" style={{ fontSize: '15.5px', fontWeight: 600, fill: '#0c2a3b' }}>Carbon Footprint</text>
            <text id="v40" className="num" x="739" y="555" textAnchor="middle" style={{ fontSize: '28px', fontWeight: 700, fill: 'url(#numGrad)' }}>-0%</text>
            <text id="sub_carbon" x="739" y="570" textAnchor="middle" style={{ fontSize: '11px', fontWeight: 600, fill: '#42708c' }}>53.5 → 32.3 kg/MPa</text>
          </g>
        </g>

        {/* 6. Bottom: Strength-to-Cost Efficiency (+34%) */}
        <g className="pop" style={{ ['--d' as any]: '1.68s' }}>
          <g className="hoverable">
            <rect x="283.5" y="661" width="280" height="74" rx="16" fill="url(#cardFill)" stroke="#8fcfe6" strokeOpacity=".75" filter="url(#soft)"/>
            <rect className="runner" x="283.5" y="661" width="280" height="74" rx="16" pathLength="1" fill="none" stroke="url(#ring)" strokeWidth="2.6" style={{ ['--d' as any]: '-4.0s' }}/>
            <text className="ct" x="423.5" y="684" textAnchor="middle" style={{ fontSize: '15.5px', fontWeight: 600, fill: '#0c2a3b' }}>Strength-to-Cost Efficiency</text>
            <text id="v34" className="num" x="423.5" y="711" textAnchor="middle" style={{ fontSize: '28px', fontWeight: 700, fill: 'url(#numGrad)' }}>+0%</text>
            <text id="sub_cost" x="423.5" y="726" textAnchor="middle" style={{ fontSize: '11px', fontWeight: 600, fill: '#42708c' }}>0.275 → 0.323 MPa/kLKR</text>
          </g>
        </g>

        {/* CONNECTORS: Institutional Technical Bus Path & Scientific Optical Pulse Propagation */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Base Technical Backbone */}
          <path className="draw" pathLength={1} style={{ ['--d' as any]: '2.05s' }} stroke="#3f86ad" strokeOpacity=".70" strokeWidth="1.8" d="M895 154.5 H872 A12 12 0 0 0 860 166.5 V388.5"/>
          <path className="draw" pathLength={1} style={{ ['--d' as any]: '2.15s' }} stroke="#3f86ad" strokeOpacity=".70" strokeWidth="1.8" d="M895 388.5 H860"/>
          <path className="draw" pathLength={1} style={{ ['--d' as any]: '2.25s' }} stroke="#3f86ad" strokeOpacity=".70" strokeWidth="1.8" d="M895 618 H872 A12 12 0 0 1 860 606 V388.5"/>
          <line x1="860" y1="388.5" x2="740" y2="388.5" className="draw" pathLength={1} style={{ ['--d' as any]: '2.35s' }} stroke="url(#busLineFadeLeft)" strokeWidth="1.8"/>

          {/* Scientific Optical Pulses */}
          <g className="fade" style={{ ['--d' as any]: '2.60s' }}>
            <path className="pulse-stream" pathLength={1} stroke="url(#opticalPulseGrad)" strokeWidth="2.2" d="M895 154.5 H872 A12 12 0 0 0 860 166.5 V388.5 H740"/>
            <path className="pulse-stream-2" pathLength={1} stroke="url(#opticalPulseGrad)" strokeWidth="2.2" d="M895 154.5 H872 A12 12 0 0 0 860 166.5 V388.5 H740"/>
            <path className="pulse-stream" pathLength={1} stroke="url(#opticalPulseGrad)" strokeWidth="2.4" d="M895 388.5 H740"/>
            <path className="pulse-stream-2" pathLength={1} stroke="url(#opticalPulseGrad)" strokeWidth="2.4" d="M895 388.5 H740"/>
            <path className="pulse-stream" pathLength={1} stroke="url(#opticalPulseGrad)" strokeWidth="2.2" d="M895 618 H872 A12 12 0 0 1 860 606 V388.5 H740"/>
            <path className="pulse-stream-2" pathLength={1} stroke="url(#opticalPulseGrad)" strokeWidth="2.2" d="M895 618 H872 A12 12 0 0 1 860 606 V388.5 H740"/>
          </g>

          {/* Technical Pins */}
          <g className="fade" style={{ ['--d' as any]: '2.45s' }}>
            <circle cx="895" cy="154.5" r="3.2" fill="#2592b5" stroke="#ffffff" strokeWidth="1.2"/>
            <circle cx="895" cy="388.5" r="3.4" fill="#2592b5" stroke="#ffffff" strokeWidth="1.2"/>
            <circle cx="895" cy="618" r="3.2" fill="#2592b5" stroke="#ffffff" strokeWidth="1.2"/>
            <circle cx="860" cy="388.5" r="3.6" fill="#1b85a8" stroke="#ffffff" strokeWidth="1.2"/>
          </g>

          {/* Institutional Chevron Arrows */}
          <g className="fade" style={{ ['--d' as any]: '2.55s' }}>
            <g transform="translate(715, 388.5)">
              <path className="arrow-sync ar-1" stroke="#3f86ad" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" d="M 4 -8 L -4 0 L 4 8"/>
            </g>
            <g transform="translate(690, 388.5)">
              <path className="arrow-sync ar-2" stroke="#3f86ad" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" d="M 4 -8 L -4 0 L 4 8"/>
            </g>
            <g transform="translate(665, 388.5)">
              <path className="arrow-sync ar-3" stroke="#3f86ad" strokeWidth="2.0" strokeLinecap="round" strokeLinejoin="round" d="M 4 -8 L -4 0 L 4 8"/>
            </g>
          </g>
        </g>

        {/* MICROGRAPHS (original photos, exact centres and radii from HTML) */}
        {/* Micrograph 1: Dense C-S-H Gel Bonding (y=154.5) */}
        <g className="pop" style={{ ['--d' as any]: '2.05s' }}>
          <g transform="translate(1001.5,154.5)">
            <circle r="120" fill="#14c6ea" opacity=".13" filter="url(#blur8)"/>
            <circle r="111" fill="#ffffff" fillOpacity=".9" filter="url(#orbShadow)"/>
            <circle r="104.500" fill="#dff1f8"/>
            <g clipPath="url(#clip1)">
              <image href={MICROGRAPH_1_CSH_GEL} x="-99.500" y="-99.500" width="199" height="199" preserveAspectRatio="xMidYMid slice"/>
              <circle r="99.500" fill="url(#gloss)"/>
            </g>
            <circle r="107.500" fill="none" stroke="url(#steel)" strokeWidth="6"/>
            <circle r="107.500" fill="none" stroke="url(#ring)" strokeWidth="6" strokeLinecap="round" strokeDasharray="90 585">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6.5s" repeatCount="indefinite"/>
            </circle>
          </g>
        </g>

        {/* Micrograph 2: Polypropylene Micro-Fibers (y=388.5) */}
        <g className="pop" style={{ ['--d' as any]: '2.25s' }}>
          <g transform="translate(1003.5,388.5)">
            <circle r="114" fill="#14c6ea" opacity=".13" filter="url(#blur8)"/>
            <circle r="105.500" fill="#ffffff" fillOpacity=".9" filter="url(#orbShadow)"/>
            <circle r="99.500" fill="#dff1f8"/>
            <g clipPath="url(#clip2)">
              <image href={MICROGRAPH_2_PP_FIBERS} x="-93.500" y="-93.500" width="187" height="187" preserveAspectRatio="xMidYMid slice"/>
              <circle r="93.500" fill="url(#gloss)"/>
            </g>
            <circle r="102.500" fill="none" stroke="url(#steel)" strokeWidth="6"/>
            <circle r="102.500" fill="none" stroke="url(#ring)" strokeWidth="6" strokeLinecap="round" strokeDasharray="85 559">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6.5s" repeatCount="indefinite"/>
            </circle>
          </g>
        </g>

        {/* Micrograph 3: Surface-Coated EPS Beads (y=618) */}
        <g className="pop" style={{ ['--d' as any]: '2.45s' }}>
          <g transform="translate(1006.5,618)">
            <circle r="114" fill="#14c6ea" opacity=".13" filter="url(#blur8)"/>
            <circle r="105" fill="#ffffff" fillOpacity=".9" filter="url(#orbShadow)"/>
            <circle r="99" fill="#dff1f8"/>
            <g clipPath="url(#clip3)">
              <image href={MICROGRAPH_3_COATED_EPS} x="-93.500" y="-93.500" width="187" height="187" preserveAspectRatio="xMidYMid slice"/>
              <circle r="93.500" fill="url(#gloss)"/>
            </g>
            <circle r="102" fill="none" stroke="url(#steel)" strokeWidth="6"/>
            <circle r="102" fill="none" stroke="url(#ring)" strokeWidth="6" strokeLinecap="round" strokeDasharray="85 556">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6.5s" repeatCount="indefinite"/>
            </circle>
          </g>
        </g>

        {/* CAPTIONS */}
        <g className="fade" style={{ ['--d' as any]: '2.60s' }}>
          <rect x="1144" y="98" width="128" height="20" rx="4" fill="#14c6ea" fillOpacity=".12" stroke="#14c6ea" strokeOpacity=".4" strokeWidth="1"/>
          <text x="1150" y="112" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', fill: '#0788a5' }}>01 · ITZ BONDING</text>
          <text className="cp" style={{ fontSize: '20px', fontWeight: 700, fill: '#0c2a3b' }} x="1144" y="140">Dense C-S-H Gel</text>
          <text className="cp" style={{ fontSize: '17.5px', fontWeight: 500, fill: '#2b546a' }} x="1144" y="165">Bonding at the</text>
          <text className="cp" style={{ fontSize: '17.5px', fontWeight: 500, fill: '#2b546a' }} x="1144" y="190">Interfacial Transition</text>
          <text className="cp" style={{ fontSize: '17.5px', fontWeight: 500, fill: '#2b546a' }} x="1144" y="215">Zone (ITZ)</text>
        </g>

        <g className="fade" style={{ ['--d' as any]: '2.75s' }}>
          <rect x="1144" y="338" width="144" height="20" rx="4" fill="#14c6ea" fillOpacity=".12" stroke="#14c6ea" strokeOpacity=".4" strokeWidth="1"/>
          <text x="1150" y="352" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', fill: '#0788a5' }}>02 · FIBER BRIDGING</text>
          <text className="cp" style={{ fontSize: '20px', fontWeight: 700, fill: '#0c2a3b' }} x="1144" y="380">Polypropylene Fibers</text>
          <text className="cp" style={{ fontSize: '17.5px', fontWeight: 500, fill: '#2b546a' }} x="1144" y="405">Bridging Microcracks</text>
          <text className="cp" style={{ fontSize: '17.5px', fontWeight: 500, fill: '#2b546a' }} x="1144" y="430">&amp; Arresting Crack</text>
          <text className="cp" style={{ fontSize: '17.5px', fontWeight: 500, fill: '#2b546a' }} x="1144" y="455">Propagation</text>
        </g>

        <g className="fade" style={{ ['--d' as any]: '2.90s' }}>
          <rect x="1144" y="578" width="128" height="20" rx="4" fill="#14c6ea" fillOpacity=".12" stroke="#14c6ea" strokeOpacity=".4" strokeWidth="1"/>
          <text x="1150" y="592" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', fill: '#0788a5' }}>03 · EPS MATRIX</text>
          <text className="cp" style={{ fontSize: '20px', fontWeight: 700, fill: '#0c2a3b' }} x="1144" y="620">Surface-Coated EPS</text>
          <text className="cp" style={{ fontSize: '17.5px', fontWeight: 500, fill: '#2b546a' }} x="1144" y="645">Enhanced Matrix Adhesion</text>
          <text className="cp" style={{ fontSize: '17.5px', fontWeight: 500, fill: '#2b546a' }} x="1144" y="670">&amp; Interfacial Anchoring</text>
          <text className="cp" style={{ fontSize: '17.5px', fontWeight: 500, fill: '#2b546a' }} x="1144" y="695">Preventing Segregation</text>
        </g>
      </svg>
    </div>
  );
};
