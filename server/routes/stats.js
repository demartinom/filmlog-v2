import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

const fetchPopularDetails = async (schema, userId) => {
  const whereCondition = userId != null ? { userId: { contains: userId } } : {};
  const model = prisma[schema];

  const [totalRolls, mostPopularFormat, mostPopularStock, mostPopularType] =
    await Promise.all([
      model.aggregate({
        _sum: {
          count: true,
        },
        where: whereCondition,
      }),
      model.groupBy({
        by: ["format"],
        _sum: { count: true },
        orderBy: { _sum: { count: "desc" } },
        take: 1,
        where: whereCondition,
      }),
      model.groupBy({
        by: ["filmStockId"],
        _sum: { count: true },
        orderBy: { _sum: { count: "desc" } },
        take: 1,
        where: whereCondition,
      }),
      model.groupBy({
        by: ["type"],
        _sum: { count: true },
        orderBy: { _sum: { count: "desc" } },
        take: 1,
        where: whereCondition,
      }),
    ]);

  let mostPopularStockName = "";
  if (mostPopularStock.length > 0) {
    const filmStock = await prisma.filmStock.findUnique({
      where: { id: mostPopularStock[0].filmStockId },
    });
    mostPopularStockName = filmStock ? filmStock.name : "";
  }

  return {
    totalRolls: totalRolls._sum.count,
    mostPopularFormat: mostPopularFormat[0].format,
    mostPopularStock: mostPopularStockName,
    mostPopularType: mostPopularType[0].type,
  };
};

// Get statistics for all users
router.get("/all", async (req, res) => {
  try {
    const popularDetails = await fetchPopularDetails("rollCount", null);
    res.json(popularDetails);
  } catch (error) {
    console.log("Error fetching roll count", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get statistics for a specific user
router.get("/:user", async (req, res) => {
  const { user } = req.params;
  try {
    const userPopularDetails = await fetchPopularDetails("userCount", user);
    res.json(userPopularDetails);
  } catch (error) {
    console.log("Error fetching user stats", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
