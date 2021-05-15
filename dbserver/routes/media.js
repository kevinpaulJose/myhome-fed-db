var express = require("express");
var router = express.Router();
var sql = require("mssql");

/* GET users listing. */
router.post("/", function (req, res, next) {
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
        .input("pShowName", sql.VarChar(50), req.body.showname)
        .input("pShowPath", sql.VarChar(50), req.body.showpath)
        .input("pShowType", sql.VarChar(50), req.body.showtype)
        .output("responseMessage", sql.VarChar(50))
        .execute("AddMedia");
    })
    .then((result) => {
      console.dir(result);
      console.log(result);
      //   res.send(result);
      if (result.output.responseMessage == "Success")
        res.send({
          response: true,
          message: "Updated Successfully",
        });
      res.send({
        response: false,
        message: "Update Failed",
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.put("/", function (req, res, next) {
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
        .input("pShowID", sql.VarChar(50), req.body.showid)
        .input("pShowName", sql.VarChar(50), req.body.showname)
        .output("responseMessage", sql.VarChar(50))
        .execute("UpdateMedia");
    })
    .then((result) => {
      console.dir(result);
      console.log(result);
      //   res.send(result);
      if (result.output.responseMessage == "Success")
        res.send({
          response: true,
          message: "Updated Successfully",
        });
      res.send({
        response: false,
        message: "Update Failed",
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.delete("/deleteMedia", function (req, res, next) {
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
        .input("pShowID", sql.Int, req.body.showid)
        .input("pLoginName", sql.VarChar(16), req.body.username)
        .input("pShowPath", sql.VarChar(50), req.body.showpath)
        .output("responseMessage", sql.VarChar(50))
        .execute("DeleteMedia");
    })
    .then((result) => {
      console.dir(result);
      console.log(result);
      //   res.send(result);
      if (result.output.responseMessage == "Success")
        res.send({
          response: true,
          message: "Updated Successfully",
        });
      res.send({
        response: false,
        message: "Update Failed",
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get("/fetchByType", function (req, res, next) {
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
        .input("pLoginName", sql.VarChar(16), req.body.username)
        .input("pShowType", sql.VarChar(16), req.body.showtype)
        .execute("fetchMediaByType");
    })
    .then((result) => {
      console.dir(result);
      console.log(result);
      //   res.send(result);
      res.send(result.recordset);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get("/fetchByTypeAll", function (req, res, next) {
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
        .input("pShowType", sql.VarChar(16), req.body.showtype)
        .execute("fetchMediaByType");
    })
    .then((result) => {
      console.dir(result);
      console.log(result);
      //   res.send(result);
      res.send(result.recordset);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get("/allShows", function (req, res, next) {
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
        .input("pLoginName", sql.VarChar(16), req.body.username)
        .execute("fetchMedia");
    })
    .then((result) => {
      console.dir(result);
      console.log(result);
      //   res.send(result);
      res.send(result.recordset);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get("/search", function (req, res, next) {
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
        .input("pShowName", sql.VarChar(16), req.body.showname)
        .execute("searchMedia");
    })
    .then((result) => {
      console.dir(result);
      console.log(result);
      //   res.send(result);
      res.send(result.recordset);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get("/all", function (req, res, next) {
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
      return pool.request().execute("fetchAllMedia");
    })
    .then((result) => {
      console.dir(result);
      console.log(result);
      //   res.send(result);
      res.send(result.recordset);
    })
    .catch((err) => {
      console.log(err.message);
    });
});
module.exports = router;
