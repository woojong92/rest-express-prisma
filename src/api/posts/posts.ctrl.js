import { PrismaClient } from "@prisma/client";
import cuid from "cuid";
const prisma = new PrismaClient();

export const list = async (req, res) => {
    // const { tag, username } = req.query;
    // const query = {
    //     ...(username ? { 'user.username': username } :  {}),
    //     ...(tag ? { tags: tag } :  {}),
    // };
    try{
        const posts = await prisma.post.findMany({
            where: { published: true },
            include: { author: true}
        });
        return res
            .status(200)
            .json({
                ok: true,
                data: posts,
                error: null
            });
    }catch(error){
        return res
                .status(400)
                .json({
                    ok: false,
                    data: null,
                    error: error.message
                })       
    }
};

export const write = async (req, res) => {
    try{
        const _cuid = cuid();
        const post = await prisma.post.create({
            data: {
                ...req.body,
                id: _cuid
            }
        });
        return res
                .status(200)
                .json({
                    ok: true,
                    data: post,
                    error: null
                });
    }catch(error){
        return res
                .status(400)
                .json({
                    ok: false,
                    data: null,
                    error: error.message
                })
    }

};

// app.post(`/post`, async (req, res) => {
//   const { title, content, authorEmail } = req.body
//   const result = await prisma.post.create({
//     data: {
//       title,
//       content,
//       published: false,
//       author: { connect: { email: authorEmail } },
//     },
//   })
//   res.json(result)
// })

// app.put('/publish/:id', async (req, res) => {
//   const { id } = req.params
//   const post = await prisma.post.update({
//     where: { id },
//     data: { published: true },
//   })
//   res.json(post)
// })

// GET /api/post/:id
export const read = async (req, res) => {
    if(!req.params.id){
        return res      
                .status(400)
                .json({
                    ok: false,
                    data: null,
                    error: "BAD REQUEST"
                })
    }
    try{
        const post = await prisma.post.findOne({ 
            where: { id: req.params.id },
            include: { author: true },
        });
        return res
                .status(200)
                .json({
                    ok: true,
                    data: post,
                    error: null
                })
    }catch(error){
        return res      
                .status(400)
                .json({
                    ok: false,
                    data: null,
                    error: error.message
                })
    }

}

// DELETE /api/post/:id
export const remove = async (req, res) => {
    if(!req.params.id){
        return res      
                .status(400)
                .json({
                    ok: false,
                    data: null,
                    error: "BAD REQUEST"
                })
    }
    try{
        const post = await prisma.post.delete({ 
            where: { id: req.params.id }
        });
        return res
            .status(200)
            .json({
                ok: true,
                data: post,
                error: null
            })
    }catch(error){
        return res
        .status(400)
        .json({
            ok: false,
            data: null,
            error: error.message
        })
    }
}

// PATCH /api/post/:id
// 수정중...
export const update = async (req, res) => {
    if(!req.params.id){
        return res      
                .status(400)
                .json({
                    ok: false,
                    data: null,
                    error: "BAD REQUEST"
                })
    }
    try{ 
        const post = await prisma.post.update({ 
            where: { id: req.params.id }
        });
        return res
            .status(200)
            .json({
                ok: true,
                data: post,
                error: null
            })
    }catch(error){
        return res
                .status(400)
                .json({
                    ok: false,
                    data: null,
                    error: error.message
                })
    }

}

// PUT /api/post/:id
// 사용 안함
export const replace = (req, res) => {
    res.send("write");
}

