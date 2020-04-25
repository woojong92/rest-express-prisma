import express from "express";
import asyncify from "express-asyncify";
import { hydreateUser } from "../middlewares";
import posts from "./posts";
import auth from "./auth";
import me from "./me";
import drafts from "./drafts";
import publish from "./publish";
import published from "./published";

const api = asyncify(express.Router());

api.use(hydreateUser);

api.use("/auth", auth);
api.use("/me", me);
api.use("/posts", posts);
api.use("/drafts", drafts);
api.use("/publish", publish);
api.use("/published", published);

export default api;