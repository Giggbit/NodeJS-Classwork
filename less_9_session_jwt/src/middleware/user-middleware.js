import bcrypt, { hash } from "bcrypt";
import { users } from "../data/users.js";
import { newsList } from "../data/newsList.js";
import path from "node:path";
import nodemailer from "nodemailer";

export const checkUser = (req, res, next) => {
    if(req.session.user && req.session) {
        res.locals.user = req.session.user.login;
        res.locals.image = req.session.user.image;
    }
    next();
};

export const createUser = (req, res, next) => {
    if(
        req.body &&
        req.body.login &&
        req.body.email &&
        req.body.password &&
        req.body.confirm_password &&
        req.body.password === req.body.confirm_password
    ) {
        const {login, email, password} = req.body;
        const user = users.find((el) => el.login === login || el.email === email);
        if(!user) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            users.push({
                id: users.length + 1,
                login: login,
                email: email,
                password: hash,
                image: login + path.extname(req.file.originalname),
            });
            next();
            return;
        }
        else {
            res.status(400).redirect("/")
        }
    }
};

export const loginUser = (req, res) => {
    const {login, password} = req.body;

    const user = users.find((user) => user.login === login);
    if(!user) {
        return res.status(401).send("Пользователь не найден");
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if(!passwordMatch) {
        return res.status(401).send("Неправильгый логин или пароль");
    }

    req.session.user = {
        id: user.id,
        email: user.email,
        login: user.login,
        image: user.image,
    }

    return res.redirect("/");
}

export const feedbackUser = (req, res, next) => {
    if(req.body && req.body.email && req.body.message && req.body.subject) {
        const { email, message, subject } = req.body;
        const mailOpt = {
            from: "Daniil Kostanda <danya19981017@gmail.com>",
            to: email,
            subject: subject,
            text: message,
        };

        const trans = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
              user: "danya19981017@gmail.com",
              pass: "egls filg kmpc wwju",
            },
            tls: {
              rejectUnauthorized: true,
              minVersion: "TLSv1.2",
            },
        });

        trans.sendMail(mailOpt, (err, info) => {
            console.log(err, info);
            if (err) {
                console.log(err);
                res.status(400).redirect("/");
            } 
            else {
                console.log(info);
                res.status(201).redirect("/");
            }
        });
    }
    next();
};

export const mailingListToUsers = (req, res, next) => {
    const {emails, news} = req.body;
    const emailArray = emails.split(",").map(email => email.trim()).filter(email => email);
    const selectedNews = newsList.find(item => item.id === news);

    if (!selectedNews) {
        return res.status(400).send("Invalid news selection");
    }
    if (emailArray.length === 0) {
        return res.status(400).send("No valid email addresses provided");
    }

    const mailOptions = {
        from: "Daniil Kostanda <danya19981017@gmail.com>",
        to: emailArray,
        subject: selectedNews.title,
        text: selectedNews.content,
    };
    const trans = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "danya19981017@gmail.com",
            pass: "egls filg kmpc wwju",
        },
        tls: {
            rejectUnauthorized: true,
            minVersion: "TLSv1.2",
        },
    });
    
    emailArray.forEach((email) => {
        trans.sendMail({ ...mailOptions, to: email }, (err, info) => {
            if (err) {
                console.error(`Error sending to ${email}:`, err);
                res.status(400).redirect("/");
            } 
            else {
                console.log(`Email sent to ${email}:`);
                res.status(201).redirect("/");
            }
        });
    });
    next();
};
