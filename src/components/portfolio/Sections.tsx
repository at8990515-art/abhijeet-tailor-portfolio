import { useEffect, useRef, type ReactNode } from "react";
import { Code2, Puzzle, GitBranch, Palette, Film, Github, Linkedin, Mail, ArrowUpRight, GraduationCap, BookOpen, Cpu, Mountain, Eye, Compass, ShieldCheck, TrendingUp } from "lucide-react";
import { profile, socials, terraAlert, moreProjects } from "@/data/profile";

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("is-in"), io.unobserve(e.target))), { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        ref.current.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      }}
      onPointerLeave={() => ref.current && (ref.current.style.transform = "")}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-emerald">{children}</p>;
}

export function Nav() {
  const links = ["Home", "About", "Skills", "Mindset", "Projects", "Education", "Contact"];
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav aria-label="Main" className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3">
        <a href="#home" className="font-display text-lg font-bold">A<span className="text-gradient">T</span>.</a>
        <ul className="flex gap-1 overflow-x-auto text-sm text-muted-foreground">
          {links.map((l) => (
            <li key={l} className={["Home", "Mindset", "Education"].includes(l) ? "max-sm:hidden" : ""}>
              <a href={`#${l.toLowerCase()}`} className="rounded-full px-3 py-1.5 transition-colors hover:text-foreground">{l}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <div className="grid items-center gap-14 md:grid-cols-[0.8fr_1.2fr]">
        <div className="reveal relative mx-auto w-64 md:w-full md:max-w-sm">
          <div aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-cyan/10 blur-3xl" />
          <div className="glass glow-border relative rotate-[-3deg] overflow-hidden rounded-[2rem] p-2">
            <img src={profile.photo} alt={profile.photoAlt} loading="lazy" width={720} height={720} className="aspect-[4/5] w-full rounded-[1.6rem] object-cover object-[50%_25%]" />
          </div>
          <div className="glass absolute -bottom-5 -right-4 rounded-2xl px-4 py-3 text-xs">
            <span className="text-muted-foreground">Currently</span>
            <p className="font-semibold">1st-year CSE</p>
          </div>
        </div>
        <div className="reveal">
          <Eyebrow>About me</Eyebrow>
          <h2 className="text-4xl font-bold sm:text-6xl">Beyond the <span className="text-gradient">Code.</span></h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            I’m a first-year Computer Science and Engineering student at {profile.college}, {profile.location}. I’m interested in software development, emerging technology and problem-solving — and I enjoy turning ideas into practical projects.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            I try to stay calm, curious and focused on improving a little every day, one concept and one project at a time.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Ambitious", "Calm", "Creative", "Curious", "Always improving"].map((t) => (
              <span key={t} className="glass rounded-full px-4 py-1.5 text-sm">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const skills = [
  { icon: Code2, name: "C Programming", level: "Beginner / Learning" },
  { icon: Puzzle, name: "Problem-solving", level: "Developing" },
  { icon: GitBranch, name: "Git & GitHub", level: "Learning" },
  { icon: Palette, name: "Canva & Presentation Design", level: "Comfortable" },
  { icon: Film, name: "Video Editing", level: "Comfortable" },
];

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <div className="reveal max-w-2xl">
        <Eyebrow>Skills</Eyebrow>
        <h2 className="text-4xl font-bold sm:text-5xl">What I’m <span className="text-gradient">working with.</span></h2>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map(({ icon: Icon, name, level }, i) => (
          <Tilt key={name} className="reveal">
            <div className="glass glow-border group h-full rounded-3xl p-7" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald/10 text-emerald transition-shadow group-hover:shadow-[var(--glow-emerald)]">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{name}</h3>
              <p className="mt-2 text-sm text-cyan">{level}</p>
            </div>
          </Tilt>
        ))}
      </div>
    </section>
  );
}

const principles = [
  { icon: Eye, t: "Observe before acting", d: "Understand the problem fully before writing a single line of code." },
  { icon: Compass, t: "Think strategically", d: "Choose the simple path that serves the long-term goal." },
  { icon: ShieldCheck, t: "Stay disciplined", d: "Small, consistent effort beats occasional bursts of motivation." },
  { icon: TrendingUp, t: "Improve every day", d: "Learn one new thing, then apply it in a real build." },
];

export function Mindset() {
  return (
    <section id="mindset" className="mx-auto max-w-6xl px-6 py-28">
      <div className="reveal max-w-2xl">
        <Eyebrow>Mindset</Eyebrow>
        <h2 className="text-4xl font-bold sm:text-5xl">Quiet <span className="text-gradient">principles.</span></h2>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map(({ icon: Icon, t, d }, i) => (
          <div key={t} className="reveal glass group relative overflow-hidden rounded-3xl p-7" style={{ transitionDelay: `${i * 60}ms` }}>
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <Icon className="h-6 w-6 text-crimson transition-transform duration-500 group-hover:-translate-y-0.5" aria-hidden />
            <h3 className="mt-5 text-lg font-semibold">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MountainScene() {
  const stations = [
    { l: "22%", t: "52%" }, { l: "48%", t: "30%" }, { l: "72%", t: "48%" },
  ];
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--cyan)_14%,transparent),transparent_70%)]" aria-hidden>
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="m1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#20F5A6" stopOpacity=".35" /><stop offset="1" stopColor="#050B14" stopOpacity="0" /></linearGradient>
          <linearGradient id="m2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#00D9FF" stopOpacity=".3" /><stop offset="1" stopColor="#050B14" stopOpacity="0" /></linearGradient>
        </defs>
        <path d="M0 230 L70 150 L120 190 L200 80 L270 170 L320 130 L400 210 L400 300 L0 300Z" fill="url(#m2)" stroke="#00D9FF" strokeOpacity=".4" />
        <path d="M0 260 L90 180 L150 220 L230 140 L300 210 L360 180 L400 240 L400 300 L0 300Z" fill="url(#m1)" stroke="#20F5A6" strokeOpacity=".5" />
        {[0, 1, 2, 3].map((i) => <path key={i} d={`M0 ${270 + i * 8} Q200 ${250 + i * 8} 400 ${268 + i * 8}`} stroke="#20F5A6" strokeOpacity={0.15} fill="none" />)}
      </svg>
      {stations.map((s, i) => (
        <div key={i} className="absolute" style={{ left: s.l, top: s.t }}>
          <span className="animate-pulse-ring absolute -left-3 -top-3 h-6 w-6 rounded-full border border-cyan" style={{ animationDelay: `${i * 0.8}s` }} />
          <div className="relative flex flex-col items-center">
            <div className="h-1.5 w-5 -skew-x-12 rounded-sm bg-cyan/80" />
            <div className="h-6 w-0.5 bg-foreground/70" />
            <div className="h-2 w-2 rounded-full bg-emerald shadow-[var(--glow-emerald)]" />
          </div>
        </div>
      ))}
    </div>
  );
}

function LinkOrPlaceholder({ url, children, primary }: { url: string; children: ReactNode; primary?: boolean }) {
  const cls = `inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${primary ? "btn-brand" : "glass glow-border hover:text-crimson"}`;
  if (url) return <a href={url} target="_blank" rel="noreferrer" className={cls}>{children}</a>;
  return <span className={`${cls} cursor-not-allowed opacity-60`} title="Link coming soon" aria-disabled="true">{children} <em className="text-[10px] not-italic opacity-80">(soon)</em></span>;
}

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <div className="reveal max-w-2xl">
        <Eyebrow>Featured project</Eyebrow>
        <h2 className="text-4xl font-bold sm:text-5xl">Terra<span className="text-gradient">Alert</span></h2>
      </div>
      <div className="reveal glass glow-border mt-12 grid gap-10 rounded-[2rem] p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <Tilt><MountainScene /></Tilt>
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan/40 px-3 py-1 text-xs text-cyan"><Mountain className="h-3.5 w-3.5" aria-hidden /> Prototype</span>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            An AI and IoT-based landslide and slope-failure early-warning prototype using an ESP32, soil-moisture sensing, rain sensing and tilt measurement — explored with a solar-powered sensor-station concept.
          </p>
          <p className="mt-4 text-sm text-muted-foreground/80">
            Note: TerraAlert is a learning prototype. It is not a deployed or scientifically validated warning system.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["ESP32", "IoT", "Sensors", "Early Warning", "Prototype"].map((t) => (
              <span key={t} className="rounded-full bg-emerald/10 px-3 py-1 text-xs font-medium text-emerald">{t}</span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkOrPlaceholder url={terraAlert.githubUrl}><Github className="h-4 w-4" aria-hidden /> View on GitHub</LinkOrPlaceholder>
            <LinkOrPlaceholder url={terraAlert.projectUrl} primary>Explore Project <ArrowUpRight className="h-4 w-4" aria-hidden /></LinkOrPlaceholder>
          </div>
        </div>
      </div>
      {moreProjects.length > 0 && (
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {moreProjects.map((p) => (
            <Tilt key={p.title} className="reveal">
              <div className="glass glow-border flex h-full flex-col rounded-3xl p-7">
                {p.tagline && (
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan">{p.tagline}</p>
                )}
                <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
                <p className="mt-3 text-muted-foreground">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className="text-xs text-cyan">#{t}</span>)}</div>
                {p.liveUrl && (
                  <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-brand inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                    >
                      Live Demo <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </a>
                    {p.sourceUrl && (
                      <a
                        href={p.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="glass glow-border inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors hover:text-crimson"
                      >
                        <Github className="h-4 w-4" aria-hidden /> View Source Code
                      </a>
                    )}
                  </div>
                )}
                <p className="mt-4 text-xs text-muted-foreground/70">
                  Front-end demo — no real checkout or live inventory.
                </p>
              </div>
            </Tilt>
          ))}
        </div>
      )}
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-6 py-28">
      <div className="reveal"><Eyebrow>Education</Eyebrow><h2 className="text-4xl font-bold sm:text-5xl">Where I’m <span className="text-gradient">learning.</span></h2></div>
      <div className="reveal glass glow-border relative mt-12 overflow-hidden rounded-[2rem] p-8 sm:p-12">
        <GraduationCap aria-hidden className="absolute -right-6 -top-6 h-48 w-48 rotate-12 text-cyan/10" />
        <div className="flex items-start gap-5 border-l border-emerald/40 pl-6">
          <span className="-ml-[31px] mt-2 h-3 w-3 shrink-0 rounded-full bg-emerald shadow-[var(--glow-emerald)]" />
          <div>
            <p className="text-sm text-cyan">Currently pursuing · First year</p>
            <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">B.Tech, Computer Science & Engineering</h3>
            <p className="mt-2 text-muted-foreground">{profile.college}, {profile.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Learning() {
  const items = [
    { icon: Code2, t: "Programming fundamentals", d: "Variables, loops, functions and memory — building a strong base in C." },
    { icon: Puzzle, t: "Problem-solving", d: "Practising logic and breaking problems into small, clear steps." },
    { icon: Cpu, t: "Hardware & IoT", d: "Experimenting with microcontrollers and sensors through hands-on builds." },
    { icon: BookOpen, t: "The journey", d: "Learning version control, reading code and shipping small projects." },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <div className="reveal max-w-2xl"><Eyebrow>Currently learning</Eyebrow><h2 className="text-4xl font-bold sm:text-5xl">One step <span className="text-gradient">at a time.</span></h2></div>
      <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
        {items.map(({ icon: Icon, t, d }) => (
          <div key={t} className="reveal bg-background p-8 transition-colors hover:bg-card">
            <Icon className="h-6 w-6 text-cyan" aria-hidden />
            <h3 className="mt-5 text-lg font-semibold">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-32">
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald/10 blur-[140px]" />
      <div className="reveal relative mx-auto max-w-4xl text-center">
        <Eyebrow>Contact</Eyebrow>
        <h2 className="text-4xl font-bold leading-tight sm:text-6xl">Have an idea? <span className="text-gradient">Let’s build something meaningful.</span></h2>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {socials.map((s) => {
            const Icon = { GitHub: Github, LinkedIn: Linkedin, Email: Mail }[s.label];
            return (
              <LinkOrPlaceholder key={s.label} url={s.url} primary={s.label === "Email"}>
                {Icon && <Icon className="h-4 w-4" aria-hidden />}
                {s.label}
              </LinkOrPlaceholder>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <nav aria-label="Footer" className="flex gap-5">
          {["About", "Skills", "Projects", "Contact"].map((l) => <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-foreground">{l}</a>)}
        </nav>
      </div>
    </footer>
  );
}
