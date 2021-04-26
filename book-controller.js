/** refs
 * https://stackoverflow.com/questions/43256505/replacing-fs-readfile-with-fs-createreadstream-in-node-js
 * https://nodejs.org/en/knowledge/advanced/streams/how-to-use-fs-create-read-stream/
 * https://stackoverflow.com/questions/51841742/node-server-not-returning-any-response-after-api-request
 * https://stackoverflow.com/questions/52122677/how-to-refresh-form-page-after-post-request
 * https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
 * https://stackoverflow.com/questions/6158933/how-is-an-http-post-request-made-in-node-js
 * https://dev.to/moz5691/nodejs-and-ajax-4jb5
 */
const Book = require('./models/book'),
  fs = require('fs'),
  xmlParse = require('xslt-processor').xmlParse,
  xsltProcess = require('xslt-processor').xsltProcess,
  convert = require('xml-js');


//get books
exports.getBooks = function (req, res) {
  Book.find({}, function (err, books) {
    if (err) {
      res.status(400).json(err);
    }

    let readStream = fs.createReadStream(__dirname + '/views/index.html')

    // When the stream is done being read, end the response
    readStream.on('close', () => {
      res.end()
    })

    let result = returnResult(books);
    readStream.pipe(res.end(result.toString())) // Stream chunks to response

    /************************
     * default res
    // res.json(books);
    ************************/

  });
};

//function to categorize books OBJ by section and return a xml converted. 
function returnResult(books) {

  let FICTION = [],
    SF = [],
    IT = [];

  for (let i = 0; i < books.length; i++) {
    if (books[i]['name'] == "FICTION") {
      // console.log(books[i])
      FICTION.push(books[i])
    }
    if (books[i]['name'] == "SF") {
      // console.log(books[i])
      SF.push(books[i])
    }
    if (books[i]['name'] == "IT") {
      // console.log(books[i])
      IT.push(books[i])
    }
  }

  /**
   * DO JSON.stringify for each of the array OBJs.
   * this step is pretty much important to get necessary fields only in json docs each,
   * in the sense that the npm module 'xml-js' does xml <-> json convert,
   * but returns native values with full details.
   */
  let f = JSON.stringify(FICTION, null, 2);
  let sf = JSON.stringify(SF, null, 2);
  let it = JSON.stringify(IT, null, 2);
  let toReturn = toXml(f, sf, it);

  return toReturn;

}

//may need to do await async
//function to convert json to xml
function toXml(f, sf, it) {

  //prepare to write to a file in xml format
  //it is where the npm module 'xml-js' is used
  var options = { compact: true, ignoreComment: true, spaces: 6 };
  var xmlHead = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + '\n<books>\n';
  var xmlend = '\n</books>';
  var result = xmlHead +
    "<placeholder0>\n" + convert.json2xml(f, options) + "\n</placeholder0>" +
    "\n<placeholder1>\n" + convert.json2xml(sf, options) + "\n</placeholder1>" +
    "\n<placeholder2>\n" + convert.json2xml(it, options) + "\n</placeholder2>" +
    xmlend;

  //refine all to be in xml format properly as needed
  var regx1 = new RegExp("<[0-9]*>", "gm"),
    regx2 = new RegExp("</[0-9]*>", "gm"),
    regx3 = new RegExp("^<placeholder0>$", "gm"),
    regx4 = new RegExp("^</placeholder0>$", "gm"),
    regx5 = new RegExp("^<placeholder1>$", "gm"),
    regx6 = new RegExp("^</placeholder1>$", "gm"),
    regx7 = new RegExp("^<placeholder2>$", "gm"),
    regx8 = new RegExp("^</placeholder2>$", "gm");

  result = result.replace(regx1, '    <entree>')
  result = result.replace(regx2, '    </entree>')
  result = result.replace(regx3, ' <section name="Fiction">')
  result = result.replace(regx4, ' </section>')
  result = result.replace(regx5, ' <section name="SF">')
  result = result.replace(regx6, ' </section>')
  result = result.replace(regx7, ' <section name="IT">')
  result = result.replace(regx8, ' </section>')

  //write to a file in xml format
  fs.writeFileSync('./xmlxsl/Books.xml', result);
  var xml = fs.readFileSync('./xmlxsl/Books.xml', 'utf8'); //read the xml written
  var xsl = fs.readFileSync('./xmlxsl/Books.xsl', 'utf8'); //read pre-defined xsl
  var doc = xmlParse(xml); //Parsing our XML file
  var stylesheet = xmlParse(xsl); //Parsing our XSL file
  return xsltProcess(doc, stylesheet); //return XSL Transformation

}

//post books or a book
exports.createBook = function (req, res) {
  if (req.body.batch) {

    //can be used when necessary to insert many docs into db in postman only
    Book.insertMany(req.body.batch, function (err) {
      if (err)
        res.status(400).json(err);
      else
        res.json(req.body);
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
      res.redirect('/')  //res.redirect('back')

    });
  }
};

//update a book
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

//delete a book
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

//not in use for front-end
//not designed to interact with front-end directly 
//but it can be used when needing to GET a doc in the postman
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

//not in use for front-end
//not designed to interact with front-end directly 
//but it can be used when needing to deleting a bacth in the postman
exports.deleteBooks = function (req, res) {
  Book.deleteMany({}, function (err, book) {
    if (err) {
      res.status(400).json(err);
    }
    res.json(book);
  });
};
