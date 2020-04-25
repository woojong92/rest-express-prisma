import express from "express";
import { PrismaClient } from "@prisma/client";
import { checkLoggedin } from "../../middlewares"

const prisma = new PrismaClient();
const drafts = express.Router(); 

drafts.post("/", checkLoggedin, async (req, res) => {
    // if(!req.user) {
    //     return res
    //         .status(400)
    //         .json({
    //             ok: false,
    //             data: null,
    //             error: "Error 7070: Unauthorized"
    //         })
    // }
    try{
        const postsByUser = await prisma.user
            .findOne({ where: { id: req.user.id } })
            .posts({
                where: {
                    published: false
                }
            });
        return res
            .status(200)
            .json({
                ok: true,
                data: postsByUser,
                error: null
            });
    }catch(error){
        return res  
            .status(401)
            .json({
                ok: false,
                data: null,
                error: error.message,
            })
    }
});

export default drafts;