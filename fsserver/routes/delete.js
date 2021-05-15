var express = require("express");
var router = express.Router();
const fs = require("fs");

/* GET home page. */
router.delete("/", function (req, res, next) {
  var type = req.body.type;
  var path = "../public" + req.body.path;
  if (type == "dir") {
    fs.rmdir(path, { recursive: true }, (err) => {
      if (err) {
        res.send({
          response: "Error",
          message: err.message,
        });
      } else {
        res.send({
          response: "Success",
        });
      }
    });
  } else if (type == "file") {
    fs.unlink(path, (err) => {
      if (err) {
        res.send({
          response: "Error",
          message: err.message,
        });
      } else {
        res.send({
          response: "Success",
        });
      }
    });
  }
});

module.exports = router;
