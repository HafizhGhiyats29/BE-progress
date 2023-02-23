import amqplib from "amqplib";

const message = {
  message: {
    cartId: 1,
    totalPrice: 16030000,
    userId: "user-test",
    logType: "buy",
    products: [
      {
        productId: 1,
        name: "ihpone10",
        quantity: 2,
        price: 8000000,
      },
      {
        productId: 2,
        name: "mie goreng",
        quantity: 10,
        price: 3000,
      },
    ],
  },
};

async function send() {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertExchange("product_logs", "direct");
  channel.publish("product_logs", "buy", Buffer.from(JSON.stringify(message)));
  setTimeout(() => {
    connection.close();
  }, 500);
}
send();
