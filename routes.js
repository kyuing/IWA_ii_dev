var express = require('express'),
	path = require('path'),
	multer = require('multer'),
	router = express.Router();


// set the root path
router.use(express.static(path.resolve(__dirname, 'views'))); //set the folder views as root path: serve static content from "views" folder 


var bookCtrl = require('./book-controller');  
router.post('/books', bookCtrl.createBook); //post a doc
router.get('/books', bookCtrl.getBooks);  //get all docs
router.get('/books/:id', bookCtrl.getBook);  //get a doc
router.put('/books/:id', bookCtrl.updateBook); //put a doc
router.delete('/books/:id', bookCtrl.deleteBook); //delete a doc
router.delete('/books', bookCtrl.deleteBooks);  //delete all docs

module.exports = router;  // export router 
