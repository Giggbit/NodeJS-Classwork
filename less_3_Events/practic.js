import EventEmitter from "events";

class Customer {
    #_name;
    #_email;

    constructor(name, email) {
        this.#_name = name;
        this.#_email = email;
    }

    notifyAboutSale(discount) {
        console.log(`Name: ${this.#_name} Email: ${this.#_email}. Discount: ${discount}`)
    }
};

const customers = [
    new Customer('John Snow', 'john@example.com'),
    new Customer('Jane Jonson', 'jane@example.com'),
    new Customer("Emily Chen", "emilychen@yahoo.com"),
    new Customer("Jack Black", "jackblack@gmail.com"),
    new Customer("Michael Brown", "michaelbrown@hotmail.com")
];

const emitter = new EventEmitter();

customers.forEach(
    (customer) => emitter.on("sale", (sale) => customer.notifyAboutSale(sale))
);
emitter.emit("sale", 20);



