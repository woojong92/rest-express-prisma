import express from "express";
const comments = express.Router();

const dumpFunc = (req, res) => { console.log(req, res)};

comments.post('/', dumpFunc);
comments.get('/', dumpFunc);
comments.put('/:commentId', dumpFunc);
comments.delete('/:commentId', dumpFunc);

export default comments;