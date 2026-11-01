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
  { label: "GitHub", url: "" },
  { label: "LinkedIn", url: "" },
  { label: "Email", url: "" }, // e.g. "mailto:you@example.com"
];

export const terraAlert = { githubUrl: "", projectUrl: "" };

// Add real projects here; the grid stays hidden while this list is empty.
export const moreProjects: { title: string; description: string; tags: string[]; url?: string }[] = [];
