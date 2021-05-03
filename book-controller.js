/** refs
 * https://stackoverflow.com/questions/43256505/replacing-fs-readfile-with-fs-createreadstream-in-node-js
 * https://nodejs.org/en/knowledge/advanced/streams/how-to-use-fs-create-read-stream/
 * https://stackoverflow.com/questions/51841742/node-server-not-returning-any-response-after-api-request
 * https://stackoverflow.com/questions/52122677/how-to-refresh-form-page-after-post-request
 * https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
 * https://stackoverflow.com/questions/6158933/how-is-an-http-post-request-made-in-node-js
 * https://dev.to/moz5691/nodejs-and-ajax-4jb5
 * https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is
 * https://github.com/helpers/handlebars-helpers#eq
 */
const Book = require('./models/book'),
  fs = require('fs'),
  Handlebars = require("handlebars");


//get books
exports.getBooks = function (req, res) {
  // Book.find({}, function (err, books) {
  Book.find({}).lean().exec(function(err, books) {
    if (err) {
      res.status(400).json(err);
    }

    // console.log(__dirname)

    //init readStream
    let readStream = fs.createReadStream(__dirname + '/views/index.html')

    // When the stream is done being read, end res
    readStream.on('close', () => {
      res.end()
    })

    //get source handlbars template and compile it
    var source = fs.readFileSync('./views/js/my.handlebars', 'utf8');
    var template = Handlebars.compile(source);

    // console.log(books)

    //set an if helper for Handlebars
    Handlebars.registerHelper("if", function(a, b, options) {
      if (a == b) {
        return options.fn(this);
      }
    });
    readStream.pipe(res.end(template(books).toString())) // Stream chunks to response

    /************************
     * default res
    // res.json(books);
    // readStream.pipe(res.end(books.toString()))
    ************************/

  });
};


//post docs or a docs
exports.createBook = function (req, res) {
  if (req.body.batch) {

    //can be used when necessary to insert many docs into db in postman only
    Book.insertMany(req.body.batch, function (err) {

      if (err)
        res.status(400).json(err);
      else
        res.json(req.body);
        // res.redirect('/')  //res.redirect('back')
    });

  } else {
    // a single doc insertion
    var newbook = new Book(req.body);
    // console.log("newbook: " + newbook)

    newbook.save(function (err, book) {
      if (err) {
        res.status(400).json(err);
      }

      console.log("\nPOST the following book:\n" + book)
      // res.redirect('back')
      res.redirect('/')  //res.redirect('back')

    });
  }
};

//update a doc
exports.updateBook = function (req, res) {
  Book.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, book) {

    if (err) {
      res.status(400).json(err);
    }
    //res.json(book);
    console.log("\nPUT the following book:\n" + book)
    res.redirect('/')  //res.redirect('back')
  });
};

//delete a doc
exports.deleteBook = function (req, res) {

  Book.findByIdAndRemove(req.params.id, function (err, book) {
    if (err) {
      res.status(400).json(err);
    }
    // res.json(book);
    console.log("\nDELETED the following book:\n" + book)
    res.redirect('/')  //res.redirect('back')
  });

};

//not in use for now
//not designed to interact with front-end directly 
//but it can be used when testing to GET a doc in the postman
exports.getBook = function (req, res) {
  Book.findOne({ _id: req.params.id }, function (err, book) {
    if (err) {
      res.status(400).json(err);
    }
    //res.json(book);
    console.log(book)
    res.redirect('/')  //res.redirect('back')
  });
};

//not in use for now
//not designed to interact with front-end directly 
//but it can be used when testing to DELETE a bacth in the postman
exports.deleteBooks = function (req, res) {
  Book.deleteMany({}, function (err, book) {
    if (err) {
      res.status(400).json(err);
    }
    res.json(book);
  });
};