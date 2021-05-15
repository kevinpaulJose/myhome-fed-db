var express = require("express");
var router = express.Router();
var sql = require("mssql");

/* GET users listing. */
router.get("/", function (req, res, next) {
  var config = {
    user: "kevin",
    password: "password",
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
        .input("pLoginName", sql.VarChar(20), req.body.username)
        .input("pPassword", sql.VarChar(16), req.body.password)
        .output("responseMessage", sql.VarChar(50))
        .execute("Login");
    })
    .then((result) => {
      console.dir(result);
      console.log(result);
      if (result.output.responseMessage == "User successfully logged in")
        res.send({
          response: true,
          message: "Logged in Successfully",
        });
      res.send({
        response: false,
        message: "Login Failed",
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get("/names", function (req, res, next) {
  var config = {
    user: "kevin",
    password: "password",
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
        .input("pLoginName", sql.VarChar(20), req.body.username)
        .execute("getLoginNames");
    })
    .then((result) => {
      console.dir(result);
      console.log(result);
      res.send(result.recordset);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.post("/reset", function (req, res, next) {
  var config = {
    user: "kevin",
    password: "password",
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
  var config = {
    user: "kevin",
    password: "password",
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
