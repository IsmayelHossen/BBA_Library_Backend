const express = require("express");
const Update_Route = express.Router();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const DBQuery = require("../Database/Query_Builder");

Update_Route.put("/publisher/:id", async function (req, res) {
  const id = req.params.id;
  const { publisher_name } = req.body;
  console.log(publisher_name);
  console.log(id);
  const query = `UPDATE publishers SET publisher_name='${publisher_name}' WHERE ID=${id} `;
  const result = DBQuery(query);
  res.status(200).json({
    success: true,
    data: result,
  });
});
Update_Route.put("/category/:id", async function (req, res) {
  const id = req.params.id;
  const { category_name } = req.body;

  console.log(id);
  const query = `UPDATE categories SET category_name='${category_name}' WHERE ID=${id} `;
  const result = DBQuery(query);
  res.status(200).json({
    success: true,
    data: result,
  });
});
module.exports = Update_Route;
