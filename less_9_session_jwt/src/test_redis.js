import {createClient} from "redis";

const client = createClient({
    url: "redis://5.tcp.eu.ngrok.io:19845"
});

client.on("error", (err) => {
    console.log(err);
});

client.on("ready", () => {
    console.log("success");
});

async function redisTest(client) {
    await client.connect();
    await client.set("test_redis", "data");
    const data = await client.get("test_redis");
}

redisTest(client);

