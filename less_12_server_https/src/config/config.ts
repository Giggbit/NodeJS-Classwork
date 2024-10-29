import "dotenv/config";
import { Sequelize } from "sequelize-typescript";
import { Book } from "../models/book-model.js";
import { User } from "../models/user-model.js";
import { UserGroup } from "../models/user-group-model.js";
import { Group } from "../models/group-model.js";
import { Profile } from "../models/profile-model.js";
import { Post } from "../models/post-model.js";

export const connection = new Sequelize({
    dialect: "mysql",
    timezone: "+01:00",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [Book, User, UserGroup, Group, Profile, Post],
});