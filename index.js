const express = require("express");

const main = async () => {
  
  const { connect } = require("./db.js")
  const database = await connect();

  const PORT = 3000;
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const router = express.Router();
  router.get("/", (req, res) => {
    res.send(`Esta en la home de la API de venta de productos de segunda mano, estamos usando la BBDD de ${database.connection.name}`);
  });

  router.get("*", (req, res) => {
    res.status(404).send("Lo sentimos :( No hemos encontrado la página solicitada.");
  });

  app.use("/", router);

  app.listen(PORT, () =>{
    console.log(`Server levantado en el puerto ${PORT}`);
  })
};
main();
