const Item = require("../models/Item");

const getItems = async (req, res) => {
  let Items = await Item.findAll();
  let response = {
    code: 200,
    status: true,
    data: Items,
    message: "success get data",
  };
  return res.status(response.code).json(response);
};

const getItem = async (req, res) => {
    const ItemId = req.params.id;
    let Item = await Item.findOne({
        where: {
            id:ItemId,
        }
    });
    let response = {
      code: 200,
      status: true,
      data: Item,
      message: "success get data",
    };
    return res.status(response.code).json(response);
  };

const createItem = async (req, res) => {
  let response = {
    code: 200,
    status: true,
    data: null,
    message: "success create Item",
  };
  try {
    let { title, description } = req.body;
    const newItem = await Item.create({ title, description });
    response.data = newItem;
    return res.status(response.code).json(response);
  } catch (error) {
    response.message = "please check the parameter again";
    response.code = 400;
    response.status = false;
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      response.error = errors;
      return res.status(response.code).json(response);
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

const deleteItem = async (req, res) => {
  const ItemId = req.params.id;
  const deleteItem = await Item.destroy({
    where: {
      id: ItemId,
    },
  });
  if (deleteItem === 0) {
    return res.status(404).json({ error: "data Item not found" });
  }
  return res.status(200).json({ message: "data Item deleted successfully" });
};

const updateItem = async (req, res) => {
  const ItemId = req.params.id;
  const {title, description} = req.body;
  try {
    
      const findItem = await Item.findOne({
        where: {
            id: ItemId,
        }
      });
      if(!findItem)
            return res.status(400).json({error: "data Item not found"});
    
      findItem.title = title;
      findItem.description = description;
      await findItem.save();
    
      return res.status(200).json({message: "success update Item", data: findItem});
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      return res.status(400).json({errors});
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = {
  getItems,
  getItem,
  createItem,
  deleteItem,
  updateItem,
};
