import { Router } from "express";
import { users } from "../data/users.js";
import { newsList } from "../data/newsList.js";
import { loginUser, createUser, feedbackUser, mailingListToUsers } from "../middleware/user-middleware.js";
import path from "node:path";
import multer from "multer";

const storage = multer.diskStorage({
    destination: 'photos/',
    filename: (req, file, cb) => {
        cb(null, req.body.login + path.extname(file.originalname));
    }
});
const configMulter = multer({ storage: storage });

const userRoutes = Router();

userRoutes.route("/")
    .get((req, res) => res.json(users));

userRoutes.route("/signup")
    .get((req, res) => res.render("form_register"))
    .post(configMulter.single("file"), createUser, (req, res) => {
        req.session.user = {
            login: req.body.login,
            email: req.body.email,
        };
        res.redirect("/");
    });

userRoutes.route("/signin")
    .get((req, res) => res.render("form_auth"))
    .post(loginUser);

userRoutes.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Ошибка при выходе из системы.");
        }
        res.clearCookie('connect.sid');
        res.redirect("/");
    });
});

userRoutes.route("/feedback")
    .get((req, res) => {
        res.render("form_feedback");
    })
    .post(feedbackUser, (req, res) => {});

userRoutes.route("/mailinglist")
    .get((req, res) => {
        res.render("form_mailinglist", {newsList});
    })
    .post(mailingListToUsers, (req, res) => {});

export default userRoutes;