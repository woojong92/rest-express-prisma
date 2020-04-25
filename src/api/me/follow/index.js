import express from "express";
const follow = express.Router();

follow.get('/'); // get all followings
follow.post('/users/:id'); // follow user
follow.post('/tags/:id'); // follow tag
follow.delete('/users/:id'); // unfollow user
follow.delete('/tags/:id'); // unfollow tag

export default follow;