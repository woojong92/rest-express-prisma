import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
    // if(!req.user) {
    //     return res
    //         .status(401)
    //         .json({
    //             ok: false,
    //             data: null,
    //             error: "Error 7070: Unauthorized"
    //         })
    // }
    try{
        const user = await prisma.user.findOne({where: { id: req.user.id }});
        delete user.password;
        return res
                .status(200)
                .json({
                    ok: true,
                    data: user,
                    error: null
                })
    }catch(e){
        return res
            .status(401)
            .json({
                ok: false,
                data: null,
                error: e.message
            })
    }
};


