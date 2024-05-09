const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// Get all film makers
router.get("/all", async (req, res) => {
  try {
    const allMakers = await prisma.maker.findMany();
    res.json(allMakers);
  } catch (error) {
    console.error("Error fetching all film makers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all filmstocks made by maker
router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);
    const makerFilms = await prisma.maker.findUnique({
      where: { id },
      include: { Film: true },
    });
    res.json(makerFilms);
  } catch (error) {
    console.error("Error fetching film stocks by maker:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
