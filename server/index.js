import express, { json } from "express";
import process from "process";

const app = express();
//Allows express to return JSON to frontend
app.use(json());

// Router imports
import films from "./routes/films.js";
import makers from "./routes/makers.js";
import types from "./routes/types.js";
import formats from "./routes/formats.js";
import rolls from "./routes/rolls.js";

// Routers
app.use("/api/films", films);
app.use("/api/makers", makers);
app.use("/api/types", types);
app.use("/api/formats", formats);
app.use("/api/rolls", rolls);

const port = process.env.PORT;
//Create server at port listed in port variable
app.listen(port, () => {
  console.log(`port is listening on port ${port}`);
});
