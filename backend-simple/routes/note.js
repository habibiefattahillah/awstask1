require('express-group-routes');
const { Route } = require("express");
const app =  require("express");
const {getItems, createItem, deleteItem, updateItem, getItem} = require("../controllers/item") 
const router = app.Router();

router.get("/item", getItems)
      .get("/item/:id", getItem)
      .post("/item", createItem)
      .put("/item/:id", updateItem)
      .delete("/item/:id", deleteItem);

module.exports = router;