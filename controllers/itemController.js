const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const itemsFilePath = "./routes/items.json";

const items = fs.readFileSync(itemsFilePath);
let itemList = JSON.parse(items);

const displayItems = (request, response) => {
  response.send(items);
};
const displayById = (request, response) => {
  const item = itemList.find((item) => item.id == request.params.id);
  response.send(item);
};
const displayByCategories = (request, response) => {
  const item = itemList.filter(
    (item) => item.varieties.toLowerCase() == request.params.var.toLowerCase()
  );
  response.send(item);
};
const addItems = (request, response) => {
  const newItem = {
    id: uuidv4(),
    name: request.body.name,
    origin: request.body.origin,
    varieties: request.body.varieties,
    roast: request.body.roast,
    beanType: request.body.beanType,
    image: request.body.image,
    price: request.body.price,
  };
  itemList.push(newItem);
  fs.writeFileSync(itemsFilePath, JSON.stringify(itemList));

  response.status(201).send(itemList);
};

const updateItem = (request, response) => {
  itemList.forEach((item) => {
    if (item.id == request.params.id) {
      (item.name = request.body.name),
        (item.origin = request.body.origin),
        (item.varieties = request.body.varieties),
        (item.roast = request.body.roast),
        (item.beanType = request.body.beanType),
        (item.image = request.body.image),
        (item.price = request.body.price);
    }
  });

  fs.writeFileSync(itemsFilePath, JSON.stringify(itemList));

  response.status(200).send(itemList);
};
const deleteItem = (request, response) => {
  console.log(request.params.id);
  const filteredItems = itemList.filter((item) => item.id != request.params.id);

  itemList = filteredItems;
  fs.writeFileSync(itemsFilePath, JSON.stringify(itemList));

  response.status(200).send();
};
module.exports = {
  displayItems,
  displayById,
  displayByCategories,
  addItems,
  updateItem,
  deleteItem,
};
