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
    server: server, // You can use 'localhost\\instance' to connect to named instance
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
      res.send(err.message);
    } else {
      connection.query(get_res, [], (err, rows) => {
        if (err) {
          res.send(err.message);
        } else {
          res.send(rows[0]);
        }
      });
    }
  });
});

router.get("/names", function (req, res, next) {
  var user = req.body.user;
  var password = req.body.password;
  var config = {
    user: user,
    password: password,
    server: "localhost", // You can use 'localhost\\instance' to connect to named instance
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
      res.send(err.message);
    } else {
      res.send(rows);
    }
  });
});

router.post("/reset", function (req, res, next) {
  var user = req.body.user;
  var password = req.body.password;
  var config = {
    user: user,
    password: password,
    server: "localhost", // You can use 'localhost\\instance' to connect to named instance
    database: "myhome",
    options: {
      trustedConnection: true,
      encrypt: true,
      enableArithAbort: true,
      trustServerCertificate: true,
    },
  };

  sql.on("error", (err) => {
    console.log("ERROR on CONNECTION");
  });

  sql
    .connect(config)
    .then((pool) => {
      // Query
      console.log("SERVER CONNECTED");
      return pool
        .request()
        .input("pLogin", sql.VarChar(20), req.body.username)
        .input("pPassword", sql.VarChar(16), req.body.password)
        .output("responseMessage", sql.VarChar(50))
        .execute("ResetPassword");
    })
    .then((result) => {
      console.dir(result);
      console.log(result);
      if (result.output.responseMessage == "Success") {
        res.send({
          response: true,
          message: "Password Reset successful",
        });
      } else {
        res.send({
          response: false,
          message: "Password Reset failed",
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.post("/signup", function (req, res, next) {
  var user = req.body.user;
  var password = req.body.password;
  var config = {
    user: user,
    password: password,
    server: "localhost", // You can use 'localhost\\instance' to connect to named instance
    database: "myhome",
    options: {
      trustedConnection: true,
      encrypt: true,
      enableArithAbort: true,
      trustServerCertificate: true,
    },
  };

  sql.on("error", (err) => {
    console.log("ERROR on CONNECTION");
  });

  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("loginname", sql.VarChar(20), req.body.username)
        .query("select * from USERS where LoginName = @loginname");
    })
    .then((result) => {
      if (result.recordset.toString() == "") {
        sql
          .connect(config)
          .then((pool) => {
            // Query
            console.log("SERVER CONNECTED");
            return pool
              .request()
              .input("pLogin", sql.VarChar(20), req.body.username)
              .input("pPassword", sql.VarChar(16), req.body.password)
              .input("pFirstName", sql.VarChar(16), req.body.firstname)
              .input("pLastName", sql.VarChar(16), req.body.lastname)
              .output("responseMessage", sql.VarChar(50))
              .execute("AddUser");
          })
          .then((result) => {
            console.dir(result);
            console.log(result);
            if (result.output.responseMessage == "Success")
              res.send({
                response: true,
                message: "User created",
              });
            res.send({
              response: false,
              message: "User creation failed",
            });
            //   res.send(result);
          })
          .catch((err) => {
            res.send({
              response: false,
              message: "User creation failed - " + err.message,
            });
          });
      } else {
        res.send({
          response: false,
          message: "User already Exists",
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
});

module.exports = router;
