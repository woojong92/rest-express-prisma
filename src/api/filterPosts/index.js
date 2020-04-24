import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const filterPosts = express.Router(); 

// GET /api/filterPosts?searchString=:searchString
filterPosts("/", async (req, res ) => {
    const { searchString } = req.query
    const resultPosts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    })
    res.json(resultPosts)
});

export default filterPosts;