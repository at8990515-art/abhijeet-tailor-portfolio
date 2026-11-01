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

// Add real projects here; the grid stays hidden while this list is empty.
export const moreProjects: { title: string; description: string; tags: string[]; url?: string }[] = [];
