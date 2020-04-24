// access token을 읽고 db에서 내 정보를 가져옴
import express from "express";
import { PrismaClient } from "@prisma/client";
import decodeToken from "../../lib/decodeToken";
const prisma = new PrismaClient();
const me = express.Router(); 

me.get('/', async (req, res) => {
    //res.json(req.headers['authorization'])
    // 수정이 필요
    const {accessToken} = req.body;
    if(!accessToken) {
        return res
            .status(400)
            .json({
                error: 'Error 61058: Access token is required'
            })
    }

    try{
        const payload = decodeToken("ACCESS", accessToken); 
        
        const userId = payload.userId;
        //const accessToken = generateToken("REFRESH", userId)
    
        const _user = await prisma.user.findOne({ where: { userId }});
        delete _user.password;

        return res
            .status(200)
            .json(_user)
    }catch(e){
        return res  
            .status(401)
            .json({
                error: 'Error 7070: Unauthorized',
            })
    }
});


export default me;