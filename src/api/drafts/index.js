// publish 안된 post의 목록
import express from "express";

import { PrismaClient } from "@prisma/client";
import decodeToken from "../../lib/decodeToken";
const prisma = new PrismaClient();

const drafts = express.Router(); 

// access token을 통해서만...
drafts.post("/", async (req, res) => {
    const { accessToken } = req.body;
    if(!accessToken) {
        return res
            .status(400)
            .json({
                error: 'Error 61058: Access token is required'
            })
    }

    // access token에 대한 유효성 검사 필요

    try{
        const payload = decodeToken("ACCESS", accessToken); 
        const userId = payload.userId;
        // const _user = await prisma.user.findOne({ where: { userId }});
        // delete _user.password;
        const postsByUser = await prisma.user
            .findOne({ where: { id: userId } })
            .posts({
                where: {
                    published: false
                }
            });
        return res
            .status(200)
            .json(postsByUser);
    }catch(e){
        return res  
            .status(401)
            .json({
                error: 'Error 7070: Unauthorized',
            })
    }
});

export default drafts;