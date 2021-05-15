var express = require("express");
var router = express.Router();
const fs = require("fs");

/* GET home page. */
router.put("/", function (req, res, next) {
  var old_path = "../public" + req.body.oldpath;
  var new_path = "../public" + req.body.newpath;
  fs.rename(old_path, new_path, (err) => {
    if (err) {
      res.send({
        message: err.message,
        response: "Error",
      });
    } else {
      res.send({
        response: "Success",
      });
    }
  });
});

module.exports = router;
