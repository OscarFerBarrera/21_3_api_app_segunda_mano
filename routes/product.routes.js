const express = require("express");
const { Product } = require("../models/Product.js");
const router = express.Router();

// END POINT CRUD: leer todos los productos
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const products = await Product.find()
      .limit(limit)
      .skip((page - 1) * limit);

    const totalProducts = await Product.countDocuments();

    const response = {
      totalProducts: totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      data: products,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

// END POITN CRUD: leer un producto por id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// END POINT CRUD: leer un producto por nombre
router.get("/title/:title", async (req, res) => {
  try {
    const titleProduct = req.params.title;
    const product = await Product.find({ title: new RegExp("^" + titleProduct.toLowerCase(), "i") });

    if (product?.length) {
      res.json(product);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json({});
  }
});

// END POINT CRUD: crear un producto
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const createdProduct = await newProduct.save();
    return res.status(200).json(createdProduct);
  } catch (error) {
    res.status(400).json({});
  }
});

// END POINT CRUD: borrar un producto
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const productDelete = await Product.findByIdAndDelete(id);
    if (productDelete) {
      res.json(productDelete);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// END POINT CRUD: actualizar producto
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const productUpdate = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (productUpdate) {
      res.status(200).json(productUpdate);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(404).json({});
  }
});

module.exports = { productRouter: router };
