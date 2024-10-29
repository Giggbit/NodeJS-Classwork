import { Router, Request, Response } from "express";
import { PostController } from "../controllers/post-controller.js";

export const postRoutes = Router();

postRoutes.route("/")
    .post(PostController.create)
    .get(PostController.getPosts);