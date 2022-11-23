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
//book request status rent admin
Search_Route.get("/bookrentStatus_admin/:search", async function (req, res) {
  const search = req.params.search;
  const query = `SELECT bookrent.*,books.*,employees.* from bookrent 
  join books on  bookrent.book_id=books.book_num
  join employees on bookrent.emp_id=employees.id where lower(books.category_name) like '%${search}%' OR books.book_num like '%${search}%' OR lower(books.title) like '%${search}%' OR lower(books.author) like '%${search}%' OR lower(bookrent.status) like '%${search}%' OR lower(employees.name) like '%${search}%' 
  `;

  const result = await DBQuery(query);
  console.log(result);
  res.status(200).json({
    success: true,
    data: result,
  });
});
Search_Route.get(
  "/bookrequeststatus_user/:search/:emp_id",
  async function (req, res) {
    const search = req.params.search;
    const query = `SELECT sendrequest.*,books.*,employees.* from sendrequest 
  join books on  sendrequest.book_id=books.book_num
  join employees on sendrequest.emp_id=employees.id where (lower(books.category_name) like '%${search}%' OR books.book_num like '%${search}%' OR lower(books.publisher_name) like '%${search}%' OR lower(books.title) like '%${search}%' OR lower(books.author) like '%${search}%' OR lower(books.author) like '%${search}%') AND employees.id=${req.params.emp_id}
  `;

    const result = await DBQuery(query);
    console.log(result);
    res.status(200).json({
      success: true,
      data: result,
    });
  }
);
// all Bookrequest_pending_admin
Search_Route.get(
  "/Bookrequest_pending_admin/:search",
  async function (req, res) {
    console.log(req.params.search);
    const search = req.params.search;
    const query = `SELECT sendrequest.*,books.*,employees.* from sendrequest 
  join books on  sendrequest.book_id=books.book_num
  join employees on sendrequest.emp_id=employees.id where (lower(books.category_name) like '%${search}%' OR books.book_num like '%${search}%' OR lower(books.publisher_name) like '%${search}%' OR lower(books.title) like '%${search}%' OR lower(books.author) like '%${search}%' OR lower(books.author) like '%${search}%' OR lower(employees.name) like '%${search}%') AND sendrequest.status=0
  `;

    const result = await DBQuery(query);
    console.log(result);
    res.status(200).json({
      success: true,
      data: result,
    });
  }
);
Search_Route.get("/BookRequestAccept_admin/:search", async function (req, res) {
  console.log(req.params.search);
  const search = req.params.search;
  const query = `SELECT sendrequest.*,books.*,employees.* from sendrequest 
  join books on  sendrequest.book_id=books.book_num
  join employees on sendrequest.emp_id=employees.id where (lower(books.category_name) like '%${search}%' OR books.book_num like '%${search}%' OR lower(books.publisher_name) like '%${search}%' OR lower(books.title) like '%${search}%' OR lower(books.author) like '%${search}%' OR lower(books.author) like '%${search}%' OR lower(employees.name) like '%${search}%') AND sendrequest.status=1
  `;

  const result = await DBQuery(query);
  console.log(result);
  res.status(200).json({
    success: true,
    data: result,
  });
});
//All  BookRequestAccept_admin
// categoriesBook user
Search_Route.get("/categoriesBook/:search", async function (req, res) {
  const search = req.params.search;
  const query = `SELECT*FROM books where lower(category_name) like '%${search}%' OR lower(publisher_name) like '%${search}%' OR lower(title) like '%${search}%' OR book_num like '%${search}%' OR lower(author) like '%${search}%' `;
  const result = await DBQuery(query);
  console.log(result);
  res.status(200).json({
    success: true,
    data: result,
  });
});
// categoriesBook_user
Search_Route.get("/categoriesBook_user/:search", async function (req, res) {
  const search = req.params.search;
  const query = `SELECT*FROM categories where lower(category_name) like '%${search}%'`;
  const result = await DBQuery(query);
  console.log(result);
  res.status(200).json({
    success: true,
    data: result,
  });
});

// previousRecord_user
Search_Route.get(
  "/previousRecord_user/:search/:emp_id",
  async function (req, res) {
    const search = req.params.search;
    const query = `SELECT bookrent.*,books.*,employees.* from bookrent 
  join books on  bookrent.book_id=books.book_num
  join employees on bookrent.emp_id=employees.id where (lower(books.category_name) like '%${search}%'OR lower(books.publisher_name) like '%${search}%'  OR books.book_num like '%${search}%' OR lower(books.title) like '%${search}%' OR lower(books.author) like '%${search}%') AND employees.id=${req.params.emp_id}
  `;

    const result = await DBQuery(query);
    console.log(result);
    res.status(200).json({
      success: true,
      data: result,
    });
  }
);

// booksearch
Search_Route.get("/booksearch/:search", async function (req, res) {
  const s = req.params;
  console.log(s);
  const query = `SELECT*FROM books where lower(category_name) like '%${s.search}%' OR lower(publisher_name) like '%${s.search}%' OR lower(title) like '%${s.search}%' OR book_num like '%${s.search}%' OR lower(author) like '%${s.search}%' OR lower(desk_number) like '%${s.search}%' `;

  const result = await DBQuery(query);
  res.status(200).json({
    success: true,
    data: result,
  });
});

module.exports = Search_Route;
