/*
1) COMMON JS MODULEs (require-> module.exports)
2) ES modules (import/export)
*/
//COMMON JS Module
// const User = require("./User");
// const user = new User("Alex", 22);
// console.log(user.toString());

//ES Module
import User from "./User.js";
import chalk from "chalk";

const user = new User("Alex", 22);
console.log(chalk.red(user.toString()));
