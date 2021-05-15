var express = require("express");
var multer = require("multer");
var router = express.Router();
const mkdirp = require("mkdirp");

router.post("/", function (req, res, next) {
  var path = req.headers.filepath.split(" ").join("_");
  mkdirp("../public" + path).then((made) => {
    console.log(made);
    var storage = multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, "../public" + path);
      },
      filename: function (req, file, callback) {
        callback(null, file.originalname.split(" ").join("_"));
      },
    });

    var upload = multer({ storage: storage }).array("userFile", 20);
    upload(req, res, function (err) {
      if (err) {
        return res.send({
          error: err.message,
          response: "ERROR",
          req: req,
        });
      }
      res.send({
        response: "UPLOADED",
        req: req.files,
      });
    });
  });
});

module.exports = router;
