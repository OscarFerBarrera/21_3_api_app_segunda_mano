const express = require("express");

const router = express.Router();

router.get("/", (req, res) =>{
  try {
    
  } catch (error) {
    res.status(500).json(error);
  }
});