const express = require("express");
const View_Route = express.Router();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const DBQuery = require("../Database/Query_Builder");

// getpublisher
View_Route.get("/getpublisher", async function (req, res) {
  const query = `SELECT*from publishers`;
  const result = await DBQuery(query);
  console.log(result);
  res.status(200).json({
    success: true,
    data: result,
  });
});
//getcategory
View_Route.get("/getcategory", async function (req, res) {
  const query = `SELECT*from categories`;
  const result = await DBQuery(query);
  console.log(result);
  res.status(200).json({
    success: true,
    data: result,
  });
});
View_Route.get("/getbooks", async function (req, res) {
  const query = `SELECT*from books`;
  const result = await DBQuery(query);
  console.log(result);
  res.status(200).json({
    success: true,
    data: result,
  });
});

module.exports = View_Route;
