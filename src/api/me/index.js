// access token을 읽고 db에서 내 정보를 가져옴
import express from "express";
import meCtrl from "./me.ctrl";
import follow from "./follow";
import follower from "./follower";
import following from "./following";
import { checkLoggedin } from "../../middlewares"

const me = express.Router(); 

me.get('/', checkLoggedin, meCtrl);
me.get('/follow', checkLoggedin, follow); // follow, unfollow function
me.get('/following', following); // get all following users
me.get('/follower', follower); // get all followers


export default me;