var express = require("express");
var router = express.Router();
var sql = require("mysql");

/* GET users listing. */
router.get("/", function (req, res, next) {
  var user = req.body.user;
  var password = req.body.password;
  var server = req.body.server;
  var config = {
    user: user,
    password: password,
    host: server, // You can use 'localhost\\instance' to connect to named instance
    database: "myhome",
    options: {
      trustedConnection: true,
      encrypt: true,
      enableArithAbort: true,
      trustServerCertificate: true,
    },
  };
  let connection = sql.createConnection(config);
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
  var user = req.body.user;
  var password = req.body.password;
  var server = req.body.server;
  var config = {
    user: user,
    password: password,
    host: server, // You can use 'localhost\\instance' to connect to named instance
    database: "myhome",
    options: {
      trustedConnection: true,
      encrypt: true,
      enableArithAbort: true,
      trustServerCertificate: true,
    },
  };

  let connection = sql.createConnection(config);
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
  var user = req.body.user;
  var password = req.body.password;
  var server = req.body.server;
  var config = {
    user: user,
    password: password,
    host: server, // You can use 'localhost\\instance' to connect to named instance
    database: "myhome",
    options: {
      trustedConnection: true,
      encrypt: true,
      enableArithAbort: true,
      trustServerCertificate: true,
    },
  };

  let connection = sql.createConnection(config);
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
