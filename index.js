const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();

const allowedOrigins = [
  "https://filmlog.vercel.app",
  "https://filmlog-v2-demartinoms-projects.vercel.app/",
  "https://filmlog-v2-git-main-demartinoms-projects.vercel.app/",
  "https://filmlog-v2-euxcz82yf-demartinoms-projects.vercel.app/",
];

const corsOptions = { origin: allowedOrigins };

// Allows express to parse JSON request bodies
app.use(bodyParser.json());
// Allows for cors headers
app.use(cors(corsOptions));

// Router imports
const filmsRouter = require("./server/routes/films");
const makersRouter = require("./server/routes/makers");
const typesRouter = require("./server/routes/types");
const formatsRouter = require("./server/routes/formats");
const rollsRouter = require("./server/routes/rolls");

// Routers
app.use("/api/films", filmsRouter);
app.use("/api/makers", makersRouter);
app.use("/api/types", typesRouter);
app.use("/api/formats", formatsRouter);
app.use("/api/rolls", rollsRouter);

// Export the Express app as a Cloud Function
exports.api = functions.https.onRequest(app);
