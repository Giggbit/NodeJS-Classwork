import dotenv from "dotenv";

dotenv.config();
// console.log(process.env.PORT, process.env.SECRET_KEY);
// console.log(process.pid);


// const timer = setInterval(() => {
//     console.log("Node.js");
// }, 1000);

// setTimeout(() => {
//     clearInterval(timer);
// }, 10000);

// setImmediate(() => {
//     console.log("Immediate");
// });

// queueMicrotask(() => {
//     console.log("Microtask");
// });

// Promise.resolve().then(() => {
//     console.log("Promise");
// });


// const product = {
//     id: "1",
//     title: "computer",
//     price: "560"
// };

// const new_product = structuredClone(product);
// product.id = "2";
// console.table(new_product);


// const user = {
//     id: 1,
//     name: "Oleg",
//     adress: {
//         street: "Sadova",
//         ap: 20
//     }
// };

// const new_user = {...user};
// user.adress.ap = 133;
// console.table(new_user);


// const str = "Node.js";
// const encoding = btoa(str);
// console.log(encoding);
// console.log(atob(encoding));


// const start = performance.now();
// let s = 0;
// for(let i = 0; i < 1e7; i++) {
//     s+=i
// }
// console.log(s);
// console.log(`Time: ${performance.now() - start} ms`)


// fetch(`${process.env.HOST}users`)
//     .then((res) => res.json())
//     .then((data) => console.log(data))
//     .catch((e) => console.log(e));

// fetch(`${process.env.HOST}users`, {
//     method: "POST",
//     body: JSON.stringify({
//         name: "Jhon"
//     }),
// }).then((res) => console.log(res)).catch((e) => console.log(e));

import axios from "axios";

class ConnectToServer {
    getAllData = async () => {
        try {
            const resp = await axios.get(`${process.env.HOST}products`);
            console.table(resp.data);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    }

    setData = async (product) => {
        try {
            const resp = await axios.post(`${process.env.HOST}products`, product);
            console.table(resp.data);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    }

    putData = async (id, update_product) => {
        try {
            const resp = await axios.put(`${process.env.HOST}products/${id}`, update_product);
            console.table(resp.data);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    } 

    deleteData = async (id) => {
        try {
            const resp = await axios.delete(`${process.env.HOST}products/${id}`);
            console.log(`Product deleted`);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    }
};

const connect = new ConnectToServer();
connect.getAllData();

const new_product = {
    id: "6", 
    name: "Onion",
    price: 0.50
};
connect.setData(new_product);

const update_product = {
    id: "6", 
    name: "Onion",
    price: 0.60
}
connect.putData("6", update_product);

connect.deleteData("6");
