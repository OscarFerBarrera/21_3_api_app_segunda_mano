const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { User } = require("../models/User.js");
const { faker } = require("@faker-js/faker");

const userSeed = async () => {
  try {
    const userList = [];

    for (let i = 0; i < 10; i++) {
      const newUser = {
         name: faker.person.fullName(),
         email: faker.internet.email(),
         phoneNumber: faker.phone.number(),
         password: "12345",
      };
      userList.push(newUser);
    }

    await connect();
    console.log("Conectado a la bbdd");

    await User.collection.drop();
    console.log("Usuarios borrados");

    const newUserDocument = userList.map((user) => new User(user));
    await User.insertMany(newUserDocument);
    console.log("Usuarios guardados correctamente");
  } catch (error) {
    console.error(error);
    console.log("Error al crear el seed de usuario");
  } finally {
    mongoose.disconnect();
  }
};
userSeed();
