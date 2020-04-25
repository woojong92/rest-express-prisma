// access token을 읽고 db에서 내 정보를 가져옴
import express from "express";
import { PrismaClient } from "@prisma/client";

const follower = express.Router(); 
const prisma = new PrismaClient();

follower.get('/', async (req, res) => {
    const { id } = req.user;
    const users = await prisma.follower.findMany({ where: { userId: id }});
    return res
        .status(200)
        .json({
            ok: true,
            data: users,
            error: null
        })
}); 

export default follower;