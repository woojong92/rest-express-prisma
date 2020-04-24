import express from "express";
import * as communityCtrl from "./community.ctrl";
import comments from "./comments";
const posts = express.Router(); 

posts.get("/", communityCtrl.list);
posts.post("/", communityCtrl.write);
posts.get("/:id", communityCtrl.read);
posts.delete("/:id", communityCtrl.remove);
posts.put("/:id", communityCtrl.update);
//posts.put('/:id', postsCtrl.replace); // PUT: 데이터를 새 정보로 통째로 교체할 때 사용합니다.

posts.use("/:id/comments", comments);

export default posts;