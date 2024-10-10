import { Router } from "express";
import session from "express-session";
import validator from "validator";
import bcrypt from "bcrypt";

const userRoutes = Router();
const users = [];

userRoutes.route("/signup")
    .get((req, res) => res.render("form_register"))
    .post((req, res) => {
        const {login, email, password, confirm_password} = req.body;

        if (!login || !email || !password || !confirm_password) {
            return res.status(400).send("Все поля обязательны для заполнения");
        }

        if (!validator.isEmail(email)) {
            return res.status(400).send("Некорректный формат email");
        }

        if (password !== confirm_password) {
            return res.status(400).send("Пароли не совпадают");
        }

        if (!validator.isStrongPassword(password, { minLength: 8 })) {
            return res.status(400).send("Пароль должен содержать минимум 8 символов, включая цифры и спецсимволы");
        }

        const existUser = users.find(users => users.email === email || users.login === login);
        if(existUser) {
            return res.status(400).send("Пользователь с таким логином или email уже существует");
        }

        const hashedPassword = bcrypt.hash(password, 10);

        const newUser = {
            login,
            email,
            password: hashedPassword,
        };
        users.push(newUser);

        req.session.user = {
            login: req.body.login,
            email: req.body.email,
        };
        res.redirect("/");
    });

userRoutes.get("/signin", (req, res) => res.render("form_auth"));

export default userRoutes;