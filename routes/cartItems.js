const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const itemsFile = "./items.json";
const itemsFilePath = path.resolve(__dirname, itemsFile);
const items = fs.readFileSync(itemsFilePath);
let itemList = JSON.parse(items);

const cartFile = "./cartItems.json";
const cartFilePath = path.resolve(__dirname, cartFile);
const cartItems = fs.readFileSync(cartFilePath);
let cartItemList = JSON.parse(cartItems);

// add cart
router.get("/", (request, response) => {
  response.send(cartItems);
});

router.post("/:id", (request, response) => {
  let itemExist = false;

  const itemDetails = itemList.filter((item) => item.id == request.params.id);
  if (itemDetails.length > 0) {
    cartItemList.map((item) => {
      if (
        itemDetails[0].name?.toLowerCase()?.trim() ===
        item.name?.toLowerCase()?.trim()
      ) {
        itemExist = true;
        item.quantity += 1;
      }
      return item;
    });
    if (!itemExist) {
      const newCartItem = {
        id: request.params.id,
        name: itemDetails[0].name,
        origin: itemDetails[0].origin,
        varieties: itemDetails[0].varieties,
        roast: itemDetails[0].roast,
        beanType: itemDetails[0].beanType,
        image: itemDetails[0].image,
        price: itemDetails[0].price,
        quantity: 1,
      };
      cartItemList.push(newCartItem);
    }
    fs.writeFileSync(cartFilePath, JSON.stringify(cartItemList));
    response.status(201).send();
  } else {
    response.sendStatus(404);
  }
});

//delete cart
router.delete("/:id", (request, response) => {
  console.log(request.params.id);
  const filteredCartItems = cartItemList.filter(
    (item) => item.id != request.params.id
  );
  cartItemList = filteredCartItems;
  fs.writeFileSync(cartFilePath, JSON.stringify(cartItemList));

  response.status(200).send();
});

module.exports = router;
