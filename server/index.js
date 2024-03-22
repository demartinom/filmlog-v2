import express from "express";

const app = express();
// Films routes
import films from "./routes/films.js";

//GET request for home page
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Films router
app.use("/api/films", films);

const port = 3000;
//Create server at port listed in port variable
app.listen(port, () => {
  console.log(`port is listening on port ${port}`);
});
