import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

const guides = [
  {
    id: 1,
    title: "Brainstorm Business Ideas",
    text: "Looking to brainstorm business ideas and find your niche? We can guide you in the right direction!",
    category: "business models",
    image: "https://placehold.it/300x200",
    submittedBy: "Admin",
  },
  {
    id: 2,
    title: "Finding the Right Partner",
    text: "Finding the right partner? We have a short guide for you.",
    category: "team building",
    image: "https://placehold.it/300x200",
    submittedBy: "Admin",
  },
  {
    id: 3,
    title: "Growing Your Team",
    text: "Growing your team? We have a short guide for you.",
    category: "team building",
    image: "https://placehold.it/300x200",
    submittedBy: "Admin",
  },
  {
    id: 4,
    title: "Talking to Suppliers",
    text: "Talking to suppliers? We have a short guide for you.",
    category: "product development",
    image: "https://placehold.it/300x200",
    submittedBy: "Admin",
  },
  {
    id: 5,
    title: "Business Models",
    text: "Our guides are sorted into different categories including business models.",
    category: "business models",
    image: "https://placehold.it/300x200",
    submittedBy: "Admin",
  },
  {
    id: 6,
    title: "Product Development",
    text: "Our guides are sorted into different categories including product development.",
    category: "product development",
    image: "https://placehold.it/300x200",
    submittedBy: "Admin",
  },
  {
    id: 7,
    title: "Sales",
    text: "Our guides are sorted into different categories including sales.",
    category: "sales",
    image: "https://placehold.it/300x200",
    submittedBy: "Admin",
  },
  {
    id: 8,
    title: "Market Research",
    text: "Our guides are sorted into different categories including market research.",
    category: "market research",
    image: "https://placehold.it/300x200",
    submittedBy: "Admin",
  },
  {
    id: 9,
    title: "Funding",
    text: "Our guides are sorted into different categories including funding.",
    category: "funding",
    image: "https://placehold.it/300x200",
    submittedBy: "Admin",
  },
];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/guide/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "guide.html"));
});

app.get("/lists", (req, res) => {
  res.status(200).type("application/json").send({ lists: guides });
});

app.get("/lists/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const guide = guides.find((g) => g.id === id);

  if (guide) {
    res.status(200).type("application/json").send(guide);
  } else {
    res.status(404).send({ error: "Guide not found" });
  }
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
