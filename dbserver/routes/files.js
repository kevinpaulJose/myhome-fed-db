var express = require("express");
var router = express.Router();
var sql = require("mssql");

/* GET users listing. */
router.post("/upload", function (req, res, next) {
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
        .input("pFileType", sql.VarChar(16), req.body.filetype)
        .input("pFileName", sql.VarChar(20), req.body.filename)
        .input("pFilePath", sql.VarChar(50), req.body.filepath)
        .input("pFileUrl", sql.VarChar(50), req.body.fileurl)
        .input("pLanguage", sql.VarChar(20), req.body.language)
        .output("responseMessage", sql.VarChar(50))
        .execute("AddFiles");
    })
    .then((result) => {
      console.dir(result);
      console.log(result);
      if (result.output.responseMessage == "Success") {
        res.send({
          response: true,
          message: "File uploaded Successfully",
        });
      } else {
        res.send({
          response: false,
          message: "FIle upload Failed",
          output: result.output.responseMessage,
        });
      }
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
      return pool
        .request()
        .input("pLoginName", sql.VarChar(20), req.body.username)
        .execute("FetchFilesByLogin");
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

router.get("/show", function (req, res, next) {
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
        .input("pFilePath", sql.VarChar(50), req.body.filepath)
        .execute("fetchFilesByPath");
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
        .input("pFileName", sql.VarChar(16), req.body.filename)
        .execute("FetchFilesByName");
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

router.get("/filetype", function (req, res, next) {
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
        .input("pFileType", sql.VarChar(16), req.body.filetype)
        .execute("FetchFilesByType");
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

router.delete("/delete", function (req, res, next) {
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
        .input("pFileID", sql.VarChar(16), req.body.fileid)
        .output("responseMessage", sql.VarChar(50))
        .execute("DeleteSingleFromFiles");
    })
    .then((result) => {
      console.dir(result);
      console.log(result);
      if (result.output.responseMessage == "Success") {
        res.send({
          response: true,
          message: "Deleted Successfully",
        });
      } else {
        res.send({
          response: false,
          message: "Delete Failed",
          responseMessage: result.output.responseMessage,
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.delete("/deleteAll", function (req, res, next) {
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
        .output("responseMessage", sql.VarChar(50))
        .execute("DeleteFromFiles");
    })
    .then((result) => {
      console.dir(result);
      console.log(result);
      if (result.output.responseMessage == "Success") {
        res.send({
          response: true,
          message: "Deleted Successfully",
        });
      } else {
        res.send({
          response: false,
          message: "Delete Failed",
          responseMessage: result.output.responseMessage,
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.put("/updateWatch", function (req, res, next) {
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
        .input("pFileID", sql.Int, req.body.fileid)
        .input("pIsWatched", sql.Int, req.body.iswatched)
        .output("responseMessage", sql.VarChar(50))
        .execute("UpdateWatch");
    })
    .then((result) => {
      console.dir(result);
      console.log(result);
      if (result.output.responseMessage == "Success") {
        res.send({
          response: true,
          message: "Updated Successfully",
        });
      } else {
        res.send({
          response: false,
          message: "UpdateFailed",
          responseMessage: result.output.responseMessage,
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.put("/updateFile", function (req, res, next) {
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
        .input("pFileID", sql.Int, req.body.fileid)
        .input("pFileName", sql.VarChar(50), req.body.filename)
        .output("responseMessage", sql.VarChar(50))
        .execute("UpdateFile");
    })
    .then((result) => {
      console.dir(result);
      console.log(result);
      if (result.output.responseMessage == "Success") {
        res.send({
          response: true,
          message: "Updated Successfully",
        });
      } else {
        res.send({
          response: false,
          message: "UpdateFile",
          responseMessage: result.output.responseMessage,
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
});

module.exports = router;
