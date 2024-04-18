import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// Get all rolls attached to user with id in req
router.get("/:id", async (req, res) => {
  let { id } = req.params;
  const userRolls = await prisma.roll.findMany({
    where: { userId: id },
    include: { film: true },
  });
  res.json(userRolls);
});

router.post("/newroll", async (req, res) => {
  let { filmStock, dateStarted, dateFinished, user, format } = req.body;
  await prisma.roll.create({
    data: {
      filmId: filmStock,
      dateStarted: dateStarted,
      format: format,
      dateFinished: dateFinished,
      userId: user,
    },
  });
  res.json({ message: "sucessfully added roll" });
});

router.delete("/deleteroll/:rollid", async (req, res) => {
  let { rollid } = req.params;
  await prisma.roll.delete({ where: { id: parseInt(rollid) } });
  res.json({ message: "successfully deleted roll", rollid });
});

router.patch("/editroll/:rollId", async (req, res) => {
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
});

export default router;
