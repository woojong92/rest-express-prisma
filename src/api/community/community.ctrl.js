import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const list = async (req, res) => {
    const posts = await prisma.post.findMany({
        where: { published: true },
        include: { author: true}
    });
    return res
        .status(200)
        .json(posts);
};

export const write = async (req, res) => {
    const result = await prisma.post.create({
        data: {
            ...req.body
        }
    });
    return res
        .status(200)
        .json(result);
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
    const postId = req.params.id;
    const post = await prisma.post.findOne({ 
        where: { id: Number(postId) },
        include: { author: true },
    });
    return res
        .status(200)
        .json(post)
}

// DELETE /api/post/:id
export const remove = async (req, res) => {
    const postId = req.params.id;
    const post = await prisma.post.delete({ 
        where: { id: Number(postId) }
    });
    return res
        .status(200)
        .json(post)
}

// PATCH /api/post/:id
// 수정중...
export const update = async (req, res) => {
    const postId = req.params.id;
    const post = await prisma.post.update({ 
        where: { id: Number(postId) }
    });
    return res
        .status(200)
        .json(post)
}

// PUT /api/post/:id
// 사용 안함
export const replace = (req, res) => {
    res.send("write");
}

