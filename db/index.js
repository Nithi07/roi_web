const oracledb = require('oracledb');
const dbConfig = require('../config/index.js');
const numRows = 100;
oracledb.fetchAsBuffer = [ oracledb.BLOB ];
async function initialize() {
  await oracledb.createPool(dbConfig.dbPool).then((result)=>{
      console.log('DB Connected');
  }).catch((error)=>{
    console.log('DB Not Connected');
    process.exit(1);
  });
}

module.exports.initialize = initialize;

async function close() {
  await oracledb.getPool().close();
}

module.exports.close = close;

function statementExecute(statement, binds = [], opts = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;

    opts.outFormat = oracledb.OBJECT;
    opts.autoCommit = true;

    try {
      conn = await oracledb.getConnection();

      const result = await conn.execute(statement, binds, opts);

      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) { // conn assignment worked, need to close
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}

module.exports.statementExecute = statementExecute;

function StoreProcedureExecute(statement, params = {}) {
  return new Promise(async (resolve, reject) => {
    let conn;
    try {
      conn = await oracledb.getConnection();
      const result = await conn.execute(statement.query, statement.params);
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (conn) { // conn assignment worked, need to close
        try {
          await conn.close();
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}


module.exports.insertStoreProcedureExecute = function(req,res){
  oracledb.getConnection(dbConfig.dbPool,function(err, connection) {
    if (err) { console.error(err.message); return res(err,null);}
    connection.execute(req.query,req.params,req.options,
      function(err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return res(err,null);
        }
        doRelease(connection);
        return res(err,result);
      });
  });
}

module.exports.StoreProcedureExecute = StoreProcedureExecute;

module.exports.GetDataStoreProcedure = function(req,res){
  oracledb.getConnection(dbConfig.dbPool,function(err, connection) {
    if (err) { console.error(err.message); return res(err,null);}
    connection.execute(req.query,req.params,
      function(err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return res(err,null);
        }
        var data = {error:null,Data:[]};
        fetchRowsFromRS(connection, result.outBinds.result_set, numRows,data,res);
      });
  });
}

function fetchRowsFromRS(connection, resultSet, numRows,result,res) {
  var objList =result.Data;
  resultSet.getRows( // get numRows rows
    numRows,
    function (err, rows) {
      if (err) {
        console.log(err);
        result ={error:err,Data:objList};
        doClose(connection, resultSet,result,res); // always close the ResultSet
      } else if (rows.length === 0) {   // no rows, or no more rows
        result ={error:err,Data:objList};
        doClose(connection, resultSet,result,res); // always close the ResultSet
      } else if (rows.length > 0) {
      //  console.log("fetchRowsFromRS: Got " + rows.length + " rows");
        var keyData = resultSet.metaData;
        rows.forEach(row =>{
          var obj = {};
          for (var i = 0, j = 0; i < row.length; i++ , j++) {
            obj[keyData[j].name] = row[i];
          }
          objList.push(obj)
        })  
        fetchRowsFromRS(connection, resultSet, numRows,result,res);
      }
    });
}

module.exports.InsertDataWithGetInsertIdStoreProcedure = function(req,res){
  oracledb.getConnection(dbConfig.dbPool,function(err, connection) {
    if (err) { console.error(err.message); return res(err,null);}
    connection.execute(req.query,req.params,{ autoCommit: true},
      function(err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return res(err,null);
        }
        doRelease(connection);
      return res(result.error,result.outBinds);
      });
  });
}

module.exports.insertCallProcedureExecute = function(req,res){
  oracledb.getConnection(dbConfig.dbPool,function(err, connection) {
    if (err) { console.error(err.message); return res(err,null);}
    connection.execute(req.query,req.params,req.options,
      function(err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return res(err,null);
        }
        doRelease(connection);
        console.log(result);
        return res(result.error,result.outBinds);
      });
  });
}

function doRelease(connection) {
  connection.close(
    function(err) {
      if (err) { console.error(err.message); }
    });
}

function doClose(connection, resultSet,result,res) {
  resultSet.close(
    function(err) {
      if (err) { console.error(err.message); }
      doRelease(connection);
      return res(result.error,result.Data);
    });
}