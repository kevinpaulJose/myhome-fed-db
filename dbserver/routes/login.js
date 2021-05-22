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
router.get("/", function (req, res, next) {
  let query = `CALL Login(?, @response);`;
  let get_res = `select @response as response;`;
  connection.query(query, [req.body.username], (err, rows) => {
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

router.get("/names", function (req, res, next) {
  let query = `call getLoginNames()`;
  connection.query(query, [], (err, rows) => {
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

router.post("/signup", function (req, res, next) {
  let query = `call AddUser(?,?,?,@response);`;
  let get_res = `select @response as response;`;
  connection.query(
    query,
    [req.body.username, req.body.firstname, req.body.lastname],
    (err, rows) => {
      if (err) {
        res.send([
          {
            response: "failed",
            message: err.message,
          },
        ]);
      } else {
        connection.query(get_res, [], (err, rows) => {
          if (err) {
            res.send([
              {
                response: "failed",
                message: err.message,
              },
            ]);
          } else {
            res.send([
              {
                response: "success",
              },
            ]);
          }
        });
      }
    }
  );
});

module.exports = router;
