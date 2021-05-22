var express = require("express");
var router = express.Router();
var sql = require("mysql");

var config = {
  user: "kevin",
  password: "kevin",
  host: "myhome.com", // You can use 'localhost\\instance' to connect to named instance
  database: "myhome",
  options: {
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};
var connection = sql.createConnection(config);

/* GET users listing. */
router.post("/upload", function (req, res, next) {
  let query = `CALL AddFiles(?,?,?,?,?,?, @response);`;
  let get_res = `select @response as response;`;
  connection.query(
    query,
    [
      req.body.username,
      req.body.filetype,
      req.body.filename,
      req.body.filepath,
      req.body.fileurl,
      req.body.language,
    ],
    (err, rows) => {
      if (err) {
        res.send({
          response: "failed",
          message: err.message,
        });
      } else {
        connection.query(get_res, [], (err, rows) => {
          if (err) {
            res.send({
              response: "failed",
              message: err.message,
            });
          } else {
            res.send({
              response: "success",
              rows: rows[0],
            });
          }
        });
      }
    }
  );
});

router.get("/search", function (req, res, next) {
  let query = `CALL FetchFilesByName(?);`;
  connection.query(query, [req.body.filename], (err, rows) => {
    if (err) {
      res.send({
        response: "failed",
        message: err.message,
      });
    } else {
      res.send({
        response: "success",
        rows: rows[0],
      });
    }
  });
});

router.post("/show", function (req, res, next) {
  let query = `CALL fetchFilesByPath(?,?);`;
  connection.query(
    query,
    [req.body.username, req.body.filepath],
    (err, rows) => {
      if (err) {
        res.send({
          response: "failed",
          message: err.message,
        });
      } else {
        res.send({
          response: "success",
          rows: rows[0],
        });
      }
    }
  );
});

router.delete("/delete", function (req, res, next) {
  let query = `CALL DeleteSingleFromFiles(?,?, @response);`;
  let get_res = `select @response as response;`;
  connection.query(query, [req.body.username, req.body.fileid], (err, rows) => {
    if (err) {
      res.send({
        response: "failed",
        message: err.message,
      });
    } else {
      connection.query(get_res, [], (err, rows) => {
        if (err) {
          res.send({
            response: "failed",
            message: err.message,
          });
        } else {
          res.send({
            response: "success",
            rows: rows[0],
          });
        }
      });
    }
  });
});

router.put("/updateFile", function (req, res, next) {
  let query = `CALL UpdateFile(?,?,?,@response);`;
  let get_res = `SELECT @response as response`;
  connection.query(
    query,
    [req.body.fileid, req.body.filename, req.body.fileurl],
    (err, rows) => {
      if (err) {
        res.send({
          response: "failed",
          message: err.message,
        });
      } else {
        connection.query(get_res, [], (err, rows) => {
          if (err) {
            res.send({
              response: "failed",
              message: err.message,
            });
          } else {
            res.send({
              response: "success",
              rows: rows[0],
            });
          }
        });
      }
    }
  );
});

module.exports = router;
