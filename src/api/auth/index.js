import express from "express";
import * as authCtrl from "./auth.ctrl";
const auth = express.Router(); 

auth.post('/login', authCtrl.login);
auth.post('/refresh', authCtrl.refresh);
auth.post('/register', authCtrl.register);
// auth.get('/check', authCtrl.check);
// auth.post('/logout', authCtrl.logout);

export default auth;