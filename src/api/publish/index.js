// post publish 하기
import express from "express";
import { PrismaClient } from "@prisma/client";

const publish = express.Router();
const prisma = new PrismaClient();

publish.patch("/publish/:id", async (req, res) => {
    const { id } = req.params
    const post = await prisma.post.update({
      where: { id },
      data: { published: true },
    })
    res.json(post)
})

export default publish;