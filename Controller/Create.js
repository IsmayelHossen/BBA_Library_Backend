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
  const type = "insert";
  const result2 = await DBQuery(query, type);
  res.status(200).json({
    success: true,
  });
});

Create_Route.post("/category", async function (req, res, next) {
  console.log(req.body);
  const query = `INSERT INTO  categories(category_name) VALUES('${req.body.category_name}')`;
  const type = "insert";
  const result2 = await DBQuery(query, type);
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
  const type = "insert";
  const result2 = await DBQuery(query, type);

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
    console.log(imagename);
    const query = `INSERT INTO  books(category_name,
      publisher_name,entry_date,book_num,title,author,volume_edition,publication_date,page_number,cost,source_date,
      desk_number,desk_floor,number_of_copy,available_copy,call_no,remark,image)
      VALUES('${category_name}','${publisher_name}','${entry_date}','${book_num}','${title}','${author}',
      '${volume_edition}','${publication_date}','${page_number}','${cost}','${source_date}','${desk_number}','${desk_floor}',
      '${book_copy}','${book_copy}','${call_no}','${remark}','${imagename}')`;
    const type = "insert";
    const result2 = await DBQuery(query, type);
    res.status(200).json({
      success: true,
    });
  });
});
Create_Route.post("/requestSend", async function (req, res, next) {
  const { bookNum, emplyee_id, request_date } = req.body;
  const query = `INSERT INTO  sendrequest(emp_id,book_id,status,request_date) VALUES('${emplyee_id}','${bookNum}',0,'${request_date}')`;
  const type = "insert";
  const result2 = await DBQuery(query, type);
  res.status(200).json({
    success: true,
  });
});
//AcceptbookIssue
Create_Route.post("/AcceptbookIssue", async function (req, res, next) {
  // console.log(req.body);
  const { book_id, emp_id, issue_date, realse_date, request_date } = req.body;
  const query = `INSERT INTO  bookrent(BOOK_ID,EMP_ID,ISSUE_DATE,RELEASE_DATE,STATUS) VALUES('${book_id}','${emp_id}','${issue_date}','${realse_date}','Service on going')`;
  const type = "insert";
  const result2 = await DBQuery(query, type);
  console.log(result2, "mnmn");
  if (result2) {
    const query23 = `SELECT*FROM books where book_num=${book_id}`;
    const result32 = await DBQuery(query23);
    const availabl = result32[0].AVAILABLE_COPY;
    const numberofcopy = result32[0].NUMBER_OF_COPY;
    console.log(numberofcopy, availabl);
    if (availabl > 0 && numberofcopy >= availabl) {
      const new_available = availabl - 1;
      const query42 = `UPDATE books set AVAILABLE_COPY=${new_available} WHERE book_num=${book_id}`;
      const result321 = await DBQuery(query42);
      const query420 = `UPDATE sendrequest set status=3 WHERE book_id=${book_id} and emp_id=${emp_id} AND request_date='${request_date}'`;
      const result320 = await DBQuery(query420);
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(200).json({
        success1: true,
      });
    }
  }
});

Create_Route.post("/additionalTimeRequest", async function (req, res, next) {
  console.log(req.body);
  const { id, newrelease_date, prevous_release_date, request_date } = req.body;
  const query = `INSERT INTO additionaltime(bookrent_id,request_date,pre_release_date,new_release_date,status) VALUES('${id}','${request_date}','${prevous_release_date}','${newrelease_date}','${0}')`;
  const type = "insert";
  const result2 = await DBQuery(query, type);
  res.status(200).json({
    success: true,
  });
});
module.exports = Create_Route;
