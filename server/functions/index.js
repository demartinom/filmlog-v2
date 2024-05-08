const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Allows express to parse JSON request bodies
app.use(bodyParser.json());

// Router imports
const filmsRouter = require("../routes/films");
const makersRouter = require("../routes/makers");
const typesRouter = require("../routes/types");
const formatsRouter = require("../routes/formats");
const rollsRouter = require("../routes/rolls");

// Routers
app.use("/api/films", filmsRouter);
app.use("/api/makers", makersRouter);
app.use("/api/types", typesRouter);
app.use("/api/formats", formatsRouter);
app.use("/api/rolls", rollsRouter);

// Export the Express app as a Cloud Function
exports.api = functions.https.onRequest(app);
