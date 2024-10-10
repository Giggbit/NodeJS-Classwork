import { Router } from "express";
import path from "node:path";

const routes = Router();

// routes.get("/", (req, res) => {
//     res.sendFile(path.join(import.meta.dirname, "public", "pages", "index.html"));
// });
// routes.post("/", (req, res) => {
//     res.status(201).json({status: "success"});
// });

routes.route("/")
    .get((req, res) => {
        // res.sendFile(path.join(import.meta.dirname, "public", "pages", "index.html"));
        const products = [
            {id: 1, title: "tv", price: 150},
            {id: 2, title: "phone", price: 70},
            {id: 3, title: "computer", price: 230},
            {id: 4, title: "mouse", price: 23}
        ];
        res.render("index", {name: "John", products});
    })
    .post((req, res) => {
        res.status(201).json({status: "success"});
    });

routes.route("/contacts")
    .get((req, res) => {
        // res.sendFile(path.join(import.meta.dirname, "public", "pages", "contact.html"));
        const contacts = [
            {id: 1, name: "John", phone: "+426604365728"},
            {id: 2, name: "Mary", phone: "+436203759485"},
            {id: 3, name: "Kall", phone: "+380615495862"},
            {id: 4, name: "Tom", phone: "+100214879344"}
        ];
        res.render("contact", {contacts});
    })
    .post((req, res) => {
        res.status(201).json({status: "success"});
    });

export default routes;