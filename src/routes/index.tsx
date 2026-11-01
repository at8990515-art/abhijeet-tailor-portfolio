import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/portfolio/Hero";
import { Nav, About, Skills, Projects, Education, Learning, Contact, Footer, useReveal } from "@/components/portfolio/Sections";

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
      <Nav />
      <main>
        <Hero />
        <About />
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
