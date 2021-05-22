var express = require("express");
var router = express.Router();
var sql = require("mysql");

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
var connection = sql.createConnection(config);

/* GET users listing. */
router.post("/", function (req, res, next) {
  var user = req.body.user;
  var password = req.body.password;
  var server = req.body.server;
  var query = `CALL AddMedia(?,?,?,?,?, @response);`;
  var get_res = `select @response as response;`;
  connection.query(
    query,
    [
      req.body.username,
      req.body.showname,
      req.body.showpath,
      req.body.showtype,
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

router.put("/", function (req, res, next) {
  var user = req.body.user;
  var password = req.body.password;
  var server = req.body.server;
  var query = `CALL UpdateMedia(?,?,?, @response);`;
  var get_res = `select @response as response;`;
  connection.query(
    query,
    [req.body.showid, req.body.showname, req.body.showpath],
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

router.devare("/devareMedia", function (req, res, next) {
  var user = req.body.user;
  var password = req.body.password;
  var server = req.body.server;
  var query = `CALL DevareMedia(?,?,?, @response);`;
  var get_res = `select @response as response;`;
  connection.query(
    query,
    [req.body.showid, req.body.username, req.body.showpath],
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

router.post("/fetchByType", function (req, res, next) {
  console.log(req.body);
  var user = req.body.user;
  var password = req.body.password;
  var server = req.body.server;
  var query = `CALL fetchMediaByType(?,?);`;
  connection.query(
    query,
    [req.body.username, req.body.showtype],
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

router.post("/fetchByTypeAll", function (req, res, next) {
  var user = req.body.user;
  var password = req.body.password;
  var server = req.body.server;
  var query = `CALL fetchMediaByTypeAll(?);`;
  connection.query(query, [req.body.showtype], (err, rows) => {
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

router.post("/search", function (req, res, next) {
  var user = req.body.user;
  var password = req.body.password;
  var server = req.body.server;
  var query = `CALL searchMedia(?);`;
  connection.query(query, [req.body.showname], (err, rows) => {
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

module.exports = router;
