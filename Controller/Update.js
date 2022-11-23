const express = require("express");
const Update_Route = express.Router();
const mysql = require("mysql");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const DBQuery = require("../Database/Query_Builder");

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
//sentrequest_reply
Update_Route.put("/sentrequest_reply/:emp_id", async function (req, res) {
  const emp_id = req.params.emp_id;
  const { book_id, request_date, declined, request_status } = req.body;
  console.log(req.body);
  const query = `UPDATE sendrequest SET status='${request_status}',DECLINED_MSG='${declined}' WHERE  book_id=${book_id}
  AND emp_id='${emp_id}' AND REQUEST_DATE='${request_date}' `;
  const result = await DBQuery(query);
  res.status(200).json({
    success: true,
    data: result,
  });
});
//IssuebookReturn
Update_Route.put("/IssuebookReturn/:emp_id", async function (req, res) {
  const emp_id = req.params.emp_id;
  const { book_id, issue_date, receive_date, remark } = req.body;
  console.log(req.body);
  const query = `UPDATE bookrent SET RECEIVE_DATE='${receive_date}',status='Release',remark1='${remark}' WHERE  book_id=${book_id}
  AND emp_id='${emp_id}' AND ISSUE_DATE='${issue_date}' `;
  const result = DBQuery(query);
  if (result) {
    const query2 = `select*from books where book_num=${book_id}`;
    const result2 = await DBQuery(query2);

    var new_available = result2[0].AVAILABLE_COPY + 1;
    const query3 = `update books set AVAILABLE_COPY=${new_available} WHERE  book_num=${book_id}`;
    const result3 = await DBQuery(query3);
    res.status(200).json({
      success: true,
      data: result,
    });
  }
});
//IssuebookRenew
Update_Route.put("/IssuebookRenew/:id", async function (req, res) {
  const id = req.params.id;
  console.log(id);
  const {
    previous_release_date,
    new_release_date,
    request_status,
    dclined,
    bookrent_id,
  } = req.body;
  console.log(req.body);
  if (request_status == 1) {
    const query = `UPDATE additionaltime SET NEW_RELEASE_DATE='${new_release_date}',status='${request_status}' WHERE  id=${id} `;
    const result = DBQuery(query);
    if (result) {
      const query3 = `update bookrent set release_date='${new_release_date}' WHERE  id='${bookrent_id}'`;
      const result3 = await DBQuery(query3);
      res.status(200).json({
        success: true,
        data: result3,
      });
    }
  } else {
    const query = `UPDATE additionaltime SET NEW_RELEASE_DATE='${new_release_date}',status='${request_status}',remark3='${dclined}' WHERE  id=${id} `;
    const result = DBQuery(query);
    res.status(200).json({
      success: true,
      data: result,
    });
  }
});

// Updatebook_withImage

Update_Route.put("/Updatebook_withImage/:id/:image", async function (req, res) {
  uploadFile_books(req, res, async function (err) {
    if (err) {
      console.log(err);
      return res.status(200).send({ status: 400, message: err.message });
    }
    const { id, image } = req.params;
    console.log(id, image);
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

      call_no,
      remark,
    } = req.body;
    console.log(req.body);
    const imagename = req.files[0].filename;
    let book_copy = parseInt(req.body.book_copy);
    let available_copy = parseInt(req.body.available_copy);
    const query = `UPDATE books SET category_name='${category_name}',publisher_name='${publisher_name}',entry_date='${entry_date}',
    book_num=${book_num},title='${title}',author='${author}',volume_edition= '${volume_edition}',publication_date= '${publication_date}',
    page_number=${page_number},cost=${cost},source_date='${source_date}',desk_number=${desk_number},desk_floor=${desk_floor},
   call_no='${call_no}',remark='${remark}',image='${imagename}' where id=${id} `;

    const result2 = await DBQuery(query);
    if (image != null) {
      const filepath = `public/uploadDoc/${image}`;
      await fs.unlink(filepath, () => {
        res.status(200).json({
          success: true,
          message: "Deleted data suceessfully",
        });
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Deleted data suceessfully",
      });
    }
  });
});

Update_Route.put("/book/:id", async function (req, res) {
  // const id = req.params.id;
  // console.log(req.body);
  const { id } = req.params;
  console.log(id);
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

    call_no,
    remark,
  } = req.body;
  // let book_copy = parseInt(req.body.book_copy);
  // let available_copy = parseInt(req.body.available_copy);
  const query = `UPDATE books SET category_name='${category_name}',publisher_name='${publisher_name}',entry_date='${entry_date}',
  book_num=${book_num},title='${title}',author='${author}',volume_edition= '${volume_edition}',publication_date= '${publication_date}',
  page_number=${page_number},cost=${cost},source_date='${source_date}',desk_number=${desk_number},desk_floor=${desk_floor},
 call_no='${call_no}',remark='${remark}' where id=${id} `;
  const result2 = await DBQuery(query);
  res.status(200).json({
    success: true,
  });
});
module.exports = Update_Route;
