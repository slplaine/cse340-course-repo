import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';

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
// Routes
app.get("/", (req, res) => {
    res.render("home", {
        title: "Home"
    });
});

app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();
    console.log(organizations);
      
    const title = 'Our Partner Organizations';
    res.render('organizations', { title });
});

app.get("/projects", (req, res) => {
    res.render("projects", {
        title: "Service Projects"
    });
});   

app.get("/categories", (req, res) => {
    res.render("categories", {
        title: "Service Project Categories"
    });

});

app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});