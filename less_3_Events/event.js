import EventEmitter from "events";

const emitter = new EventEmitter();

const list1 = () => {
    console.log("Listener 1");
};
const list2 = () => {
    console.log("Listener 2");
};
const list3 = () => {
    console.log("Listener 3 (once)");
};

emitter.on("connected", list1);
emitter.addListener("connected", list2);
emitter.emit("connected");
emitter.once("connected", list3);

console.log("----------------------");

//emitter.off("connected", list1);
emitter.removeListener("connected", list2);
emitter.emit("connected");

console.log(`Max listener amount: ${emitter.getMaxListeners()}`);
emitter.setMaxListeners(30);
console.log(`Max listener amount: ${emitter.getMaxListeners()}`);

emitter.on("clicked", (data) => console.log(data));
emitter.emit("clicked", {title: "Cancel", color: "yellow"});
emitter.emit("clicked", {title: "Add", color: "green"});