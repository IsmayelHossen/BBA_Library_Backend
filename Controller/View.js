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
  res.status(200).json({
    success: true,
    data: result,
  });
});
View_Route.get("/getbooks", async function (req, res) {
  const query = `SELECT*from books`;
  const result = await DBQuery(query);
  res.status(200).json({
    success: true,
    data: result,
  });
});

View_Route.get("/getbookPendingRequest", async function (req, res) {
  const query = `SELECT sendrequest.*,books.*,employees.* from sendrequest 
  join books on  sendrequest.book_id=books.book_num
  join employees on sendrequest.emp_id=employees.id where sendrequest.status=0
  `;
  const result = await DBQuery(query);
  res.status(200).json({
    success: true,
    data: result,
  });
});
//user
View_Route.get(
  "/getbookPendingRequest_user/:emp_id",
  async function (req, res) {
    const query = `SELECT sendrequest.*,books.*,employees.* from sendrequest 
  join books on  sendrequest.book_id=books.book_num
  join employees on sendrequest.emp_id=employees.id where employees.id=${req.params.emp_id}
  `;
    const result = await DBQuery(query);
    res.status(200).json({
      success: true,
      data: result,
    });
  }
);
//getbookAcceptRequest
View_Route.get("/getbookAcceptRequest", async function (req, res) {
  const query = `SELECT sendrequest.*,books.*,employees.* from sendrequest 
  join books on  sendrequest.book_id=books.book_num
  join employees on sendrequest.emp_id=employees.id where sendrequest.status=1
  `;
  const result = await DBQuery(query);
  res.status(200).json({
    success: true,
    data: result,
  });
});
//getbookrentstatus
View_Route.get("/getbookrentstatus", async function (req, res) {
  const query = `SELECT books.*,employees.*,bookrent.* from bookrent
  join books on  bookrent.book_id=books.book_num
  join employees on bookrent.emp_id=employees.id
  `;

  const result = await DBQuery(query);
  res.status(200).json({
    success: true,
    data: result,
  });
});
View_Route.get("/getbookpreviousstatus/:emp_id", async function (req, res) {
  const query = `SELECT books.*,employees.*,bookrent.* from bookrent
  join books on  bookrent.book_id=books.book_num
  join employees on bookrent.emp_id=employees.id where employees.id=${req.params.emp_id}
  `;

  const result = await DBQuery(query);
  res.status(200).json({
    success: true,
    data: result,
  });
});

//getemployee_previous_bookRecord
View_Route.get(
  "/getemployee_previous_bookRecord/:employee_id",
  async function (req, res) {
    console.log(req.params.employee_id);
    const query = `SELECT*FROM bookrent where emp_id=${req.params.employee_id} `;
    const result = await DBQuery(query);
    console.log(result);
    res.status(200).json({
      success: true,
      data: result,
    });
  }
);
// getAdditionalTimerequest
View_Route.get("/getAdditionalTimerequest", async function (req, res) {
  const query = `SELECT distinct bookrent_id FROM additionaltime where status=0 `;
  const result = await DBQuery(query);
  console.log(result);
  res.status(200).json({
    success: true,
    data: result,
  });
});
//getAdditionalTimeRequestAll
View_Route.get("/getAdditionalTimeRequestAll", async function (req, res) {
  const query = `SELECT books.*,employees.*,bookrent.*,additionaltime.* from bookrent
  join books on  bookrent.book_id=books.book_num
  join employees on bookrent.emp_id=employees.id 
  join additionaltime on additionaltime.bookrent_id=bookrent.id 
  `;
  const result = await DBQuery(query);
  console.log(result);
  res.status(200).json({
    success: true,
    data: result,
  });
});
// getAdditionalTimeRequestSingle

View_Route.get(
  "/getAdditionalTimeRequestSingle/:bookrent_id",
  async function (req, res) {
    const query = `SELECT books.*,employees.*,bookrent.*,additionaltime.* from bookrent
  join books on  bookrent.book_id=books.book_num
  join employees on bookrent.emp_id=employees.id 
  join additionaltime on additionaltime.bookrent_id=bookrent.id where bookrent.id=${req.params.bookrent_id}
  `;
    const result = await DBQuery(query);
    console.log(result);
    res.status(200).json({
      success: true,
      data: result,
    });
  }
);
module.exports = View_Route;
