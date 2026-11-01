import { useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/portfolio/Hero";
import { Nav, About, Mindset, Skills, Projects, Education, Learning, Contact, Footer, useReveal } from "@/components/portfolio/Sections";

function CursorRing() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0;
    const onMove = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      el.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", onMove); };
  }, []);
  return <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-6 w-6 rounded-full border border-crimson/60 md:block" />;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abhijeet Tailor — Building Today. Engineering Tomorrow." },
      { name: "description", content: "Portfolio of Abhijeet Tailor, first-year B.Tech CSE student at GITS Udaipur, featuring the TerraAlert IoT prototype." },
      { property: "og:title", content: "Abhijeet Tailor — Developer Portfolio" },
      { property: "og:description", content: "First-year CSE student at GITS Udaipur building practical tech projects like TerraAlert." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <div className="min-h-screen overflow-x-hidden">
      <CursorRing />
      <Nav />
      <main>
        <Hero />
        <About />
        <Mindset />
        <Skills />
        <Projects />
        <Education />
        <Learning />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
