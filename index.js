const express = require("express");
const app = express();
const cors = require("cors");
const port = 8080;

const bodyParser = require("body-parser");
const itemsRouter = require("./routes/items");
const cartItemRouter = require("./routes/cartItems");
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (request, response) => {
  response.send("Hello from the server side!");
});

app.use("/items", itemsRouter);
app.use("/cart", cartItemRouter);
app.listen(port, () => {
  console.log(`Express server running on port ${port}.`);
});
