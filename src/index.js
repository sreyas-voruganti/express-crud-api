const express = require("express");
const app = express();
const sequelize = require("./db");
const User = require("./User");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize
  .authenticate()
  .then(() => console.log("Successfuly connected to database."))
  .catch((err) => console.log(err));

sequelize
  .sync()
  .then(() => console.log("Successfuly synced to database."))
  .catch((err) => console.log(err));

app.get("/users/:user_id", async (req, res) => {
  const user = await User.findByPk(req.params.user_id);
  res.status(200).json(user);
});

app.put("/users/:user_id", async (req, res) => {
  await User.update(req.body, {
    where: { id: req.params.user_id },
  });
  const user = await User.findByPk(req.params.user_id);
  res.status(200).json(user);
});

app.delete("/users/:user_id", async (req, res) => {
  const user = await User.destroy({ where: { id: req.params.user_id } });
  res.sendStatus(200);
});

app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
});

app.listen(8000, () => console.log("Server started at http://localhost:8000"));
