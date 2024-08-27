/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const { BookModel } = require('../database.js')

module.exports = function (app) {
  //BookModel.deleteMany().exec();

  app.route('/api/books')
    .get(function (req, res){ // get all books
      BookModel.find({}, '-comments -__v')
      .then(books => {
        console.log(`GET - Found ${books.length} books:\n\t ${JSON.stringify(books)}`);
        res.json(books);
      })
    })
    
    .post(function (req, res){ // create a book
      let title = req.body.title || req.query.title;
      if(title === undefined) {
        console.log(`POST - Missing required field title`);
        res.json("missing required field title");
        return;
      }
      let book = new BookModel({title});
      book.save()
      .then(book => {
        console.log(`POST - Added new book title: ${title}`);
        res.json(book);
      })
    })
    
    .delete(function(req, res){ // delete all books
      BookModel.deleteMany()
      .then(() => {
        console.log(`DELETE - Deleted all books`);
        res.json("complete delete successful");
      })
    });



  app.route('/api/books/:id')
    .get(function (req, res){ // find a book
      let bookid = req.params.id;
      if(bookid === undefined) {
        console.log(`GET - Missing required field id`);
        res.json("missing required field id");
        return;
      }

      BookModel.findById(bookid, "-commentcount -__v")
      .then(book => {
        console.log("book " + JSON.stringify(book))
        if(!book) {
          console.log(`GET - book not found: ${bookid}`);
          res.json("no book exists")
          return;
        }

        console.log(`GET - Found the book:\n\t ${JSON.stringify(book)}`)
        res.json(book);
      })
      .catch(err => {
        console.log(`GET - book not found: ${bookid}`);
        res.json("no book exists")
      })
    })
    
    .post(function(req, res){ // add a comment to a book
      let bookid = req.params.id;
      
      if(bookid === undefined) {
        console.log(`POST - Missing required field id`);
        res.json("missing required field id");
        return;
      }

      let comment = req.body.comment || req.query.comment;
      
      if(comment === undefined) {
        console.log(`POST - Missing required field comment`);
        res.json("missing required field comment");
        return;
      }

      BookModel.findByIdAndUpdate(bookid,
        {
          $inc: { commentcount: 1 },
          $push: { comments: comment }
        },
        { new: true })
      .select("-commentcount -__v")
      .then(book => {
        if(!book) {
          console.log(`POST - book not found: ${bookid}`);
          res.json("no book exists")
          return;
        }

        console.log(`POST - Added comment to a book:\n\t ${JSON.stringify(book)}`)
        res.json(book);
      })
      .catch(err => {
        console.log(`POST - book not found: ${bookid}`);
        res.json("no book exists")
      })
    })
    
    .delete(function(req, res){ // delete a book
      let bookid = req.params.id;
      
      if(bookid === undefined) {
        console.log(`GET - Missing required field id`);
        res.json("missing required field id");
        return;
      }

      BookModel.findByIdAndDelete(bookid)
      .then(book => {
        if(!book) {
          console.log(`DELETE - book not found: ${bookid}`);
          res.json("no book exists")
          return;
        }
        console.log(`DELETE - Deleted book id: ${bookid}`);
        res.json("delete successful");
      })
      .catch(err => {
        console.log(`DELETE - book not found: ${bookid}`);
        res.json("no book exists")
      })
    });
  
};
