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
import { createClient } from "redis";
import RedisStore from "connect-redis";

const client = createClient({
    url: "redis://5.tcp.eu.ngrok.io:19845"
});

async function run(client) {
    await client.connect();
}

client.on("ready", () => {
    console.log("connected...");
    const redisStore = new RedisStore({
        client: client,
        ttl: 86400,
    });
    const app = express();  
    app.use(express.static("photos"));
    app.use(cookieParser());
    app.use(
        session({
            store: redisStore,
            secret: process.env.SESSION_KEY,
            resave: false,
            saveUninitialized: false,
            cookie: {maxAge: 1000 * 60 * 60},
        })
    );
});

const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
});

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