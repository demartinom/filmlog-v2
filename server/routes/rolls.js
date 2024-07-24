import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// Get all rolls attached to user with id in req
router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const userRolls = await prisma.roll.findMany({
      where: { userId: id },
      include: { film: true },
      orderBy: { id: "asc" },
    });
    res.json(userRolls);
  } catch (error) {
    console.error("Error fetching rolls by user ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new roll
router.post("/newroll", async (req, res) => {
  try {
    let { filmStock, dateStarted, dateFinished, user, format, filmType } =
      req.body;
    await prisma.roll.create({
      data: {
        filmId: filmStock,
        dateStarted: dateStarted,
        format: format,
        dateFinished: dateFinished,
        userId: user,
        type: filmType,
      },
    });
    await prisma.rollCount.upsert({
      where: { filmStockId: filmStock },
      update: { count: { increment: 1 } },
      create: {
        filmStockId: filmStock,
        format: format,
        count: 1,
        type: type,
      },
    });
    await prisma.userCount.upsert({
      where: { filmStockId: filmStock },
      update: { count: { increment: 1 } },
      create: {
        filmStockId: filmStock,
        format: format,
        count: 1,
        type: type,
      },
    });
    res.json({ message: "Successfully added roll" });
  } catch (error) {
    console.error("Error creating new roll:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a roll by roll ID
router.delete("/deleteroll/:rollid", async (req, res) => {
  try {
    let { rollid } = req.params;
    await prisma.roll.delete({ where: { id: parseInt(rollid) } });
    res.json({ message: "Successfully deleted roll", rollid });
  } catch (error) {
    console.error("Error deleting roll:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a roll by roll ID
router.patch("/editroll/:rollId", async (req, res) => {
  try {
    const { rollId } = req.params;
    const updatedRollData = req.body;
    const { dateStarted, dateFinished } = updatedRollData;

    const updatedRoll = await prisma.roll.update({
      where: { id: parseInt(rollId) },
      data: {
        dateStarted: dateStarted,
        dateFinished: dateFinished,
      },
    });
    res.json(updatedRoll);
  } catch (error) {
    console.error("Error updating roll:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
