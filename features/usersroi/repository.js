const oracledb = require('oracledb');
const database = require('../../db/index');

var moment = require('moment');



function getuserList(req, res) {
  let parameters = {
    query: `BEGIN MOB_GET_MANAGER_WISE_USERLIST(:p_user_info_id,:result_set); END;`,
    params: {
      p_user_info_id: req.user_id,
      result_set: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    }
  };
  database.GetDataStoreProcedure(parameters, function (err, result) {
    if (err) {
      return res(err, null);
    } else {
      return res(null, result);
    }
  });
}

function getTaskWeeklyComments(req, res) {
  let parameters = {
    query: `BEGIN WEB_GET_WEEKLY_CMD_USERID(:p_start_date,:p_end_date,:p_type,:p_user_id,:result_set); END;`,
    params: {
      p_start_date: req.start_date ? req.start_date : 0,
      p_end_date: req.end_date ? req.end_date : 0,
      p_type: req.type,
      p_user_id: req.user_info_id ? req.user_info_id : 0,
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


function getTaskWeeklyCommentsDetails(req, res) {
      let parameters = {
        query: `BEGIN MOB_GET_WEEKLY_CMT_DETAILS(:p_user_info_id,:p_start_date,:p_end_date,:p_type,:result_set); END;`,
        params: {
          p_user_info_id: req.user_info_id,
          p_start_date: req.start_date ? req.start_date : null,
          p_end_date: req.end_date ? req.end_date : null,
          p_type: req.type,
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
function getTaskWeeklyCommentsRange(req, res) {
      let parameters = {
        query: `BEGIN WEB_GET_WEEKLY_CMT_RANGE(:p_user_info_id,:p_start_date,:p_end_date,:p_type,:result_set); END;`,
        params: {
          p_user_info_id: req.user_info_id,
          p_start_date: req.start_date ? req.start_date : null,
          p_end_date: req.end_date ? req.end_date : null,
          p_type: req.type,
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

function getRoiCommentsv1(req, res) {
  let parameters = {
    query: `BEGIN WEB_GET_ROI_COMMENTS(:p_user_id,:result_set); END;`,
    params: {
      p_user_id: req.user_info_id ? req.user_info_id : 0,
      result_set: {
        type: oracledb.CURSOR,
        dir: oracledb.BIND_OUT
      }
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



module.exports = {

    getuserList,
    getTaskWeeklyComments,
    getTaskWeeklyCommentsDetails,
    getTaskWeeklyCommentsRange,
    getRoiCommentsv1

}
