import { Request, Response } from "express";
import { Post } from "../models/post-model.js";

export class PostController {
    static async create(req:Request<{},{},{title:string, description:string, user_id:number}>, res:Response): Promise<any> {
        const post = await Post.create({...req.body});
        if(post) {
            return res.status(201).json({message: "Post created successfully", data: post.dataValues});
        }
        return res.status(500).json({message: "db Error!", data: null});
    };

    static async getPosts(req: Request, res:Response): Promise<any> {
        const posts = await Post.findAll();
        if(posts) {
            return res.status(200).json({message: "List of posts", data: posts});
        }
        return res.status(500).json({message: "db Error!", data: null});
    };
}