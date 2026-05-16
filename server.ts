import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  const DATA_FILE = path.join(process.cwd(), "db.json");

  app.use(express.json());

  // Initialize DB if not exists
  try {
    await fs.access(DATA_FILE);
  } catch {
    const initialData = {
      projects: [
        { 
          id: "1",
          title: "Projectos Residenciais", 
          category: "Arquitectura", 
          img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
          description: "Design e construção de moradias modernas harmonizadas com o ambiente local moçambicano, focadas em sustentabilidade e elegância minimalista.",
          details: ["Fundações reforçadas", "Sistemas de gestão hídrica", "Acabamentos premium", "Paisagismo integrado"],
          gallery: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=400"],
          order: 1
        },
        { 
          id: "2",
          title: "Escritórios Corporativos", 
          category: "Interiores", 
          img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
          description: "Transformação de espaços corporativos para maximizar a luz natural e promover um ambiente de trabalho colaborativo e inspirador.",
          details: ["Soluções acústicas", "Layout modular", "Eficiência energética", "Design ergonómico"],
          gallery: ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=400", "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=400"],
          order: 2
        }
      ],
      settings: {
        adminEmail: "jachicuamba@gmail.com",
        leadsEmail: "contato@tejoma.co.mz"
      }
    };
    await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
  }

  // API Routes
  app.get("/api/db", async (req, res) => {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    res.json(JSON.parse(data));
  });

  app.post("/api/projects", async (req, res) => {
    const data = JSON.parse(await fs.readFile(DATA_FILE, "utf-8"));
    const newProject = { ...req.body, id: Date.now().toString() };
    data.projects.push(newProject);
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    res.status(201).json(newProject);
  });

  app.put("/api/projects/:id", async (req, res) => {
    const data = JSON.parse(await fs.readFile(DATA_FILE, "utf-8"));
    const index = data.projects.findIndex((p: any) => p.id === req.params.id);
    if (index !== -1) {
      data.projects[index] = { ...req.body, id: req.params.id };
      await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
      res.json(data.projects[index]);
    } else {
      res.status(404).send("Not found");
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    const data = JSON.parse(await fs.readFile(DATA_FILE, "utf-8"));
    data.projects = data.projects.filter((p: any) => p.id !== req.params.id);
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    res.status(204).send();
  });

  app.post("/api/settings", async (req, res) => {
    const data = JSON.parse(await fs.readFile(DATA_FILE, "utf-8"));
    data.settings = { ...data.settings, ...req.body };
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    res.json(data.settings);
  });

  app.post("/api/contact", async (req, res) => {
    const data = JSON.parse(await fs.readFile(DATA_FILE, "utf-8"));
    const { name, email, message } = req.body;
    
    // In a real app, you'd use something like Nodemailer here
    // Sending to: data.settings.leadsEmail
    console.log(`Lead received for ${data.settings.leadsEmail}:`, { name, email, message });
    
    // Mocking a successful send
    res.json({ success: true, message: "Mensagem enviada com sucesso!" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
