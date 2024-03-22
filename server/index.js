import express from "express";

const app = express();
// Router imports
import films from "./routes/films.js";
import makers from "./routes/makers.js";
import types from "./routes/types.js";

//GET request for home page
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Routers
app.use("/api/films", films);
app.use("/api/makers", makers);
app.use("/api/types", types);

const port = 3000;
//Create server at port listed in port variable
app.listen(port, () => {
  console.log(`port is listening on port ${port}`);
});
