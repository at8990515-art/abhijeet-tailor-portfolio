import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

function useParticles(ref: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 768;
    const n = mobile ? 35 : 90;
    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const resize = () => {
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const pts = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.15, vy: -Math.random() * 0.25 - 0.05, hue: Math.random() > 0.5,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.hue ? "rgba(32,245,166,0.55)" : "rgba(0,217,255,0.55)";
        ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [ref]);
}

export function Hero() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const [imgOk, setImgOk] = useState(true);
  useParticles(canvas);

  useEffect(() => {
    const el = scene.current;
    if (!el || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        el.style.setProperty("--px", x.toFixed(3));
        el.style.setProperty("--py", y.toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const layer = (depth: number) => ({
    transform: `translate3d(calc(var(--px,0) * ${depth}px), calc(var(--py,0) * ${depth}px), 0)`,
    transition: "transform .4s ease-out",
  });

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-emerald/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[38rem] w-[38rem] rounded-full bg-cyan/10 blur-[140px]" />
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
      </div>

      <div ref={scene} className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 lg:gap-14 px-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative z-10 order-2 min-w-0 text-center lg:order-1 lg:text-left">
          <span className="glass animate-rise inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald shadow-[var(--glow-emerald)]" />
            GITS Udaipur · B.Tech CSE
          </span>
          <p className="animate-rise mt-6 text-lg text-muted-foreground" style={{ animationDelay: ".1s" }}>
            Hi, I’m <span className="font-semibold text-foreground">{profile.name}</span>
          </p>
          <h1 className="mt-3 text-[2.4rem] font-extrabold leading-[0.95] sm:text-6xl xl:text-7xl">
            <span className="animate-rise block" style={{ animationDelay: ".2s" }}>{profile.headline[0]}</span>
            <span className="text-gradient animate-rise block" style={{ animationDelay: ".35s" }}>{profile.headline[1]}</span>
          </h1>
          <p className="animate-rise mt-5 flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-muted-foreground lg:justify-start" style={{ animationDelay: ".42s" }}>
            <span aria-hidden className="h-px w-8 bg-crimson/70" />
            Observe · Strategize · Execute
            <span aria-hidden className="h-px w-8 bg-crimson/70" />
          </p>
          <p className="animate-rise mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground lg:mx-0 sm:text-lg" style={{ animationDelay: ".5s" }}>
            {profile.intro}
          </p>
          <div className="animate-rise mt-9 flex flex-wrap justify-center gap-4 lg:justify-start" style={{ animationDelay: ".65s" }}>
            <a href="#projects" className="btn-brand rounded-full px-7 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5">Explore My Work</a>
            <a href="#contact" className="glass glow-border rounded-full px-7 py-3.5 text-sm font-semibold transition-colors hover:text-cyan">Let’s Connect</a>
          </div>
        </div>

        {/* 3D scene + portrait */}
        <div className="relative order-1 mx-auto aspect-square w-[min(78vw,30rem)] lg:order-2" style={{ perspective: "1200px" }}>
          <div aria-hidden className="absolute inset-0" style={layer(-30)}>
            <div className="animate-spin-slow absolute inset-0 rounded-full border border-emerald/25" style={{ transform: "rotateX(70deg)" }} />
            <div className="absolute inset-[-8%] rounded-full border border-cyan/20 max-md:hidden" style={{ transform: "rotateX(70deg) rotateY(20deg)" }} />
            <div className="absolute inset-[6%] rounded-full border border-dashed border-cyan/20 max-md:hidden" style={{ transform: "rotateY(72deg)" }} />
          </div>
          <div aria-hidden className="absolute inset-0 max-md:hidden" style={layer(35)}>
            <div className="animate-spin-slow absolute inset-[-4%]" style={{ animationDuration: "55s" }}>
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.1" className="animate-spin-slow absolute left-[2%] top-[44%] h-16 w-16 text-cyan/50" style={{ animationDuration: "90s", animationDirection: "reverse" }}>
                <path d="M50 4 L92 50 L50 96 L8 50 Z" />
                <path d="M50 4 V96 M8 50 H92" opacity=".7" />
                <circle cx="50" cy="50" r="2" fill="currentColor" stroke="none" />
              </svg>
              <span className="absolute bottom-[4%] right-[18%] h-1.5 w-1.5 rounded-full bg-crimson/80" />
            </div>
          </div>
          <div aria-hidden className="absolute inset-0 max-md:hidden" style={layer(55)}>
            <div className="glass animate-float absolute left-[2%] top-[14%] h-14 w-14 rotate-12 rounded-2xl" />
            <div className="animate-float absolute right-[4%] top-[6%] h-6 w-6 rounded-full bg-emerald/70 shadow-[var(--glow-emerald)]" style={{ animationDelay: "-2s" }} />
            <div className="glass animate-float absolute bottom-[8%] right-[10%] h-20 w-20 rounded-full" style={{ animationDelay: "-4s" }} />
            <div className="animate-float absolute bottom-[18%] left-[6%] h-3 w-3 rounded-full bg-cyan shadow-[var(--glow-cyan)]" style={{ animationDelay: "-1s" }} />
          </div>

          <div className="absolute inset-[16%]" style={layer(18)}>
            <div className="animate-float relative h-full w-full">
              <div aria-hidden className="absolute -inset-3 rounded-full opacity-80 blur-xl md:blur-2xl" style={{ background: "var(--gradient-brand)" }} />
              <div className="relative h-full w-full rounded-full p-[3px]" style={{ background: "var(--gradient-brand)" }}>
                <div className="relative h-full w-full overflow-hidden rounded-full bg-card">
                  {imgOk ? (
                    <img
                      src={profile.photo}
                      alt={profile.photoAlt}
                      width={720}
                      height={720}
                      fetchPriority="high"
                      onError={() => setImgOk(false)}
                      className="h-full w-full object-cover object-[50%_30%]"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center font-display text-5xl text-gradient">AT</div>
                  )}
                  <div aria-hidden className="pointer-events-none absolute inset-0 rounded-full" style={{ background: "linear-gradient(160deg, oklch(1 0 0 / 14%), transparent 35%, transparent 70%, color-mix(in oklab, var(--cyan) 18%, transparent))" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" aria-label="Scroll to About" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-[0.3em] text-muted-foreground sm:flex">
        <span className="flex h-10 w-6 justify-center rounded-full border border-border pt-2">
          <span className="animate-scroll-dot h-2 w-1 rounded-full bg-emerald" />
        </span>
        SCROLL
      </a>
    </section>
  );
}
