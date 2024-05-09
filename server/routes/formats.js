const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// Get all film stocks that include a specific format (ex. 35mm)
router.get("/:format", async (req, res) => {
  try {
    let { format } = req.params;
    console.log(format);
    format = format.replace(/-/g, " ");
    const formats = await prisma.filmStock.findMany({
      where: { formats: { has: format } },
    });
    res.json(formats);
  } catch (error) {
    console.error("Error fetching film stocks by format:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
