import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import amqplib from "amqplib";
import router from "./routes/orderRoute.js";
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json("application/json"));
app.use(cors(process.env.CORS_URL));
app.use(router);

async function consume() {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertExchange("product_logs", "direct");
  const q = await channel.assertQueue("order");
  await channel.bindQueue(q.queue, "product_logs", "buy");
  console.log("Waiting For Messages");
  channel.consume(q.queue, (msg) => {
    if (msg.content) {
      const { message } = JSON.parse(msg.content);
      console.log(message);
    }
  });
}
consume();

app.listen(parseInt(process.env.PORT), () => {
  console.log(`Server Listen on Port ${process.env.PORT}`);
});
