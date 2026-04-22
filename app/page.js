"use client";

import { useState } from "react";
/* ─────────────────────────────────────────
   GLOBAL STYLES — layout/colors/spacing
   UNCHANGED. Fonts swapped → Inter + Poppins
   Text content replaced with crypto content.
───────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #07011a;
    --bg2:       #0d0328;
    --surface:   rgba(255,255,255,0.04);
    --border:    rgba(255,255,255,0.08);
    --border-hi: rgba(168,85,247,0.35);
    --accent:    #7c3aed;
    --accent2:   #a855f7;
    --pink:      #d946ef;
    --fg:        #f2eeff;
    --muted:     #9480c4;
    --green:     #34d399;
    --red:       #f87171;
    --radius:    14px;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Inter', sans-serif;
    background: var(--bg);
    color: var(--fg);
    min-height: 100vh;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  body::before {
    content: '';
    position: fixed; inset: 0; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.025;
    pointer-events: none;
  }

  @keyframes float-y {
    0%,100% { transform: translateY(0px); }
    50%      { transform: translateY(-10px); }
  }
  @keyframes float-y2 {
    0%,100% { transform: translateY(0px) rotate(-2deg); }
    50%     { transform: translateY(-14px) rotate(2deg); }
  }
  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(168,85,247,0.4); }
    70%  { box-shadow: 0 0 0 10px rgba(168,85,247,0); }
    100% { box-shadow: 0 0 0 0 rgba(168,85,247,0); }
  }
  @keyframes pulse-green {
    0%   { box-shadow: 0 0 0 0 rgba(52,211,153,0.5); }
    70%  { box-shadow: 0 0 0 8px rgba(52,211,153,0); }
    100% { box-shadow: 0 0 0 0 rgba(52,211,153,0); }
  }
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes bar-grow {
    from { transform: scaleY(0); }
    to   { transform: scaleY(1); }
  }
  @keyframes draw-line {
    from { stroke-dashoffset: 300; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  /* ── NAV ── */
  .nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 52px; position: relative; z-index: 10;
    border-bottom: 1px solid var(--border);
    animation: fade-up 0.5s ease both;
  }
  .nav-logo { display: flex; align-items: center; gap: 10px; }
  .nav-logo-mark {
    width: 32px; height: 32px; border-radius: 9px;
    background: linear-gradient(135deg, #7c3aed 0%, #d946ef 100%);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Poppins', sans-serif;
    font-weight: 800; font-size: 14px; color: #fff;
    box-shadow: 0 0 20px rgba(124,58,237,0.5);
  }
  .nav-logo-text {
    font-family: 'Poppins', sans-serif;
    font-weight: 700; font-size: 15px; color: var(--fg);
    letter-spacing: -0.02em;
  }
  .nav-links { display: flex; gap: 6px; }
  .nav-link {
    background: none; border: none; color: var(--muted);
    font-size: 13.5px; font-weight: 400; cursor: pointer;
    font-family: 'Inter', sans-serif; padding: 6px 14px;
    border-radius: 8px; transition: color .15s, background .15s;
    display: flex; align-items: center; gap: 4px;
  }
  .nav-link:hover { color: var(--fg); background: rgba(255,255,255,0.05); }
  .nav-link svg { opacity: 0.5; }
  .nav-cta {
    background: linear-gradient(135deg, #7c3aed, #a855f7);
    color: #fff; border: none; border-radius: 9px;
    padding: 9px 20px; font-size: 13px; font-weight: 600;
    cursor: pointer; font-family: 'Inter', sans-serif;
    box-shadow: 0 4px 20px rgba(124,58,237,0.45);
    transition: box-shadow .2s, transform .15s;
  }
  .nav-cta:hover { box-shadow: 0 6px 28px rgba(168,85,247,0.6); transform: translateY(-1px); }

  /* ── HERO ── */
  .hero {
    display: flex; align-items: center; justify-content: space-between;
    padding: 64px 52px 56px; position: relative; z-index: 1;
    overflow: hidden; min-height: calc(100vh - 74px - 90px); gap: 32px;
  }
  .blob { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; }
  .blob-1 { width: 500px; height: 500px; background: rgba(124,58,237,0.22); top: -120px; right: 60px; }
  .blob-2 { width: 300px; height: 300px; background: rgba(217,70,239,0.14); bottom: -40px; right: 300px; }
  .blob-3 { width: 200px; height: 200px; background: rgba(124,58,237,0.1); top: 100px; left: -60px; }
  .grid-bg {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px);
    background-size: 52px 52px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%);
    pointer-events: none;
  }

  /* ── LEFT ── */
  .hero-left {
    max-width: 460px; position: relative; z-index: 2;
    display: flex; flex-direction: column;
    animation: fade-up 0.6s ease 0.1s both;
  }
  .badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(124,58,237,0.15); border: 1px solid rgba(124,58,237,0.35);
    border-radius: 20px; padding: 5px 14px; font-size: 11.5px; font-weight: 500;
    color: var(--accent2); width: fit-content; margin-bottom: 24px;
    animation: fade-up 0.5s ease 0.2s both; font-family: 'Inter', sans-serif;
  }
  .badge-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent2); animation: pulse-ring 2s ease infinite;
  }
  .hero-h1 {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(34px, 4.5vw, 56px); font-weight: 800;
    line-height: 1.08; letter-spacing: -0.03em; color: #fff;
    margin-bottom: 20px; animation: fade-up 0.6s ease 0.25s both;
  }
  .hero-h1 .gradient-word {
    background: linear-gradient(120deg, #a855f7 0%, #d946ef 60%, #f59e0b 100%);
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .hero-sub {
    font-size: 15px; line-height: 1.8; color: var(--muted); max-width: 380px;
    margin-bottom: 36px; animation: fade-up 0.6s ease 0.35s both;
    font-family: 'Inter', sans-serif; font-weight: 400;
  }
  .cta-row {
    display: flex; gap: 12px; align-items: center;
    animation: fade-up 0.6s ease 0.45s both;
  }
  .btn-primary {
    background: linear-gradient(135deg, #7c3aed, #a855f7); color: #fff;
    border: none; border-radius: 10px; padding: 13px 26px;
    font-size: 14px; font-weight: 600; cursor: pointer;
    font-family: 'Inter', sans-serif;
    box-shadow: 0 4px 24px rgba(124,58,237,0.45);
    transition: box-shadow .2s, transform .15s;
  }
  .btn-primary:hover { box-shadow: 0 6px 32px rgba(168,85,247,0.6); transform: translateY(-2px); }
  .btn-ghost {
    background: transparent; color: var(--fg);
    border: 1px solid var(--border); border-radius: 10px;
    padding: 13px 26px; font-size: 14px; font-weight: 500;
    cursor: pointer; font-family: 'Inter', sans-serif;
    display: flex; align-items: center; gap: 8px;
    transition: border-color .2s, background .2s, transform .15s;
  }
  .btn-ghost:hover { border-color: rgba(168,85,247,0.4); background: rgba(168,85,247,0.06); transform: translateY(-2px); }

  .stats-row {
    display: flex; gap: 28px; margin-top: 44px;
    animation: fade-up 0.6s ease 0.55s both;
    padding-top: 28px; border-top: 1px solid var(--border);
  }
  .stat-item { display: flex; flex-direction: column; gap: 2px; }
  .stat-num {
    font-family: 'Poppins', sans-serif;
    font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -0.04em;
  }
  .stat-label { font-size: 11.5px; color: var(--muted); font-weight: 400; font-family: 'Inter', sans-serif; }
  .stat-divider { width: 1px; background: var(--border); align-self: stretch; }

  /* ── RIGHT CARD ── */
  .hero-right {
    position: relative; z-index: 2; flex-shrink: 0;
    width: min(460px, 46%); animation: fade-up 0.7s ease 0.3s both;
  }
  .screen-wrap { position: relative; animation: float-y 5s ease-in-out infinite; }
  .screen-card {
    background: rgba(15,4,40,0.7); border: 1px solid rgba(168,85,247,0.2);
    border-radius: 20px; padding: 22px; backdrop-filter: blur(20px);
    box-shadow: 0 0 0 1px rgba(168,85,247,0.08),
                0 32px 80px rgba(0,0,0,0.5),
                inset 0 1px 0 rgba(255,255,255,0.08);
  }
  .screen-topbar { display: flex; align-items: center; gap: 6px; margin-bottom: 18px; }
  .screen-dot { width: 9px; height: 9px; border-radius: 50%; }
  .screen-title { margin-left: 8px; font-size: 11.5px; font-weight: 500; color: var(--muted); font-family: 'Inter', sans-serif; }
  .screen-live {
    margin-left: auto; background: rgba(52,211,153,0.15);
    border: 1px solid rgba(52,211,153,0.25); color: var(--green);
    font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 6px;
    display: flex; align-items: center; gap: 4px; font-family: 'Inter', sans-serif;
  }
  .live-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--green); animation: pulse-green 1.5s ease infinite; }

  .metric-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
  .metric-card { border-radius: 12px; padding: 14px 16px; position: relative; overflow: hidden; }
  .metric-purple {
    background: linear-gradient(140deg, rgba(124,58,237,0.45) 0%, rgba(168,85,247,0.2) 100%);
    border: 1px solid rgba(168,85,247,0.25);
  }
  .metric-pink {
    background: linear-gradient(140deg, rgba(217,70,239,0.3) 0%, rgba(168,85,247,0.15) 100%);
    border: 1px solid rgba(217,70,239,0.2);
  }
  .metric-dark { background: rgba(255,255,255,0.03); border: 1px solid var(--border); }
  .metric-label { font-size: 10px; color: rgba(255,255,255,0.45); font-weight: 500; margin-bottom: 5px; font-family: 'Inter', sans-serif; }
  .metric-value { font-family: 'Poppins', sans-serif; font-size: 20px; font-weight: 700; color: #fff; line-height: 1; }
  .metric-value span { font-size: 12px; font-weight: 400; color: var(--muted); margin-left: 2px; font-family: 'Inter', sans-serif; }
  .metric-change { font-size: 10.5px; font-weight: 600; margin-top: 5px; font-family: 'Inter', sans-serif; }
  .up   { color: var(--green); }
  .down { color: var(--red); }

  .mini-bars { display: flex; align-items: flex-end; gap: 3px; height: 26px; margin-top: 8px; }
  .mbar { flex: 1; border-radius: 2px 2px 0 0; background: rgba(255,255,255,0.12); transform-origin: bottom; animation: bar-grow 0.6s ease both; }
  .mbar.accent { background: var(--accent2); }

  .spark-card { border-radius: 12px; padding: 14px 16px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); margin-bottom: 10px; }
  .spark-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .spark-svg { width: 100%; height: 36px; display: block; }

  /* Buy/Sell card */
  .bs-card { border-radius: 12px; padding: 14px 16px; background: rgba(255,255,255,0.03); border: 1px solid var(--border); }
  .bs-tabs { display: flex; margin-bottom: 12px; border-radius: 8px; overflow: hidden; background: rgba(255,255,255,0.04); }
  .bs-tab { flex: 1; padding: 7px 0; font-size: 12px; font-weight: 600; border: none; cursor: pointer; font-family: 'Inter', sans-serif; transition: background .15s, color .15s; background: transparent; color: var(--muted); }
  .bs-tab.buy-active  { background: rgba(52,211,153,0.2);  color: var(--green); }
  .bs-tab.sell-active { background: rgba(248,113,113,0.2); color: var(--red); }
  .bs-pair-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .bs-price { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: #fff; }
  .bs-input-row {
    display: flex; align-items: center; background: rgba(255,255,255,0.05);
    border: 1px solid var(--border); border-radius: 8px; padding: 8px 12px; margin-bottom: 8px; gap: 8px;
  }
  .bs-input { background: none; border: none; outline: none; color: var(--fg); font-size: 13px; font-weight: 500; font-family: 'Inter', sans-serif; flex: 1; width: 0; }
  .bs-cur { font-size: 11px; font-weight: 600; color: var(--muted); font-family: 'Inter', sans-serif; }
  .bs-btn { width: 100%; padding: 9px; border: none; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; margin-top: 4px; transition: opacity .2s; }
  .bs-btn:hover { opacity: 0.85; }
  .bs-btn-buy  { background: linear-gradient(90deg, #059669, #34d399); color: #fff; }
  .bs-btn-sell { background: linear-gradient(90deg, #dc2626, #f87171); color: #fff; }

  /* floating badges */
  .float-badge {
    position: absolute; background: rgba(10,2,30,0.88); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px; padding: 9px 13px; font-size: 11px; font-weight: 600;
    backdrop-filter: blur(12px); display: flex; align-items: center; gap: 8px;
    white-space: nowrap; box-shadow: 0 8px 24px rgba(0,0,0,0.35); font-family: 'Inter', sans-serif;
  }
  .fb-icon { width: 22px; height: 22px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; flex-shrink: 0; }
  .fb-1 { top: -28px; right: 24px; color: var(--accent2); animation: float-y2 4s ease-in-out 0.5s infinite; }
  .fb-2 { bottom: -24px; left: 0; color: var(--green); animation: float-y2 4.5s ease-in-out 1s infinite; }
  .fb-3 { top: 42%; right: -48px; color: var(--pink); font-size: 10.5px; animation: float-y2 5s ease-in-out 0.2s infinite; flex-direction: column; align-items: flex-start; gap: 2px; }

  .ring-deco { position: absolute; width: 160px; height: 160px; border-radius: 50%; border: 1px dashed rgba(168,85,247,0.2); top: -50px; left: -50px; animation: spin-slow 20s linear infinite; pointer-events: none; }
  .ring-dot { position: absolute; top: 10px; left: 50%; width: 7px; height: 7px; border-radius: 50%; background: var(--accent2); box-shadow: 0 0 8px var(--accent2); transform: translateX(-50%); }

  /* ── P2P SECTION ── */
  .p2p-section { padding: 60px 52px; position: relative; z-index: 1; border-top: 1px solid var(--border); }
  .section-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(124,58,237,0.12); border: 1px solid rgba(124,58,237,0.28);
    border-radius: 20px; padding: 4px 14px; font-size: 11px; font-weight: 500;
    color: var(--accent2); margin-bottom: 14px; font-family: 'Inter', sans-serif;
  }
  .section-title { font-family: 'Poppins', sans-serif; font-size: clamp(22px,3vw,32px); font-weight: 700; color: #fff; margin-bottom: 8px; letter-spacing: -0.02em; }
  .section-sub { font-size: 14px; color: var(--muted); margin-bottom: 28px; font-family: 'Inter', sans-serif; }

  .p2p-table-head {
    display: grid; grid-template-columns: 2fr 1.5fr 1.2fr 1fr 1fr 90px;
    padding: 0 16px 10px; font-size: 10.5px; font-weight: 600; color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.06em; font-family: 'Inter', sans-serif;
    border-bottom: 1px solid var(--border); margin-bottom: 8px;
  }
  .p2p-row {
    display: grid; grid-template-columns: 2fr 1.5fr 1.2fr 1fr 1fr 90px;
    align-items: center; padding: 13px 16px; border-radius: 10px;
    background: rgba(255,255,255,0.02); border: 1px solid transparent;
    margin-bottom: 6px; transition: background .15s, border-color .15s; cursor: pointer;
  }
  .p2p-row:hover { background: rgba(168,85,247,0.07); border-color: rgba(168,85,247,0.15); }
  .p2p-trader { display: flex; align-items: center; gap: 10px; }
  .p2p-avatar { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #fff; flex-shrink: 0; }
  .p2p-name { font-size: 13px; font-weight: 600; color: var(--fg); font-family: 'Inter', sans-serif; }
  .p2p-orders { font-size: 10.5px; color: var(--muted); font-family: 'Inter', sans-serif; }
  .p2p-price-val { font-family: 'Poppins', sans-serif; font-size: 13.5px; font-weight: 700; }
  .p2p-price-cur { font-size: 10px; color: var(--muted); font-family: 'Inter', sans-serif; margin-top: 1px; }
  .p2p-limit { font-size: 12px; color: var(--fg); font-family: 'Inter', sans-serif; }
  .p2p-limit-sub { font-size: 10px; color: var(--muted); font-family: 'Inter', sans-serif; }
  .p2p-method { display: flex; flex-wrap: wrap; gap: 4px; }
  .p2p-pill { font-size: 9.5px; font-weight: 500; padding: 2px 7px; border-radius: 5px; background: rgba(168,85,247,0.12); border: 1px solid rgba(168,85,247,0.2); color: var(--accent2); font-family: 'Inter', sans-serif; white-space: nowrap; }
  .p2p-action { padding: 6px 16px; border: none; border-radius: 7px; font-size: 12px; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; transition: opacity .15s; }
  .p2p-action:hover { opacity: 0.82; }
  .p2p-buy  { background: rgba(52,211,153,0.18);  color: var(--green); border: 1px solid rgba(52,211,153,0.25); }
  .p2p-sell { background: rgba(248,113,113,0.18); color: var(--red);   border: 1px solid rgba(248,113,113,0.25); }

  /* ── BRAND STRIP ── */
  .brand-strip {
    position: relative; z-index: 5; background: rgba(255,255,255,0.02);
    border-top: 1px solid var(--border); display: flex; align-items: center;
    justify-content: center; padding: 0 52px;
    animation: fade-up 0.6s ease 0.7s both;
  }
  .brand-inner { display: flex; align-items: stretch; width: 100%; max-width: 820px; }
  .brand-cell {
    flex: 1; padding: 22px 16px; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 3px;
    border-right: 1px solid var(--border); transition: background .2s; cursor: default;
  }
  .brand-cell:last-child { border-right: none; }
  .brand-cell:hover { background: rgba(168,85,247,0.05); }
  .brand-cell-name { font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700; color: var(--fg); }
  .brand-cell-type { font-size: 10px; color: var(--muted); font-weight: 400; font-family: 'Inter', sans-serif; }

  /* ── MARQUEE ── */
  .marquee-strip { border-top: 1px solid var(--border); padding: 14px 0; overflow: hidden; position: relative; z-index: 5; }
  .marquee-track { display: flex; gap: 52px; white-space: nowrap; animation: marquee 22s linear infinite; }
  .marquee-item { display: flex; align-items: center; gap: 8px; flex-shrink: 0; color: rgba(255,255,255,0.3); font-size: 12px; font-weight: 500; font-family: 'Poppins', sans-serif; }
  .marquee-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--accent2); opacity: 0.5; }
`;

/* ── COIN ICONS ── */
const COIN_META = {
  BTC:  { bg: "#f7931a", symbol: "₿" },
  ETH:  { bg: "#627eea", symbol: "Ξ" },
  USDT: { bg: "#26a17b", symbol: "₮" },
  BNB:  { bg: "#f3ba2f", symbol: "B" },
  SOL:  { bg: "#9945ff", symbol: "◎" },
  XRP:  { bg: "#346aa9", symbol: "✕" },
};
const CoinIcon = ({ coin, size = 18 }) => {
  const c = COIN_META[coin] || { bg: "#7c3aed", symbol: coin[0] };
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", justifyContent:"center",
      width: size, height: size, borderRadius: "50%",
      background: c.bg, color: "#fff",
      fontSize: size * 0.52, fontWeight: 800, flexShrink: 0,
      fontFamily: "Inter, sans-serif", boxShadow: `0 2px 8px ${c.bg}55`,
    }}>{c.symbol}</span>
  );
};

/* ── CHEVRON ── */
const Chevron = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ── SPARKLINE ── */
const Sparkline = () => (
  <svg className="spark-svg" viewBox="0 0 220 36" fill="none">
    <defs>
      <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M0 30 L22 26 L44 28 L66 18 L88 20 L110 12 L132 14 L154 7 L176 9 L198 3 L220 5 L220 36 L0 36 Z" fill="url(#sg)" />
    <path d="M0 30 L22 26 L44 28 L66 18 L88 20 L110 12 L132 14 L154 7 L176 9 L198 3 L220 5"
      stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round"
      strokeDasharray="300" strokeDashoffset="0"
      style={{ animation: "draw-line 1.4s ease 0.8s both" }}
    />
    <circle cx="220" cy="5" r="3.5" fill="#a855f7" />
    <circle cx="220" cy="5" r="7" fill="#a855f7" opacity="0.18" />
  </svg>
);

/* ── MINI BARS ── */
const MiniBars = ({ heights, accentIdx }) => (
  <div className="mini-bars">
    {heights.map((h, i) => (
      <div key={i} className={`mbar${accentIdx.includes(i) ? " accent" : ""}`}
        style={{ height: `${h}%`, animationDelay: `${0.6 + i * 0.06}s` }} />
    ))}
  </div>
);

/* ── BUY / SELL CARD ── */
const PRICES  = { BTC: 67842.30, ETH: 3481.20, USDT: 1.00 };
const CHANGES = { BTC: "+2.34%", ETH: "+1.87%", USDT: "+0.01%" };

function BuySellCard() {
  const [tab, setTab]     = useState("buy");
  const [coin, setCoin]   = useState("BTC");
  const [amount, setAmount] = useState("0.05");
  const price  = PRICES[coin];
  const total  = (parseFloat(amount || 0) * price).toLocaleString("en-US", { maximumFractionDigits: 2 });
  const isUp   = !CHANGES[coin].startsWith("-");

  return (
    <div className="bs-card">
      {/* coin selector */}
      <div className="bs-pair-row">
        <div style={{ display:"flex", gap:6 }}>
          {["BTC","ETH","USDT"].map(c => (
            <button key={c} onClick={() => setCoin(c)} style={{
              display:"flex", alignItems:"center", gap:5,
              background: coin===c ? "rgba(168,85,247,0.18)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${coin===c ? "rgba(168,85,247,0.35)" : "rgba(255,255,255,0.08)"}`,
              borderRadius:7, padding:"4px 9px", cursor:"pointer",
              color: coin===c ? "#f2eeff" : "#9480c4",
              fontSize:11, fontWeight:600, fontFamily:"Inter,sans-serif", transition:"all .15s",
            }}>
              <CoinIcon coin={c} size={13} /> {c}
            </button>
          ))}
        </div>
        <div style={{ textAlign:"right" }}>
          <div className="bs-price">${price.toLocaleString()}</div>
          <div style={{ fontSize:10, color: isUp?"#34d399":"#f87171", fontFamily:"Inter,sans-serif", fontWeight:600 }}>
            {CHANGES[coin]}
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="bs-tabs">
        <button className={`bs-tab${tab==="buy"?" buy-active":""}`} onClick={()=>setTab("buy")}>Buy</button>
        <button className={`bs-tab${tab==="sell"?" sell-active":""}`} onClick={()=>setTab("sell")}>Sell</button>
      </div>

      {/* amount */}
      <div className="bs-input-row">
        <CoinIcon coin={coin} size={15} />
        <input className="bs-input" value={amount}
          onChange={e => setAmount(e.target.value)} placeholder="0.00" />
        <span className="bs-cur">{coin}</span>
      </div>

      {/* total */}
      <div className="bs-input-row" style={{ marginBottom:10 }}>
        <span style={{ fontSize:11, color:"#9480c4", fontFamily:"Inter,sans-serif" }}>≈</span>
        <span style={{ fontSize:13, color:"#f2eeff", fontFamily:"Poppins,sans-serif", fontWeight:600, flex:1 }}>
          ${total}
        </span>
        <span className="bs-cur">USD</span>
      </div>

      <button className={`bs-btn${tab==="buy"?" bs-btn-buy":" bs-btn-sell"}`}>
        {tab==="buy" ? `Buy ${coin}` : `Sell ${coin}`}
      </button>
    </div>
  );
}

/* ── DASHBOARD CARD ── */
function DashCard() {
  return (
    <div className="hero-right">
      <div className="screen-wrap">
        <div className="ring-deco"><div className="ring-dot" /></div>

        <div className="float-badge fb-1">
          <div className="fb-icon" style={{ background:"rgba(247,147,26,0.2)", color:"#f7931a" }}>₿</div>
          BTC +2.34% today
        </div>
        <div className="float-badge fb-2">
          <div className="fb-icon" style={{ background:"rgba(52,211,153,0.18)", color:"#34d399" }}>✓</div>
          Escrow protected
        </div>
        <div className="float-badge fb-3">
          <div className="fb-icon" style={{ background:"rgba(217,70,239,0.18)", color:"#d946ef" }}>⚡</div>
          <div>
            <div>Instant swap</div>
            <div style={{ fontSize:9, color:"#9480c4", fontWeight:400 }}>Zero slippage</div>
          </div>
        </div>

        <div className="screen-card">
          <div className="screen-topbar">
            <div className="screen-dot" style={{ background:"#f87171" }} />
            <div className="screen-dot" style={{ background:"#fbbf24" }} />
            <div className="screen-dot" style={{ background:"#34d399" }} />
            <span className="screen-title">NexX Exchange</span>
            <div className="screen-live"><div className="live-dot" />Live</div>
          </div>

          <div className="metric-grid">
            <div className="metric-card metric-purple">
              <div className="metric-label">BTC / USDT</div>
              <div className="metric-value">$67,842</div>
              <div className="metric-change up">↑ 2.34% (24h)</div>
              <MiniBars heights={[40,55,48,80,70,100]} accentIdx={[3,5]} />
            </div>
            <div className="metric-card metric-pink">
              <div className="metric-label">ETH / USDT</div>
              <div className="metric-value">$3,481</div>
              <div className="metric-change up">↑ 1.87% (24h)</div>
              <MiniBars heights={[50,75,60,85,100,90]} accentIdx={[1,4]} />
            </div>
            <div className="metric-card metric-dark">
              <div className="metric-label">24h Volume</div>
              <div className="metric-value">$2.1<span>B</span></div>
              <div className="metric-change up">↑ Record high</div>
            </div>
            <div className="metric-card metric-dark">
              <div className="metric-label">Trading Fee</div>
              <div className="metric-value">0.1<span>%</span></div>
              <div className="metric-change up">↓ Lowest rate</div>
            </div>
          </div>

          <div className="spark-card">
            <div className="spark-header">
              <span style={{ fontSize:10.5, color:"rgba(255,255,255,0.4)", fontWeight:500, fontFamily:"Inter,sans-serif" }}>
                BTC Price Chart
              </span>
              <span style={{ fontSize:10, color:"#a855f7", fontWeight:600, fontFamily:"Inter,sans-serif" }}>7D</span>
            </div>
            <Sparkline />
          </div>

          <BuySellCard />
        </div>
      </div>
    </div>
  );
}

/* ── NAVBAR ── */
function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <div className="nav-logo-mark">N</div>
        <span className="nav-logo-text">NexX</span>
      </div>
      <div className="nav-links">
        {["Markets","Exchange","P2P"].map(l => (
          <button key={l} className="nav-link">{l}</button>
        ))}
        <button className="nav-link">More <Chevron /></button>
      </div>
      <button className="nav-cta">Connect Wallet</button>
    </nav>
  );
}

/* ── HERO ── */
function HeroSection() {
  return (
    <section className="hero">
      <div className="blob blob-1" /><div className="blob blob-2" /><div className="blob blob-3" />
      <div className="grid-bg" />

      <div className="hero-left">
        <div className="badge">
          <div className="badge-dot" />
          Exchange &amp; P2P in One Platform
        </div>

        <h1 className="hero-h1">
          Trade Crypto<br />
          <span className="gradient-word">with Confidence.</span>
        </h1>

        <p className="hero-sub">
          Buy, sell, and trade cryptocurrencies securely with low fees
          and lightning-fast transactions. Spot, Futures &amp; P2P — all in one place.
        </p>

        <div className="cta-row">
          <button className="btn-primary">Start Trading</button>
          <button className="btn-ghost">Try P2P</button>
        </div>

        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-num">1M+</span>
            <span className="stat-label">Active Users</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-num">100+</span>
            <span className="stat-label">Coins Listed</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-num">$2B+</span>
            <span className="stat-label">Daily Volume</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-num">99.9%</span>
            <span className="stat-label">Uptime</span>
          </div>
        </div>
      </div>

      <DashCard />
    </section>
  );
}

/* ── P2P SECTION ── */
const P2P_LISTINGS = [
  { name:"CryptoKing", orders:"1,240 orders", rate:"99.8%", price:"67,910.00", coin:"BTC", min:"₹5,000",  max:"₹5,00,000", methods:["UPI","Bank"],  type:"buy",  avatar:"#7c3aed" },
  { name:"SatoshiPro",  orders:"876 orders",  rate:"98.5%", price:"67,895.50", coin:"BTC", min:"₹2,000",  max:"₹2,00,000", methods:["UPI","IMPS"],  type:"buy",  avatar:"#d946ef" },
  { name:"HodlMaster",  orders:"2,100 orders",rate:"99.9%", price:"3,485.00",  coin:"ETH", min:"₹1,000",  max:"₹1,00,000", methods:["Bank","NEFT"], type:"sell", avatar:"#059669" },
  { name:"P2PWhale",    orders:"445 orders",  rate:"97.2%", price:"1.001",     coin:"USDT",min:"₹500",    max:"₹50,000",   methods:["UPI"],         type:"sell", avatar:"#f59e0b" },
];

function P2PSection() {
  const [mode, setMode] = useState("buy");
  const rows = P2P_LISTINGS.filter(l => l.type === mode);

  return (
    <section className="p2p-section">
      <div className="section-badge">P2P Trading</div>
      <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:20 }}>
        <div>
          <div className="section-title">Buy &amp; Sell Directly</div>
          <div className="section-sub">Trade peer-to-peer with escrow protection and multiple payment options.</div>
        </div>
        <div style={{ display:"flex", gap:6, marginBottom:4 }}>
          {["buy","sell"].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              padding:"7px 20px",
              border:`1px solid ${mode===m ? (m==="buy"?"rgba(52,211,153,0.4)":"rgba(248,113,113,0.4)") : "rgba(255,255,255,0.08)"}`,
              borderRadius:8,
              background: mode===m ? (m==="buy"?"rgba(52,211,153,0.15)":"rgba(248,113,113,0.15)") : "transparent",
              color: mode===m ? (m==="buy"?"#34d399":"#f87171") : "#9480c4",
              fontSize:12, fontWeight:600, cursor:"pointer",
              fontFamily:"Inter,sans-serif", textTransform:"capitalize", transition:"all .15s",
            }}>{m==="buy"?"Buy Crypto":"Sell Crypto"}</button>
          ))}
        </div>
      </div>

      <div className="p2p-table-head">
        <span>Advertiser</span><span>Price</span><span>Limit</span>
        <span>Payment</span><span>Coin</span><span />
      </div>

      {rows.map((l,i) => (
        <div key={i} className="p2p-row">
          <div className="p2p-trader">
            <div className="p2p-avatar" style={{ background:l.avatar }}>{l.name[0]}</div>
            <div>
              <div className="p2p-name">{l.name}</div>
              <div className="p2p-orders">{l.orders} · {l.rate} completion</div>
            </div>
          </div>
          <div>
            <div className="p2p-price-val" style={{ color: l.type==="buy"?"#34d399":"#f87171" }}>${l.price}</div>
            <div className="p2p-price-cur">{l.coin} / USD</div>
          </div>
          <div>
            <div className="p2p-limit">{l.min} – {l.max}</div>
            <div className="p2p-limit-sub">Available range</div>
          </div>
          <div className="p2p-method">
            {l.methods.map(m => <span key={m} className="p2p-pill">{m}</span>)}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <CoinIcon coin={l.coin} size={16} />
            <span style={{ fontSize:12, fontWeight:600, color:"#f2eeff", fontFamily:"Inter,sans-serif" }}>{l.coin}</span>
          </div>
          <button className={`p2p-action p2p-${l.type}`}>
            {l.type==="buy"?"Buy":"Sell"} {l.coin}
          </button>
        </div>
      ))}
    </section>
  );
}

/* ── BRAND STRIP ── */
const BRANDS = [
  { name:"Coinbase",   type:"Exchange Partner" },
  { name:"Binance",    type:"Liquidity Partner" },
  { name:"Ledger",     type:"Security Partner" },
  { name:"Chainlink",  type:"Oracle Partner" },
  { name:"Fireblocks", type:"Custody Partner" },
];

function BrandStrip() {
  return (
    <div className="brand-strip">
      <div className="brand-inner">
        {BRANDS.map(b => (
          <div key={b.name} className="brand-cell">
            <span className="brand-cell-name">{b.name}</span>
            <span className="brand-cell-type">{b.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── MARQUEE ── */
const MARQUEE_ITEMS = [
  "Spot Trading","Futures & Derivatives","P2P Marketplace","Multi-Chain Support",
  "Fiat On-Ramp","Escrow Protection","Low Trading Fees","24/7 Support","Advanced Charting",
  "Spot Trading","Futures & Derivatives","P2P Marketplace","Multi-Chain Support",
  "Fiat On-Ramp","Escrow Protection","Low Trading Fees","24/7 Support","Advanced Charting",
];

function MarqueeStrip() {
  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {MARQUEE_ITEMS.map((item,i) => (
          <div key={i} className="marquee-item">
            <div className="marquee-dot" />{item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── ROOT ── */
export default function App() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <Navbar />
      <HeroSection />
      <P2PSection />
      <BrandStrip />
      <MarqueeStrip />
    </>
  );
}

