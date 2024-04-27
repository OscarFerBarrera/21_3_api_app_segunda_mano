const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { faker } = require("@faker-js/faker");
const { Product } = require("../models/Product.js");

const productSeed = async () => {
  try {
    const productList = [];

    for (let i = 0; i < 20; i++) {
      const newProduct = {
          title: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price(),
      };
      productList.push(newProduct);
    }
    
    await connect();
    console.log("Tenemos conexión");

    await Product.collection.drop();
    console.log("Productos borrados de la bbdd");

    const newProductDocument = productList.map((product) => new Product(product));
    await Product.insertMany(newProductDocument);
    console.log("Productos creados correctamente");

  } catch (error) {
    console.log(error)    
  }finally{
    mongoose.disconnect();
  }
};
productSeed();