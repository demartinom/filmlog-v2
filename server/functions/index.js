import express, { json } from "express";
import process from "process";
import serverless from "serverless-http";


// Router imports
import films from "../routes/films.js";
import makers from "../routes/makers.js";
import types from "../routes/types.js";
import formats from "../routes/formats.js";
import rolls from "../routes/rolls.js";

const app = express();
//Allows express to return JSON to frontend
app.use(json());

// Routers
app.use("/api/films", films);
app.use("/api/makers", makers);
app.use("/api/types", types);
app.use("/api/formats", formats);
app.use("/api/rolls", rolls);

export const handler = serverless(app);
