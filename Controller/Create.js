const express = require("express");
const Create_Route = express.Router();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const DBQuery = require("../Database/Query_Builder");
//database
var a;
var b;
var c;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploadDoc/");
  },
  filename: (req, file, cb) => {
    const fileext = path.extname(file.originalname);

    // if(req.body.id&& req.body.name){
    //       const a = document_id_result[0].id;
    // }
    // else{
    //     const a = req.body.id

    // }

    const filename =
      file.originalname.replace(fileext, "_").toLowerCase() +
      new Date().getTime();
    cb(null, filename + fileext);
  },
});
const upload = multer({
  storage: storage,
});
// const uploadSingleImage = upload.array("documents");
const uploadFile_books = upload.array("image");

Create_Route.post("/publisher", async function (req, res, next) {
  console.log(req.body);
  const query = `INSERT INTO  publishers(publisher_name) VALUES('${req.body.publisher_name}')`;
  const result2 = await DBQuery(query);
  res.status(200).json({
    success: true,
  });
});

Create_Route.post("/category", async function (req, res, next) {
  console.log(req.body);
  const query = `INSERT INTO  categories(category_name) VALUES('${req.body.category_name}')`;
  const result2 = await DBQuery(query);
  res.status(200).json({
    success: true,
  });
});
Create_Route.post("/book_add", async function (req, res, next) {
  console.log(req.body);
  const {
    category_name,
    publisher_name,
    entry_date,
    book_num,
    title,
    author,
    volume_edition,
    publication_date,
    page_number,
    cost,
    source_date,
    desk_number,
    desk_floor,
    book_copy,
    call_no,
    remark,
  } = req.body;
  const query = `INSERT INTO  books(category_name,
    publisher_name,entry_date,book_num,title,author,volume_edition,publication_date,page_number,cost,source_date,
    desk_number,desk_floor,number_of_copy,available_copy,call_no,remark) 
    VALUES('${category_name}','${publisher_name}','${entry_date}','${book_num}','${title}','${author}',
    '${volume_edition}','${publication_date}','${page_number}','${cost}','${source_date}','${desk_number}','${desk_floor}',
    '${book_copy}','${book_copy}','${call_no}','${remark}')`;
  const result2 = await DBQuery(query);
  res.status(200).json({
    success: true,
  });
});
// book add with image

Create_Route.post("/book_add_withImage", async function (req, res, next) {
  uploadFile_books(req, res, async function (err) {
    if (err) {
      console.log(err);
      return res.status(200).send({ status: 400, message: err.message });
    }

    const {
      category_name,
      publisher_name,
      entry_date,
      book_num,
      title,
      author,
      volume_edition,
      publication_date,
      page_number,
      cost,
      source_date,
      desk_number,
      desk_floor,
      book_copy,
      call_no,
      remark,
    } = req.body;
    const imagename = req.files[0].filename;
    // console.log(imagename);
    const query = `INSERT INTO  books(category_name,
      publisher_name,entry_date,book_num,title,author,volume_edition,publication_date,page_number,cost,source_date,
      desk_number,desk_floor,number_of_copy,available_copy,call_no,remark,image)
      VALUES('${category_name}','${publisher_name}','${entry_date}','${book_num}','${title}','${author}',
      '${volume_edition}','${publication_date}','${page_number}','${cost}','${source_date}','${desk_number}','${desk_floor}',
      '${book_copy}','${book_copy}','${call_no}','${remark}','${imagename}')`;
    const result2 = await DBQuery(query);
    res.status(200).json({
      success: true,
    });
  });
});
module.exports = Create_Route;
