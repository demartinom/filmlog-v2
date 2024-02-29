import express from "express";

const app = express();

//GET request for home page
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const port = 3000;
//Create server at port listed in port variable
app.listen(port, () => {
  console.log(`port is listening on port ${port}`);
});
