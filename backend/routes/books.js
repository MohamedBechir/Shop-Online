const express = require("express");
const multer = require("multer");

const Book = require("../models/book");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "/",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const book = new Book({
      title: req.body.title,
      content: req.body.content,
      price: req.body.price,
      imagePath: url + "/images/" + req.file.filename,
      creator: req.userData.userId
    });
    book.save().then(createdBook => {
      res.status(201).json({
        message: "Book added successfully",
        book: {
          ...createdBook,
          id: createdBook._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "adding a book failed!"
      });
    });
  }
);

router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const book = new Book({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      price: req.body.price,
      imagePath: imagePath,
      creator: req.userData.userId
    });
    Book.updateOne(
      { _id: req.params.id, creator: req.userData.userId },
      book
    ).then(result => {
      if (result.nModified > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "could not update book"
      });
    });
  }
);

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const bookQuery = Book.find();
  let fetchedBooks;
  if (pageSize && currentPage) {
    bookQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  bookQuery
    .then(documents => {
      fetchedBooks = documents;
      return Book.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Books fetched successfully!",
        books: fetchedBooks,
        maxBooks: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "fetching books failed!"
      });
    });
});

router.get("/:id", (req, res, next) => {
  Book.findById(req.params.id).then(book => {
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found!" });
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "fetching book failed!"
    });
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Book.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
    result => {
      //console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    }
  )
  .catch(error => {
    res.status(500).json({
      message: "fetching books failed!"
    });
  });
});

module.exports = router;
