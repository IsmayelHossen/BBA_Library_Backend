const express = require("express");
const Search_Route = express.Router();
const path = require("path");
const multer = require("multer");
const DBQuery = require("../Database/Query_Builder");

Search_Route.get("/publisher/:search", async function (req, res) {
  const s = req.params;
  console.log(s);
  const query = `SELECT*FROM publishers where lower(publisher_name) like '%${s.search}%' `;
  const result = await DBQuery(query);
  res.status(200).json({
    success: true,
    data: result,
  });
});
Search_Route.get("/category/:search", async function (req, res) {
  const s = req.params;
  console.log(s);
  const query = `SELECT*FROM categories where lower(category_name) like '%${s.search}%' `;
  const result = await DBQuery(query);
  res.status(200).json({
    success: true,
    data: result,
  });
});
// Search_Route.get(
//   "/individual_documents_search/:search_value/:document_type",
//   async function (req, res) {
//     const { search_value, document_type } = req.params;
//     console.log(document_type);
//     const query = `SELECT*from fileupload  where (lower(filename) like '%${search_value}%' OR lower(datentime) like '%${search_value}%') AND  documents_id=${document_type}  `;

//     const result = await DBQuery(query);

//     res.status(200).json({
//       success: true,
//       data: result,
//     });
//   }
// );
//search without filter

module.exports = Search_Route;
