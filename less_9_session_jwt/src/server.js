import express from "express";
import exphbs from "express-handlebars";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import "dotenv/config";
import path from "node:path";
import userRoutes from "./routes/user-routes.js";
import siteRoutes from "./routes/site-routes.js";
import logoutRoutes from "./routes/logout-routes.js";
import { checkUser } from "./middleware/user-middleware.js";
import session from "express-session";

const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
});

const app = express();  
app.use(express.static("photos"));
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(checkUser);
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join("src", "views"));

app.use(siteRoutes);
app.use("/user", userRoutes);
app.use("/user", logoutRoutes);

app.get("/", (req, res) => res.render("home"));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});