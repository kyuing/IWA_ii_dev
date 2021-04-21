var express = require('express'),
	path = require('path'),
	multer = require('multer'),
	router = express.Router();


// set the root path
router.use(express.static(path.resolve(__dirname, 'views'))); //set the folder views as root path: serve static content from "views" folder 


var bookCtrl = require('./book-controller');  //ref to user-controller.js
router.post('/books', bookCtrl.createBook); //insert books or a book
router.get('/books', bookCtrl.getBooks);  //find all books
router.get('/books/:id', bookCtrl.getBook);  //find a book
router.put('/books/:id', bookCtrl.updateBook); //update a book
router.delete('/books/:id', bookCtrl.deleteBook); //delete a book
router.delete('/books', bookCtrl.deleteBooks);  //delete all books

module.exports = router;  // export router 
