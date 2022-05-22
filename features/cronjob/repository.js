const oracledb = require('oracledb');
const database = require('../../db/index');


function getEmailRoiUserlist(req, res) {
  let parameters = {
    query: `BEGIN MOB_GET_ROI_EMAIL(:result_set); END;`,
    params: {
      result_set: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    }
  };
  if (req.returntype == "Not Return") {
    return new Promise((resolve, reject) => {
      database.GetDataStoreProcedure(parameters, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } else {
    database.GetDataStoreProcedure(parameters, function (err, result) {
      if (err) {
        return res(err, null);
      } else {
        return res(null, result);
      }
    });
  }
}

async function getReortingUserForManager(req, res) {
  let parameters = {
    query: `BEGIN MOB_GET_ROI_RPT_USERLIST(:p_user_info_id,:result_set); END;`,
    params: {
      p_user_info_id: req.user_info_id ? req.user_info_id : 0,
      result_set: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    }
  };
  if (req.type == "Not Return") {
    return new Promise((resolve, reject) => {
      database.GetDataStoreProcedure(parameters, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } else {
    database.GetDataStoreProcedure(parameters, function (err, result) {
      if (err) {
        return res(err, null);
      } else {
        return res(null, result);
      }
    });
  }
}


module.exports = {
  getEmailRoiUserlist,
  getReortingUserForManager
}