// Edit your details here. Leave a URL empty ("") to show it as a placeholder instead of a link.
import portrait from "@/assets/abhijeet-portrait.webp.asset.json";

export const profile = {
  name: "Abhijeet Tailor",
  photo: portrait.url,
  photoAlt: "Portrait of Abhijeet Tailor",
  headline: ["Building Today.", "Engineering Tomorrow."],
  intro:
    "I’m an aspiring developer and technology enthusiast exploring programming, solving problems, and building meaningful real-world projects.",
  college: "Geetanjali Institute of Technical Studies (GITS)",
  location: "Udaipur, Rajasthan, India",
};

export const socials: { label: string; url: string }[] = [
  { label: "GitHub", url: "" }, // real GitHub profile URL still needed
  { label: "LinkedIn", url: "https://www.linkedin.com/in/abhijeet-tailor-23207b441" },
  { label: "Email", url: "mailto:tailorabhijeet11sp@gmail.com" },
];

export const terraAlert = { githubUrl: "", projectUrl: "" };

export type MoreProject = {
  title: string;
  tagline?: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  sourceUrl?: string;
};

// Add real projects here; the grid stays hidden while this list is empty.
export const moreProjects: MoreProject[] = [
  {
    title: "KAGE — Strategic Commerce",
    tagline: "Observe. Calculate. Choose.",
    description:
      "A minimalist, responsive e-commerce storefront built with HTML, CSS and JavaScript. Features include product search, category filtering, cart interactions and a value-based product recommendation system.",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://at8990515-art.github.io/kage-strategic-commerce/",
    sourceUrl: "https://github.com/at8990515-art/kage-strategic-commerce",
  },
];
