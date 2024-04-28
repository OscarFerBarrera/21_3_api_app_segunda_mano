const express = require("express");
const { User } = require("../models/User.js");
const router = express.Router();

// END POINT CRUD: leer todos los usuarios
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const users = await User.find()
      .limit(limit)
      .skip((page - 1) * limit);

    const totalUsers = await User.countDocuments();

    const response = {
      totalUsers: totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      data: users,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
});

// END POITN CRUD: leer un usuario por id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// END POINT CRUD: leer un usuario por nombre
router.get("/name/:name", async (req, res) => {
  try {
    const nameUser = req.params.name;
    const user = await User.find({ name: new RegExp("^" + nameUser.toLowerCase(), "i") });

    if (user?.length) {
      res.json(user);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json({});
  }
});

// END POINT CRUD: crear un usuario
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const createdUser = await newUser.save();
    return res.status(200).json(createdUser);
  } catch (error) {
    res.status(400).json({});
  }
});

// END POINT CRUD: borrar un usuario
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userDelete = await User.findByIdAndDelete(id);
    if (userDelete) {
      res.json(userDelete);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// END POINT CRUD: actualizar usuario
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userUpdate = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (userUpdate) {
      res.status(200).json(userUpdate);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    res.status(404).json({});
  }
});

module.exports = { userRouter: router };
