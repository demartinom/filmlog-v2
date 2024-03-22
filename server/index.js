import express from "express";

const app = express();
// Router imports
import films from "./routes/films.js";
import makers from "./routes/makers.js";

//GET request for home page
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Routers
app.use("/api/films", films);
app.use("/api/makers", makers);

const port = 3000;
//Create server at port listed in port variable
app.listen(port, () => {
  console.log(`port is listening on port ${port}`);
});
