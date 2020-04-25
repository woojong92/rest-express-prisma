import express from "express";
import * as postsCtrl from "./posts.ctrl";
import comments from "./comments";
import { checkLoggedin } from "../../middlewares"
const posts = express.Router(); 

posts.get("/", postsCtrl.list);
posts.post("/", checkLoggedin, postsCtrl.write);

posts.get("/:id", postsCtrl.read) ;
posts.delete("/:id", checkLoggedin, postsCtrl.remove);
posts.put("/:id", checkLoggedin, postsCtrl.update);
//posts.put('/:id', postsCtrl.replace); // PUT: 데이터를 새 정보로 통째로 교체할 때 사용합니다.

posts.use("/:id/comments", comments);

export default posts;