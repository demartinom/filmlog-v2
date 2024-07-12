import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

//Get statistics for all users
router.get("/all", async (req, res) => {
  try {
    const [totalRolls, mostPopularFormat, mostPopularStock, mostPopularType] =
      await Promise.all([
        prisma.rollCount.aggregate({
          _sum: {
            count: true,
          },
        }),
        prisma.rollCount.groupBy({
          by: ["format"],
          _sum: { count: true },
          orderBy: { _sum: { count: "desc" } },
          take: 1,
        }),
        prisma.rollCount.groupBy({
          by: ["filmStockId"],
          _sum: { count: true },
          orderBy: { _sum: { count: "desc" } },
          take: 1,
        }),
        prisma.rollCount.groupBy({
          by: ["type"],
          _sum: { count: true },
          orderBy: { _sum: { count: "desc" } },
          take: 1,
        }),
      ]);
    let mostPopularStockName = "";
    if (mostPopularStock.length > 0) {
      mostPopularStockName = await prisma.filmStock.findUnique({
        where: { id: mostPopularStock[0].filmStockId },
      });
    }
    res.json({
      totalRolls: totalRolls._sum.count,
      mostPopularFormat: mostPopularFormat[0].format,
      mostPopularStock: mostPopularStockName.name,
      mostPopularType: mostPopularType[0].type,
    });
  } catch (error) {
    console.log("Error fetching roll count", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:user", async (req, res) => {
  let { user } = req.params;
  try {
    const [totalRolls, mostPopularFormat, mostPopularStock, mostPopularType] =
      await Promise.all([
        prisma.userCount.aggregate({
          _sum: {
            count: true,
          },
          where: { userId: { contains: user } },
        }),
        prisma.userCount.groupBy({
          by: ["format"],
          where: { userId: { contains: user } },
          _sum: { count: true },
          orderBy: { _sum: { count: "desc" } },
          take: 1,
        }),
        prisma.userCount.groupBy({
          by: ["filmStockId"],
          where: { userId: { contains: user } },
          _sum: { count: true },
          orderBy: { _sum: { count: "desc" } },
          take: 1,
        }),
        prisma.userCount.groupBy({
          by: ["type"],
          where: { userId: { contains: user } },
          _sum: { count: true },
          orderBy: { _sum: { count: "desc" } },
          take: 1,
        }),
      ]);
    let mostPopularStockName = "";
    if (mostPopularStock.length > 0) {
      mostPopularStockName = await prisma.filmStock.findUnique({
        where: { id: mostPopularStock[0].filmStockId },
      });
    }
    res.json({
      userTotalRolls: totalRolls._sum.count,
      userMostPopularFormat: mostPopularFormat[0].format,
      userMostPopularStock: mostPopularStockName.name,
      userMostPopularType: mostPopularType[0].type,
    });
  } catch (error) {
    console.log("Error fetching user stats", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
