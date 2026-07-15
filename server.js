import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || "production";
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Static files
app.use(express.static(path.join(__dirname, "public")));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

console.log("ESTOU RODANDO O SERVER NOVO");

// Rotas
app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

app.get("/organizations", async (req, res) => {
  const organizations = await getAllOrganizations();
  const title = "Our Partner Organizations";
  res.render("organizations", { title, organizations });
});

app.get("/projects", async (req, res) => {
  const projects = await getAllProjects();
  const title = "Service Projects";
  res.render("projects", { title, projects });
});

app.get("/categories", async (req, res) => {
  try {
    const categories = await getAllCategories();
    const title = "Service Project Categories";
    res.render("categories", { title, categories });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao carregar categorias");
  }
});


// Inicializa servidor
app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});


