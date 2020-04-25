// access token을 읽고 db에서 내 정보를 가져옴
import express from "express";
import meCtrl from "./me.ctrl";
import follow from "./follow";

const me = express.Router(); 

me.get('/', meCtrl);
me.get('/follow', follow);


export default me;