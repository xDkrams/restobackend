const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
//using LET for line 64

//display all items
router.get("/", itemController.displayItems);

//get id
router.get("/:id", itemController.displayById);

//get categories
router.get("/varieties/:var", itemController.displayByCategories);

//add items
router.post("/", itemController.addItems);

//update
router.put("/:id", itemController.updateItem);

//delete
router.delete("/:id", itemController.deleteItem);

module.exports = router;
