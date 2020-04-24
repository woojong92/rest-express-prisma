import express from "express";
import posts from "./posts";
import auth from "./auth";
import me from "./me";
import drafts from "./drafts";
import publish from "./publish";
import published from "./published";

const api = express.Router(); // 새로 생겼어요!

api.use("/auth", auth);
api.use("/me", me);
api.use("/posts", posts);
api.use("/drafts", drafts);
api.use("/publish", publish);
api.use("/published", published);

// api.get('/', (req,res) => {
//     res.send('hi')
// })

export default api;