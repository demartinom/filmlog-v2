import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// Get all film makers
router.get("/all", async (req, res) => {
  const allMakers = await prisma.maker.findMany();
  res.json(allMakers);
});

// Get all filmstocks made by maker
router.get("/:id", async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  const makerFilms = await prisma.maker.findUnique({
    where: { id },
    include: { Film: true },
  });
  res.json(makerFilms);
});

export default router;
