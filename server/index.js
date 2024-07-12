import express from "express";
import { json } from "express";
import cors from "cors";

const app = express();

const allowedOrigins = [
  "https://filmlog.vercel.app",
  "https://filmlog-v2-demartinoms-projects.vercel.app",
  "https://filmlog-v2-git-main-demartinoms-projects.vercel.app",
  "https://filmlog-v2-euxcz82yf-demartinoms-projects.vercel.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Allows express to parse JSON request bodies
app.use(json());
// Allows for CORS headers
app.use(cors(corsOptions));

// Router imports
import filmsRouter from "./routes/films.js";
import makersRouter from "./routes/makers.js";
import typesRouter from "./routes/types.js";
import formatsRouter from "./routes/formats.js";
import rollsRouter from "./routes/rolls.js";
import statsRouter from './routes/stats.js'

// Routers
app.use("/api/films", filmsRouter);
app.use("/api/makers", makersRouter);
app.use("/api/types", typesRouter);
app.use("/api/formats", formatsRouter);
app.use("/api/rolls", rollsRouter);
app.use("/api/stats", statsRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
