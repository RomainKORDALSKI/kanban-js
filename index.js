import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./src/routers/index.js";
import { bodySanitizer } from "./src/middlewares/sanitizeHtml.js";

const port = process.env.PORT || 3000;

export const app = express();

app.use(cors({origin: process.env.ALLOWED_DOMAINS}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// on met en place le sanitizer sur toutes les requêtes pour être
// certain qu'il sera toujours executé (un dev pourrait oublier de le mettre en place sur une route
// ou il est nécessaire)

app.use(bodySanitizer);
app.use(router);

app.listen(port, () => {
  console.log(`🚀 Server ready: http://localhost:${port}`);
});