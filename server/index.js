import express from "express";
import { json } from "body-parser";

import cors from "cors";
const app = express();

const allowedOrigins = [
  "https://filmlog.vercel.app",
  "https://filmlog-v2-demartinoms-projects.vercel.app/",
  "https://filmlog-v2-git-main-demartinoms-projects.vercel.app/",
  "https://filmlog-v2-euxcz82yf-demartinoms-projects.vercel.app/",
];

const corsOptions = { origin: allowedOrigins };

// Allows express to parse JSON request bodies
app.use(json());
// Allows for cors headers
app.use(cors(corsOptions));

// Router imports
import filmsRouter from "./routes/films";
import makersRouter from "./routes/makers";
import typesRouter from "./routes/types";
import formatsRouter from "./routes/formats";
import rollsRouter from "./routes/rolls";

// Routers
app.use("/api/films", filmsRouter);
app.use("/api/makers", makersRouter);
app.use("/api/types", typesRouter);
app.use("/api/formats", formatsRouter);
app.use("/api/rolls", rollsRouter);

// Export the Express app as a Cloud Function
app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});
