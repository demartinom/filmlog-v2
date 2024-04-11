import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// Get all rolls attached to user with id in req
router.get("/:id", async (req, res) => {
  let { id } = req.params;
  const userRolls = await prisma.roll.findMany({
    where: { userId: id },
  });
  res.json(userRolls);
});

export default router;
