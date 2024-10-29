import { Request, Response } from "express";
import { User } from "../models/user-model.js";
import { Post } from "../models/post-model.js";

export class UserController {
    static async create(req:Request<{},{},{login:string, role?:string}>, res:Response): Promise<any> {
        const user = await User.create({...req.body});
        if(user) {
            return res.status(201).json({message: "User created successfully", data: user.dataValues});
        }
        return res.status(500).json({message: "db Error!", data: null});
    };

    static async getUsers(req: Request, res:Response): Promise<any> {
        const users = await User.findAll({include: Post});
        if(users) {
            return res.status(200).json({message: "List of users", data: users});
        }
        return res.status(500).json({message: "db Error!", data: null});
    };
}