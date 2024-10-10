import { Router } from "express";

const logoutRoutes = Router();

logoutRoutes.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send("Ошибка при выходе из системы.");
        }
        res.clearCookie('connect.sid');
        res.redirect("/");
    });
});

export default logoutRoutes;
