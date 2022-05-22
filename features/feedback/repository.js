const oracledb = require('oracledb');
const database = require('../../db/index');
const gcm = require('node-gcm');

async function list(req, res) {
  let params = {
    query: `BEGIN usp_get_feedback_header(:p_user_info_id,:result_set); END;`,
    params: {
      p_user_info_id: req.user.USER_INFO_ID ? req.user.USER_INFO_ID : null,
      result_set: {
        type: oracledb.CURSOR,
        dir: oracledb.BIND_OUT
      }
    }
  };
  database.GetDataStoreProcedure(params, async function (err, result) {
    if (err) {
      return res(err, null);
    } else {
      return res(null, result);
    }
  });
}


function getTaskWeeklyCommentsv1(req, res) {
  let parameters = {
    query: `BEGIN MOB_GET_WEEKLY_CMD_BY_USERID(:p_start_date,:p_end_date,:p_type,:p_user_id,:result_set); END;`,
    params: {
      p_start_date: req.start_date ? req.start_date : 0,
      p_end_date: req.end_date ? req.end_date : 0,
      p_type: req.type ? req.type : 0,
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



function getMoveCommentToObjective(req, res) {
  let parameters = {
    query: `BEGIN MOB_ROI_MOVE_RESULT(:p_comments_child_id, :p_type, :p_user_id, :p_modified_by, :p_modified_on, :p_error_code); END;`,
    params: [
      req.comments_child_id ? req.comments_child_id : 0,
      req.type ? req.type : 'O',
      req.user_info_id ? req.user_info_id : 0,
      req.modified_by ? req.modified_by : 0,
      req.modified_on ? req.modified_on : null,
      0
    ],
    options: {
      autoCommit: true,
      bindDefs: [{
        type: oracledb.NUMBER
      },
      {
        type: oracledb.STRING
      },
      {
        type: oracledb.NUMBER
      },
      {
        type: oracledb.NUMBER
      },
      {
        type: oracledb.DB_TYPE_TIMESTAMP
      },
      {
        type: oracledb.DB_TYPE_NUMBER,
        dir: oracledb.BIND_OUT
      }
      ]
    }
  };
  if (req.type == "Not Return") {
    return new Promise((resolve, reject) => {
      database.insertStoreProcedureExecute(parameters, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } else {
    database.insertStoreProcedureExecute(parameters, function (err, result) {
      if (err) {
        return res(err, null);
      } else {
        return res(null, result);
      }
    });
  }
}



function getWeeklyCommentsdelete(req, res) {

  let parameters = {
    query: `BEGIN MOB_WEEKLY_CHILD_CMD_DELETE(:p_child_id,:p_comment_id,:p_modified_by,:p_modified_on,:p_error_code); END;`,
    params: [
      req.child_id ? req.child_id : 0,
      req.comments_id ? req.comments_id : 0,
      req.modified_by ? req.modified_by : 0,
      req.modified_on ? req.modified_on : null,
      0
    ],
    options: {
      autoCommit: true,
      bindDefs: [{
        type: oracledb.NUMBER
      },
      {
        type: oracledb.NUMBER
      },
      {
        type: oracledb.NUMBER
      },
      {
        type: oracledb.DATE
      },
      {
        type: oracledb.DB_TYPE_NUMBER,
        dir: oracledb.BIND_OUT
      }
      ]
    }
  };
  if (req.type == "Not Return") {
    return new Promise((resolve, reject) => {
      database.insertStoreProcedureExecute(parameters, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } else {
    database.insertStoreProcedureExecute(parameters, function (err, result) {
      if (err) {
        return res(err, null);
      } else {
        return res(null, result);
      }
    });
  }
}



function getMoveCommentToResult(req, res) {
  let parameters = {
    query: `BEGIN MOB_UPDATE_WEEK_CMT_TYPE(:p_comments_child_id, :p_type, :p_user_id, :p_modified_by, :p_modified_on, :p_error_code); END;`,
    params: [
      req.comments_child_id ? req.comments_child_id : 0,
      req.type ? req.type : 'R',
      req.user_info_id ? req.user_info_id : 0,
      req.modified_by ? req.modified_by : 0,
      req.modified_on ? req.modified_on : null,
      0
    ],
    options: {
      autoCommit: true,
      bindDefs: [{
        type: oracledb.NUMBER
      },
      {
        type: oracledb.STRING
      },
      {
        type: oracledb.NUMBER
      },
      {
        type: oracledb.NUMBER
      },
      {
        type: oracledb.DB_TYPE_TIMESTAMP
      },
      {
        type: oracledb.DB_TYPE_NUMBER,
        dir: oracledb.BIND_OUT
      }
      ]
    }
  };
  if (req.type == "Not Return") {
    return new Promise((resolve, reject) => {
      database.insertStoreProcedureExecute(parameters, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } else {
    database.insertStoreProcedureExecute(parameters, function (err, result) {
      if (err) {
        return res(err, null);
      } else {
        return res(null, result);
      }
    });
  }
}

function TaskWeeklyCommentsUpdate(req, res) {
  let parameters = {
    query: `BEGIN MOB_WEEKLY_COMMENTS_UPDATE(:p_comment_id,:p_comments,:p_modified_by,:p_modified_on,:p_is_deleted,:p_error_code); END;`,
    params: [
      req.COMMENTS_ID ? req.COMMENTS_ID : 0,
      req.COMMENTS ? req.COMMENTS : null,
      req.modified_by ? req.modified_by : 0,
      req.modified_on ? req.modified_on : null,
      req.is_deleted ? req.is_deleted : 0,
      0
    ],
    options: {
      autoCommit: true,
      bindDefs: [{
        type: oracledb.NUMBER
      },
      {
        type: oracledb.STRING
      },
      {
        type: oracledb.NUMBER
      },
      {
        type: oracledb.DATE
      },
      {
        type: oracledb.NUMBER
      },
      {
        type: oracledb.DB_TYPE_NUMBER,
        dir: oracledb.BIND_OUT
      }
      ]
    }
  };
  if (req.type == "Not Return") {
    return new Promise((resolve, reject) => {
      database.insertStoreProcedureExecute(parameters, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } else {
    database.insertStoreProcedureExecute(parameters, function (err, result) {
      if (err) {
        return res(err, null);
      } else {
        if (req.COMMENTS_arr.length > 0) {
          WEEKLY_COMMENTS_UPDATE_CHILD(req, res);
        } else {
          return res(null, result);
        }
      }
    });
  }
}


function WEEKLY_COMMENTS_UPDATE_CHILD(req, res) {
  let length = 1;
  for (var i = 0; i < req.COMMENTS_arr.length; i++) {
    //console.log(req.COMMENTS_arr[i].comments_child_id,req.COMMENTS_arr[i].comments.length);
    if (req.COMMENTS_arr[i].comments_child_id != "" && parseInt(req.COMMENTS_arr[i].comments_child_id) > 0) {
      var parameters = {
        query: `BEGIN MOB_WEEKLY_CHILD_CMD_UPDATE(:p_child_id,:p_comment_id,:p_comments,
        :p_modified_by,:p_modified_on,:p_error_code); END;`,
        params: [
          parseInt(req.COMMENTS_arr[i].comments_child_id) ? parseInt(req.COMMENTS_arr[i].comments_child_id) : 0,
          req.COMMENTS_ID ? req.COMMENTS_ID : 0,
          req.COMMENTS_arr[i].comments ? req.COMMENTS_arr[i].comments : null,
          req.modified_by ? req.modified_by : 0,
          req.modified_on ? req.modified_on : null,
          0
        ],
        options: {
          autoCommit: true,
          bindDefs: [{
            type: oracledb.NUMBER
          },
          {
            type: oracledb.NUMBER
          },
          {
            type: oracledb.STRING
          },
          {
            type: oracledb.NUMBER
          },
          {
            type: oracledb.DATE
          },
          {
            type: oracledb.DB_TYPE_NUMBER,
            dir: oracledb.BIND_OUT
          }
          ]
        }
      };
    } else {
      var parameters = {
        query: `BEGIN MOB_WEEKLY_COMMENT_CHILD_INS(:p_comments_id,:p_comments,:p_created_by,:p_created_on,
        :p_modified_by,:p_modified_on,:p_is_active,:p_error_code); END;`,

        params: [
          parseInt(req.COMMENTS_ID) ? parseInt(req.COMMENTS_ID) : 0,
          req.COMMENTS_arr[i].comments ? req.COMMENTS_arr[i].comments : null,
          req.modified_by ? req.modified_by : 0,
          req.modified_on ? req.modified_on : null,
          req.modified_by ? req.modified_by : 0,
          req.modified_on ? req.modified_on : null,
          1,
          0
        ],
        options: {
          autoCommit: true,
          bindDefs: [{
            type: oracledb.NUMBER
          },
          {
            type: oracledb.STRING
          },
          {
            type: oracledb.NUMBER
          },
          {
            type: oracledb.DATE
          },
          {
            type: oracledb.NUMBER
          },
          {
            type: oracledb.DATE
          },
          {
            type: oracledb.DB_TYPE_NUMBER,
            dir: oracledb.BIND_OUT
          }
          ]
        }
      }
    }
    database.insertStoreProcedureExecute(parameters, function (err, result) {
      if (err) {
        return res(err, null);
      } else {
        if (req.COMMENTS_arr.length == length) {
          return res(null, result);
        }
        length++;
      }
    });
  }
}


function TaskWeeklyCommentsfileinsert(req, res) {
  let parameters = {
    query: `BEGIN MOB_WEEKLY_FILE_INSERT(:p_comments_id,:p_file_name,:p_file_size,:p_file_content,:p_created_by,
      :p_created_on,:p_modified_by,:p_modified_on,:p_error_code); END;`,
    params: [
      req.COMMENTS_ID ? req.COMMENTS_ID : 0,
      req.file_name ? req.file_name : null,
      req.size_data ? req.size_data : 0,
      req.file_content.buffer ? req.file_content.buffer : null,
      req.created_by ? req.created_by : 0,
      req.created_on ? req.created_on : null,
      req.modified_by ? req.modified_by : 0,
      req.modified_on ? req.modified_on : null,
      0
    ],
    options: {
      autoCommit: true,
      bindDefs: [{
        type: oracledb.NUMBER
      },
      {
        type: oracledb.STRING
      },
      {
        type: oracledb.NUMBER
      },
      {
        type: oracledb.BLOB
      },
      {
        type: oracledb.NUMBER
      },
      {
        type: oracledb.DATE
      },
      {
        type: oracledb.NUMBER
      },
      {
        type: oracledb.DATE
      },
      {
        type: oracledb.DB_TYPE_NUMBER,
        dir: oracledb.BIND_OUT
      }
      ]
    }
  };
  if (req.type == "Not Return") {
    return new Promise((resolve, reject) => {
      database.insertStoreProcedureExecute(parameters, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  } else {
    database.insertStoreProcedureExecute(parameters, function (err, result) {
      if (err) {
        return res(err, null);
      } else {
        return res(null, result);
      }
    });
  }
}


function TaskWeeklyfilelist(req, res) {
  let parameters = {
    query: `BEGIN MOB_GET_WEEKLY_CMT_FILES(:p_comment_id,:result_set); END;`,
    params: {
      p_comment_id: req.COMMENTS_ID ? req.COMMENTS_ID : 0,
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


var getRoiFilesList = async (req) => {
  let params = {
    query: `BEGIN MOB_GET_DOWNLOAD_WEEKLY_FILES(:p_File_id,:result_set); END;`,
    params: {
      p_File_id: req.file_id ? req.file_id : 0,
      result_set: {
        type: oracledb.CURSOR,
        dir: oracledb.BIND_OUT
      }
    }
  };
  return new Promise((resolve, reject) => database.GetDataStoreProcedure(params, (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  }));
}


function DailytaskcommetsInsert(req, res) {
  var parameters = {};
  parameters.params = {
    p_comments: req.COMMENTS ? req.COMMENTS : null,
    p_created_by: req.created_by ? req.created_by : 0,
    p_created_on: req.created_on ? req.created_on : null,
    p_modified_by: req.modified_by ? req.modified_by : 0,
    p_modified_on: req.modified_on ? req.modified_on : null,
    p_is_active: 1,
    p_type: req.comments_type ? req.comments_type : null,
    p_error_code: {
      type: oracledb.NUMBER,
      dir: oracledb.BIND_INOUT
    }
  }
  parameters.query = `BEGIN MOB_WEEKLY_COMMENTS_INSERT(:p_comments,:p_created_by,:p_created_on,:p_modified_by,:p_modified_on,
            :p_is_active,:p_type,:p_error_code); END;`,

    database.InsertDataWithGetInsertIdStoreProcedure(parameters, function (err, result) {
      if (err) {
        return res(err, null);
      } else {
        // return res(null, result);
        if (req.COMMENTS_arr.length > 0) {
          req.COMMENTS_ID = result.p_error_code;
          WEEKLY_COMMENTS_INSERT_CHILD(req, res);
        } else {
          return res(null, result);
        }
      }
    });
}


function WEEKLY_COMMENTS_INSERT_CHILD(req, res) {
  let length = 1;
  for (var i = 0; i < req.COMMENTS_arr.length; i++) {
    //console.log(req.COMMENTS_arr[i].comments.length);
    if (req.COMMENTS_arr[i].comments != "") {
      var parameters = {
        query: `BEGIN MOB_WEEKLY_COMMENT_CHILD_INS(:p_comments_id,:p_comments,:p_created_by,:p_created_on,
          :p_modified_by,:p_modified_on,:p_is_active,:p_error_code); END;`,

        params: [
          parseInt(req.COMMENTS_ID) ? parseInt(req.COMMENTS_ID) : 0,
          req.COMMENTS_arr[i].comments ? req.COMMENTS_arr[i].comments : null,
          req.created_by ? req.created_by : 0,
          req.created_on ? req.created_on : null,
          req.modified_by ? req.modified_by : 0,
          req.modified_on ? req.modified_on : null,
          1,
          0
        ],
        options: {
          autoCommit: true,
          bindDefs: [{
            type: oracledb.NUMBER
          },
          {
            type: oracledb.DB_TYPE_LONG
          },
          {
            type: oracledb.NUMBER
          },
          {
            type: oracledb.DB_TYPE_TIMESTAMP
          },
          {
            type: oracledb.NUMBER
          },
          {
            type: oracledb.DB_TYPE_TIMESTAMP
          },
          {
            type: oracledb.DB_TYPE_NUMBER,
            dir: oracledb.BIND_OUT
          }
          ]
        }
      }
      database.insertStoreProcedureExecute(parameters, function (err, result) {
        if (err) {
          length = req.COMMENTS_arr.length;
          return res(err, null);
        } else {
          if (req.COMMENTS_arr.length == length) {
            return res(null, req.COMMENTS_ID);
          }
          length++;
        }
      });
    } else {
      length++;
    }

  }
}

function getInsertDailyWeekResultComments(req, res) {
  var parameters = {};
  parameters.params = {
    p_comments: req.COMMENTS ? req.COMMENTS : null,
    p_created_by: req.created_by ? req.created_by : 0,
    p_created_on: req.created_on ? req.created_on : null,
    p_modified_by: req.modified_by ? req.modified_by : 0,
    p_modified_on: req.modified_on ? req.modified_on : null,
    p_is_active: 1,
    p_type: req.comments_type ? req.comments_type : null,
    p_error_code: {
      type: oracledb.NUMBER,
      dir: oracledb.BIND_INOUT
    }
  }
  parameters.query = `BEGIN MOB_WEEKLY_COMMENTS_INSERT(:p_comments,:p_created_by,:p_created_on,:p_modified_by,:p_modified_on,
            :p_is_active,:p_type,:p_error_code); END;`,

    database.InsertDataWithGetInsertIdStoreProcedure(parameters, function (err, result) {
      if (err) {
        return res(err, null);
      } else {
        // return res(null, result);
        if (req.COMMENTS_arr.length > 0) {
          req.COMMENTS_ID = result.p_error_code;
          WEEKLY_COMMENTS_INSERT_RESULT_CHILD(req, res);
        } else {
          return res(null, result);
        }
      }
    });
}


function WEEKLY_COMMENTS_INSERT_RESULT_CHILD(req, res) {
  let length = 1;
  for (var i = 0; i < req.COMMENTS_arr.length; i++) {
    //console.log(req.COMMENTS_arr[i].comments.length);
    if (req.COMMENTS_arr[i].comments != "") {
      var parameters = {
        query: `BEGIN MOB_WEEKLY_COMMENT_RESULT_INS(:p_comments_id,:p_comments,:p_created_by,:p_created_on,
          :p_modified_by,:p_modified_on,:p_is_active,:p_error_code); END;`,

        params: [
          parseInt(req.COMMENTS_ID) ? parseInt(req.COMMENTS_ID) : 0,
          req.COMMENTS_arr[i].comments ? req.COMMENTS_arr[i].comments : null,
          req.created_by ? req.created_by : 0,
          req.created_on ? req.created_on : null,
          req.modified_by ? req.modified_by : 0,
          req.modified_on ? req.modified_on : null,
          1,
          0
        ],
        options: {
          autoCommit: true,
          bindDefs: [{
            type: oracledb.NUMBER
          },
          {
            type: oracledb.DB_TYPE_LONG
          },
          {
            type: oracledb.NUMBER
          },
          {
            type: oracledb.DB_TYPE_TIMESTAMP
          },
          {
            type: oracledb.NUMBER
          },
          {
            type: oracledb.DB_TYPE_TIMESTAMP
          },
          {
            type: oracledb.DB_TYPE_NUMBER,
            dir: oracledb.BIND_OUT
          }
          ]
        }
      }
      database.insertStoreProcedureExecute(parameters, function (err, result) {
        if (err) {
          length = req.COMMENTS_arr.length;
          return res(err, null);
        } else {
          if (req.COMMENTS_arr.length == length) {
            return res(null, req.COMMENTS_ID);
          }
          length++;
        }
      });
    } else {
      length++;
    }

  }
}

function getUserRoiWeekDetails(req, res) {
  let parameters = {
    query: `BEGIN MOB_GET_WEEKLY_CMD_DATE_USERID(:p_start_date,:p_end_date,:p_type,:p_user_id,:result_set); END;`,
    params: {
      p_start_date: req.start_date ? req.start_date : 0,
      p_end_date: req.end_date ? req.end_date : 0,
      p_type: req.type ? req.type : 0,
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

function getUserRoiWeekSummary(req, res) {
  let parameters = {
    query: `BEGIN MOB_GET_USER_ROI_SUMMARY(:p_start_date, :p_end_date, :p_type, :p_login_user_id, :p_user_id, :p_user_name, :result_set); END;`,
    params: {
      p_start_date: req.start_date ? req.start_date : null,
      p_end_date: req.end_date ? req.end_date : null,
      p_type: req.type ? req.type : 0,
      p_login_user_id: req.user_info_id ? req.user_info_id : 0,
      p_user_id: req.reporting_user_id ? req.reporting_user_id : 0,
      p_user_name: req.reporting_user_name ? req.reporting_user_name : null,
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
      p_type: req.type ? req.type : null,
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

function getLpoApprovalListDetails(req, res) {
  let parameters = {
    query: `BEGIN MOB_GET_USER_LPO(:p_LBL_TYPE,:p_LPO_Id,:p_Logged_by,:result_set); END;`,
    params: {
      p_LBL_TYPE: req.LBL_TYPE ? req.LBL_TYPE : null,
      p_LPO_id: req.LPO_ID ? req.LPO_ID : null,
      p_Logged_by: req.USER_INFO_ID ? req.USER_INFO_ID : null,
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

function ApprovedatainsertDAL(req, res) {

  var parameters = {
    query: `BEGIN MOB_COMMON_COMMENTS_INSERT(:p_Reference_Id,:p_ReferenceType,:p_Comments,:p_created_on,
    :p_created_by,:p_modified_on,:p_modified_by,:p_error_code); END;`,
    params: [
      req.Reference_Id ? req.Reference_Id : 0,
      req.ReferenceType1 ? req.ReferenceType1 : null,
      req.comments ? req.comments : null,
      req.created_on ? req.created_on : null,
      req.created_by ? req.created_by : 0,
      req.modified_on ? req.modified_on : null,
      req.modified_by ? req.modified_by : 0,
      0
    ],
    options: {
      autoCommit: true,
      bindDefs: [
        { type: oracledb.NUMBER },
        { type: oracledb.STRING },
        { type: oracledb.STRING },
        { type: oracledb.DATE },
        { type: oracledb.NUMBER },
        { type: oracledb.DATE },
        { type: oracledb.NUMBER },
        { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT }
      ]
    }
  };

  database.insertStoreProcedureExecute(parameters, function (err, result) {
    if (err) {
      return res(err, null);
    } else {
      GET_LPO_LIST(req, res);
    }
  });
}

function GET_LPO_LIST(req, res) {
  let parameters = {
    query: `BEGIN MOB_GET_LPO_LIST(:p_LPO_Id,:p_Call,:p_validity,:p_emi_rate,:p_payment_term,:p_supper_mail,
    :p_status_id,:p_is_budget,:p_Supplier_Name,:p_Supplier_Mail,:p_o_unit_id,:p_o_unit_Name,:p_tp_call,:p_delivery_address,
    :p_special_remarks,:p_is_vat_enabled,:p_is_approved,:p_is_ceo_reverted,:p_ceo_revert_to,:p_is_lpo_completed,:p_is_revert_to_approved,
    :p_cost_bear_by,:p_is_Rejected,:p_sub_total,:p_total,:p_For_Payment,:p_Manager_M_Id,:p_No_Of_App,:p_item_id,:result_set); END;`,
    params: {
      p_LPO_Id: req.LPO_ID ? req.LPO_ID : 0,
      p_Call: null,
      p_validity: null,
      p_emi_rate: null,
      p_payment_term: null,
      p_supper_mail: null,
      p_status_id: null,
      p_is_budget: null,
      p_Supplier_Name: null,
      p_Supplier_Mail: null,
      p_o_unit_id: null,
      p_o_unit_Name: null,
      p_tp_call: null,
      p_delivery_address: null,
      p_special_remarks: null,
      p_is_vat_enabled: null,
      p_is_approved: null,
      p_is_ceo_reverted: null,
      p_ceo_revert_to: null,
      p_is_lpo_completed: null,
      p_is_revert_to_approved: null,
      p_cost_bear_by: null,
      p_is_Rejected: null,
      p_sub_total: null,
      p_total: null,
      p_For_Payment: null,
      p_Manager_M_Id: null,
      p_No_Of_App: null,
      p_item_id: null,
      result_set: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    }
  };
  database.GetDataStoreProcedure(parameters, function (err, result) {
    if (err) {
      return res(err, null);
    } else {
      if (result.length > 0) {
        req.lpolist = result[0];
        if (req.ref_type == 1) {
          req.lpolist.STATUS_ID = 0;
          req.lpolist.IS_APPROVED = 0;
          update_lpo(req, res);
        } else {
          if (req.lpolist.IS_APPROVED == 1) {
            if (req.lpolist.STATUS_ID == 0) {
              if (req.usertype === "CEO") {
                req.Comments1 = "CEO Approved";
                req.ReferenceType1 = "LPO STATUS";
                req.lpolist.STATUS_ID = 5;
              } else {
                req.Comments1 = "LPO Approved";
                req.ReferenceType1 = "LPO STATUS";
                req.lpolist.STATUS_ID = parseInt(req.lpolist.STATUS_ID) + 1;
              }
              COMMON_COMMENTS_INSERT(req, res);
            } else if (req.lpolist.STATUS_ID == 1) {
              req.MANAGER_MASTER_ID = req.lpolist.MANAGER_MASTER_ID;
              GetLPO_MANAGER_LIST(req, res);
            } else if (req.lpolist.STATUS_ID == 2) {
              if (req.usertype === "CEO") {
                req.Comments1 = "CEO Approved";
                req.ReferenceType1 = "LPO STATUS";
                req.lpolist.STATUS_ID = 5;
              } else {
                req.Comments1 = "FINANCE Confirmed";
                req.ReferenceType1 = "LPO STATUS";
                req.lpolist.STATUS_ID = parseInt(req.lpolist.STATUS_ID) + 1;
              }
              COMMON_COMMENTS_INSERT(req, res);

            } else if (req.lpolist.STATUS_ID == 3) {

              if (req.usertype === "CEO") {
                req.Comments1 = "CEO Approved";
                req.ReferenceType1 = "LPO STATUS";
                req.lpolist.STATUS_ID = 5;

              } else {
                req.lpolist.STATUS_ID = parseInt(req.lpolist.STATUS_ID) + 1;
                req.Comments1 = "COO Approved";
                req.ReferenceType1 = "LPO STATUS";
              }

              COMMON_COMMENTS_INSERT(req, res);

            } else if (req.lpolist.STATUS_ID == 4) {
              if (req.lpolist.IS_CEO_REVERTED == 1 && req.lpolist.IS_REVERT_TO_APPROVED != 1) {
                req.lpolist.STATUS_ID = parseInt(req.lpolist.STATUS_ID) - 1;
                req.lpolist.IS_REVERT_TO_APPROVED = 1;
                if (req.usertype === "CEO") {
                  req.Comments1 = "CEO Approved";
                  req.ReferenceType1 = "LPO STATUS";
                  req.lpolist.STATUS_ID = 5;
                } else {
                  req.lpolist.STATUS_ID = parseInt(req.lpolist.STATUS_ID) + 1;
                  req.Comments1 = req.lpolist.REVERT_TO_NAME + "Approved";
                  req.ReferenceType1 = "LPO STATUS";
                }
              } else {
                req.Comments1 = "CEO Approved";
                req.ReferenceType1 = "LPO STATUS";
                req.lpolist.STATUS_ID = 5;
              }
              COMMON_COMMENTS_INSERT(req, res);
            }

          } else {
            req.Comments1 = "CEO Approved";
            req.ReferenceType1 = "LPO STATUS";
            req.lpolist.STATUS_ID = 5;
            COMMON_COMMENTS_INSERT(req, res);
          }
        }
      } else {
        return res(null, result);
      }
    }
  });
}

function update_lpo(req, res) {

  var parameters = {
    query: `BEGIN MOB_LPO_UPDATE(:p_LPO_Id,:p_Supplier_id,:p_validity,:p_emi_rate,:p_payment_term,:p_is_budget,
    :p_supper_mail,:p_delivery_address,:p_special_remarks,:p_is_vat_enabled,:p_sub_total,:p_total,:p_o_unit_id,:p_manager_master_id,
    :p_no_manager_approved,:p_is_ceo_reverted,:p_ceo_revert_to,:p_is_lpo_completed,:p_is_revert_to_approved,:p_is_approved,:p_status_id,
    :p_cost_bear_by,:p_is_deleted,:p_is_active,:p_modified_on,:p_modified_by,:p_IS_CANCEL_REQUESTED,:p_IS_CANCEL_REQUESTED_BY,:p_error_code); END;`,
    params: [
      req.lpolist.LPO_ID ? req.lpolist.LPO_ID : 0,//1 n
      req.lpolist.SUPPLIER_ID ? req.lpolist.SUPPLIER_ID : 0,//2 n
      req.lpolist.VALIDITY ? req.lpolist.VALIDITY : null,//3 s
      req.lpolist.EMI_RATE ? req.lpolist.EMI_RATE : 0,//4 n
      req.lpolist.PAYMENT_TERM ? req.lpolist.PAYMENT_TERM : null,//5 s
      req.lpolist.IS_BUDGET ? req.lpolist.IS_BUDGET : 0,//6 n
      req.lpolist.SUPPER_MAIL ? req.lpolist.SUPPER_MAIL : null,//7 s
      req.lpolist.DELIVERY_ADDRESS ? req.lpolist.DELIVERY_ADDRESS : null,//8 s
      req.lpolist.SPECIAL_REMARKS ? req.lpolist.SPECIAL_REMARKS : null,//9 s
      req.lpolist.IS_VAT_ENABLED ? req.lpolist.IS_VAT_ENABLED : 0,//10 n
      req.lpolist.SUB_TOTAL ? req.lpolist.SUB_TOTAL : 0,//11 n
      req.lpolist.TOTAL ? req.lpolist.TOTAL : 0,//12 n
      req.lpolist.O_UNIT_ID ? req.lpolist.O_UNIT_ID : 0,//13 n
      req.lpolist.MANAGER_MASTER_ID ? req.lpolist.MANAGER_MASTER_ID : 0,//14 n
      req.lpolist.NO_MANAGER_APPROVED ? req.lpolist.NO_MANAGER_APPROVED : 0,//15 n
      req.lpolist.IS_CEO_REVERTED ? req.lpolist.IS_CEO_REVERTED : 0,//16 n
      req.lpolist.CEO_REVERT_TO ? req.lpolist.CEO_REVERT_TO : 0,//17 n
      req.lpolist.IS_LPO_COMPLETED ? req.lpolist.IS_LPO_COMPLETED : 0,//18 n
      req.lpolist.IS_REVERT_TO_APPROVED ? req.lpolist.IS_REVERT_TO_APPROVED : 0,//19 n
      req.lpolist.IS_APPROVED ? req.lpolist.IS_APPROVED : 0,//20 n
      req.lpolist.STATUS_ID ? req.lpolist.STATUS_ID : 0,//21 n
      req.lpolist.COST_BEAR_BY ? req.lpolist.COST_BEAR_BY : null,//22 s
      req.lpolist.IS_DELETED ? req.lpolist.IS_DELETED : 0,//23 n
      req.lpolist.IS_ACTIVE ? req.lpolist.IS_ACTIVE : 0,//24 n
      req.modified_on ? req.modified_on : null,//25 n
      req.modified_by ? req.modified_by : 0,//26 d
      0,//27 n
      0,//28 n
      0//29 n
    ],
    options: {
      autoCommit: true,
      bindDefs: [
        { type: oracledb.NUMBER },//1
        { type: oracledb.NUMBER },//2
        { type: oracledb.STRING },//3
        { type: oracledb.NUMBER },//4
        { type: oracledb.STRING },//5
        { type: oracledb.NUMBER },//6
        { type: oracledb.STRING },//7
        { type: oracledb.STRING },//8
        { type: oracledb.STRING },//9
        { type: oracledb.NUMBER },//10
        { type: oracledb.NUMBER },//11
        { type: oracledb.NUMBER },//12
        { type: oracledb.NUMBER },//13
        { type: oracledb.NUMBER },//14
        { type: oracledb.NUMBER },//15
        { type: oracledb.NUMBER },//16
        { type: oracledb.NUMBER },//17
        { type: oracledb.NUMBER },//18
        { type: oracledb.NUMBER },//19
        { type: oracledb.NUMBER },//20
        { type: oracledb.NUMBER },//21
        { type: oracledb.STRING },//22
        { type: oracledb.NUMBER },//23
        { type: oracledb.NUMBER },//24
        { type: oracledb.DATE },//25
        { type: oracledb.NUMBER },//26
        { type: oracledb.NUMBER },//27
        { type: oracledb.NUMBER },//28
        { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT }//29
      ]
    }
  };

  database.insertStoreProcedureExecute(parameters, function (err, result) {
    if (err) {
      return res(err, null);
    } else {
      return res(null, result);
    }
  });
}

function COMMON_COMMENTS_INSERT(req, res) {

  var parameters = {
    query: `BEGIN MOB_COMMON_COMMENTS_INSERT(:p_Reference_Id,:p_ReferenceType,:p_Comments,:p_created_on,
    :p_created_by,:p_modified_on,:p_modified_by,:p_error_code); END;`,
    params: [
      req.Reference_Id ? req.Reference_Id : 0,
      req.ReferenceType1 ? req.ReferenceType1 : null,
      req.Comments1 ? req.Comments1 : null,
      req.created_on ? req.created_on : null,
      req.created_by ? req.created_by : 0,
      req.modified_on ? req.modified_on : null,
      req.modified_by ? req.modified_by : 0,
      0
    ],
    options: {
      autoCommit: true,
      bindDefs: [
        { type: oracledb.NUMBER },
        { type: oracledb.STRING },
        { type: oracledb.STRING },
        { type: oracledb.DATE },
        { type: oracledb.NUMBER },
        { type: oracledb.DATE },
        { type: oracledb.NUMBER },
        { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT }
      ]
    }
  };

  database.insertStoreProcedureExecute(parameters, function (err, result) {
    if (err) {
      return res(err, null);
    } else {
      if (req.lpolist.STATUS_ID == 4) {
        GET_ALL_RESOURSE(req, res);
      } else {
        req.lpolist.IS_APPROVED == 1;
        update_lpo(req, res);
      }
    }
  });
}

function GetLPO_MANAGER_LIST(req, res) {
  let parameters = {
    query: `BEGIN MOB_GET_LPO_MANAGER_LIST(:p_master_id,:result_set); END;`,
    params: {
      p_master_id: req.MANAGER_MASTER_ID ? req.MANAGER_MASTER_ID : 0,
      result_set: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    }
  };
  database.GetDataStoreProcedure(parameters, function (err, result) {
    if (err) {
      return res(err, null);
    } else {
      var result_arra = result;
      var final = result_arra.filter(call => call.ORDER_NO === parseInt(req.lpolist.NO_MANAGER_APPROVED) + 1);
      if (final.length > 0) {
        req.lpolist.NO_MANAGER_APPROVED = parseInt(req.lpolist.NO_MANAGER_APPROVED) + 1;
        if (req.lpolist.NUMBER_OF_APPROVALS != req.lpolist.NO_MANAGER_APPROVED) {
          req.lpolist.STATUS_ID = parseInt(req.lpolist.STATUS_ID) - 1;
        } else {
          req.lpolist.STATUS_ID = parseInt(req.lpolist.STATUS_ID) + 1;
        }
        if (req.usertype === "CEO") {
          req.Comments1 = "CEO Approved";
          req.ReferenceType1 = "LPO STATUS";
        } else {
          req.Comments1 = final[0].MANAAGER + " Verified";
          req.ReferenceType1 = "LPO STATUS";
        }
        if (req.usertype_id === 8) {
          req.lpolist.STATUS_ID = 5;
        } else {
          req.lpolist.STATUS_ID = parseInt(req.lpolist.STATUS_ID) + 1;
        }
        COMMON_COMMENTS_INSERT(req, res);
      } else {
        return res(null, result);
      }
    }
  });
}

function GET_ALL_RESOURSE(req, res) {
  let parameters = {
    query: `BEGIN MOB_RESOURCE_GET_ALL(:result_set,:p_Resource_name,:p_Resource_code,:p_app_user,:p_Month,:p_Year,
    :p_mgr_type,:p_Type_Id,:p_user_id,:p_is_active); END;`,
    params: {
      result_set: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
      p_Resource_name: null,
      p_Resource_code: null,
      p_app_user: null,
      p_Month: null,
      p_Year: null,
      p_mgr_type: null,
      p_Type_Id: 8,
      p_user_id: null,
      p_is_active: 1,
    }
  };
  database.GetDataStoreProcedure(parameters, function (err, result) {
    if (err) {
      return res(err, null);
    } else {
      req.resourse_list = result;
      req.lpolist.IS_APPROVED == 1
      update_lpo(req, res);
    }
  });
}

async function GetFcmTokenForLpo(req,res){
  var parameters = {  query : `BEGIN MOB_GET_LPO_USER_FCM_TOKEN(:p_LPO_id,:p_Comment_by,:p_status,:p_app_type,:p_app_platform,:result_set); END;`,
    params: {
      p_LPO_id: req.LPO_ID ? req.LPO_ID : 0,
      p_Comment_by: req.COMMENT_BY ? req.COMMENT_BY : 0,
      p_status: req.STATUS ? req.STATUS : null,
      p_app_type: req.APP_TYPE ? req.APP_TYPE : null,
      p_app_platform: req.APP_PLATFORM ? req.APP_PLATFORM : null,
      result_set: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    }
  };

  return new Promise((resolve,reject)=> database.GetDataStoreProcedure(parameters, function (err, result) {
    if(err){
      return reject(err);
    } else {
      return resolve(result);
    } 
  }));

}


function androidPushNotificationSend(req, result) {

  // Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
  var sender = new gcm.Sender('AAAAUXFjwcE:APA91bEHXvNqYGt3rkhxijFP_DOo3fH6XlhvQFBzsFLjLXSZWJesUcPR48pwKGxCGrSfgaVX9wae-Usq1M43xZubtp9mriGSS1CaCKJYzCo1cvlEFo8IIHGHXjGowK-7gxKLOvjn2WBB');

  let message = new gcm.Message({
    "priority": "high",
    "contentAvailable": true,
    "delayWhileIdle": true,
    "timeToLive": 3,
    "notification": {
      "title": req.title,
      "icon": "fcm_push_icon",
      "sound": "default",
      "click_action":"FCM_PLUGIN_ACTIVITY",
      "body": req.message	 
    },
    "data":{
      "trans_type": req.trans_type,
      "trans_id": req.trans_id,
      "chat_user_id":req.chat_user_id
    }
  });

  var regTokens = [];
  for (var i = 0; i < result.length; i++) {
    regTokens.push(result[i].FCM_TOKEN);
  };

  sender.send(message, { registrationTokens: regTokens }, function (err, response) {
    if(err){
        console.error('Push Notification Send', err);
    }
    else {
        console.log('Push Notification Send', response);
    }
  }); 
}

function RejectdatainsertDAL(req,res) {
  
  var parameters = {  query : `BEGIN MOB_COMMON_COMMENTS_INSERT(:p_Reference_Id,:p_ReferenceType,:p_Comments,:p_created_on,
    :p_created_by,:p_modified_on,:p_modified_by,:p_error_code); END;`,
    params : [
        req.Reference_Id ? req.Reference_Id : 0,
        req.ReferenceType ? req.ReferenceType : null,
        req.comments ? req.comments : null,
        req.created_on ? req.created_on : null,
        req.created_by ? req.created_by : 0,
        req.modified_on ? req.modified_on : null,
        req.modified_by ? req.modified_by : 0,
        0
    ],
    options: {
      autoCommit: true,
      bindDefs: [
        { type: oracledb.NUMBER },
        { type: oracledb.STRING },
        { type: oracledb.STRING },
        { type: oracledb.DATE },
        { type: oracledb.NUMBER },
        { type: oracledb.DATE },
        { type: oracledb.NUMBER },
        { type: oracledb.DB_TYPE_NUMBER, dir : oracledb.BIND_OUT }
      ]
    }
  };
  
  database.insertStoreProcedureExecute(parameters,function(err,result){
    if(err){
      return res(err,null);
    } else {
      RejectdatainsertComments1(req,res);
    } 
  });
}

function RejectdatainsertComments1(req,res) {
  
  var parameters = {  query : `BEGIN MOB_COMMON_COMMENTS_INSERT(:p_Reference_Id,:p_ReferenceType,:p_Comments,:p_created_on,
    :p_created_by,:p_modified_on,:p_modified_by,:p_error_code); END;`,
    params : [
        req.Reference_Id ? req.Reference_Id : 0,
        req.ReferenceType1 ? req.ReferenceType1 : null,
        req.Comments1 ? req.Comments1 : null,
        req.created_on ? req.created_on : null,
        req.created_by ? req.created_by : 0,
        req.modified_on ? req.modified_on :null,
        req.modified_by ? req.modified_by : 0,
        0
    ],
    options: {
      autoCommit: true,
      bindDefs: [
        { type: oracledb.NUMBER },
        { type: oracledb.STRING },
        { type: oracledb.STRING },
        { type: oracledb.DATE },
        { type: oracledb.NUMBER },
        { type: oracledb.DATE },
        { type: oracledb.NUMBER },
        { type: oracledb.DB_TYPE_NUMBER, dir : oracledb.BIND_OUT }
      ]
    }
  };
  
  database.insertStoreProcedureExecute(parameters,function(err,result){
    if(err){
      return res(err,null);
    } else {
      GET_LPO_LIST(req,res);
    } 
  });
}

function getFinancePaymentApprovalListDetails(req, res) {
  let parameters = {
    query: `BEGIN MOB_PENDING_FIN_PAY_LIST(:p_Logged_by,:result_set); END;`,
    params: {      
      p_Logged_by: req.USER_INFO_ID ? req.USER_INFO_ID : null,
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

function getDeleteCommonAttachment(req,res){
  let parameters = {
    query: `BEGIN mob_common_attach_delete(:p_common_attachment_id,:p_modified_on,:p_modified_by,:p_error_code); END;`,
    params: [
      req.attachment_id ? req.attachment_id : 0,
      req.modified_on ? req.modified_on : null,
      req.modified_by ? req.modified_by : 0,
      0
    ],
    options: {
      autoCommit: true,
      bindDefs: [
        { type: oracledb.NUMBER },
        { type: oracledb.DATE },
        { type: oracledb.NUMBER },
        { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT }
      ]
    }
  };
  if (req.typereturn == "Not Return") {
    return new Promise((resolve, reject) => { database.insertStoreProcedureExecute(parameters,function(err,result){ 
      if(err){
        reject(err);
      } else {
        resolve(result);
      } 
      });
    });
  }else{
    database.insertStoreProcedureExecute(parameters, function (err, result) {
      if (err) {
        return res(err, null);
      } else{
        return res(null,result);
      }
    });
  }
}

function getFinancePaymentAttachmentList(req,res) {

  let parameters = {  query : `BEGIN mob_Common_attach_list(:p_ref_code,:p_ref_id,:p_ref_type_id,:result_set); END;`,
    params : {
      p_ref_code: req.ref_code ? req.ref_code: null,
      p_ref_id: req.ref_id ? req.ref_id: null,
      p_ref_type_id: req.ref_type_id ? req.ref_type_id: null,
      result_set      : { type: oracledb.CURSOR, dir : oracledb.BIND_OUT }
    }
  };
  database.GetDataStoreProcedure(parameters,function(err,result){
    if(err){
      return res(err,null);
    } else {
      return res(null,result);
    } 
  });
}

function commentsInsert(req,res) {

  var parameters = {  query : `BEGIN MOB_COMMON_COMMENTS_INSERT(:p_Reference_Id,:p_ReferenceType,:p_Comments,:p_created_on,
    :p_created_by,:p_modified_on,:p_modified_by,:p_error_code); END;`,
    params : {
      p_Reference_Id: req.Reference_Id ? req.Reference_Id : 0,
      p_ReferenceType: req.ReferenceType ? req.ReferenceType : null,
      p_Comments: req.Comments ? req.Comments : null,
      p_created_on: req.created_on ? req.created_on : null,
      p_created_by: req.created_by ? req.created_by : 0,
      p_modified_on: req.modified_on ? req.modified_on : null,
      p_modified_by: req.modified_by ? req.modified_by : 0,
      p_error_code: { type: oracledb.NUMBER, dir : oracledb.BIND_INOUT }
    },
    options: {
      autoCommit: true,
      bindDefs: [
        { type: oracledb.NUMBER },
        { type: oracledb.STRING },
        { type: oracledb.STRING },
        { type: oracledb.DATE },
        { type: oracledb.NUMBER },
        { type: oracledb.DATE },
        { type: oracledb.NUMBER },
        { type: oracledb.NUMBER }
      ]
    }
  };
  
  if (req.typereturn == "Not Return") {
    return new Promise((resolve, reject) => { database.insertStoreProcedureExecute(parameters,function(err,result){ 
      if(err){
        reject(err);
      } else {
        resolve(result);
      } 
      });
    });
  }else{
    database.insertStoreProcedureExecute(parameters, function (err, result) {
      if (err) {
        return res(err, null);
      } else{
        return res(null,result);
      }
    });
  }
}


async function getLpoManagerListALL(req, res) {
  let parameters = {
    query: `BEGIN MOB_GET_LPO_MANAGER_LIST(:p_master_id, :result_set); END;`,
    params: {
      p_master_id: req.master_id ? req.master_id : null,
      result_set: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    }
  };
  if(req.type == "Not Return") {
    return new Promise((resolve, reject) => { database.GetDataStoreProcedure(parameters,function(err,result){ 
      if(err){
        reject(err);
      } else {
        resolve(result);
      } 
      });
    });
  }else{
    database.GetDataStoreProcedure(parameters, function (err, result) {
      if (err) {
        return res(err, null);
      } else{
        return res(null,result);
      }
    });
  }
}

function updateFinancePaymentRequestStatus(req, res) {
  var parameters = {
    query: 'BEGIN mob_finance_pay_req_UPDATE(:p_FinancePayReq_Id,:p_Supplier_id,:p_Currency,:p_mode_of_payment,:p_HC_RCVD_BY,:p_ceo_app_req,:p_is_hard_copy_rcvd,:p_finance_remarks,:p_invoice_number,:p_invoice_date,:p_supper_mail,:p_special_remarks,:p_approval_code,:p_o_unit_id,:p_manager_master_id,:p_no_manager_approved,:p_status_id,:p_print_count,:p_Approval_1,:p_is_cancel_requested,:p_is_cancel_requested_by,:p_is_ceo_reverted,:p_ceo_revert_to,:p_is_revert_to_approved,:p_total,:p_is_approved,:p_payee_name,:p_is_deleted,:p_is_active,:p_modified_on,:p_modified_by,:p_error_code); END;',
    params: [
      req.FinancePayReq_Id ? req.FinancePayReq_Id : 0,
      req.Supplier_id ? req.Supplier_id : 0,
      req.Currency ? req.Currency : null,
      req.mode_of_payment ? req.mode_of_payment : 0,
      req.hc_rcvd_by ? req.hc_rcvd_by : 0,
      req.ceo_app_req ? req.req.ceo_app_req : 0,
      req.is_hard_copy_rcvd ? req.is_hard_copy_rcvd : 0,
      req.finance_remarks ? req.finance_remarks : null,
      req.invoice_number ? req.invoice_number : null,
      req.invoice_date ? req.invoice_date : null,
      req.supper_mail ? req.supper_mail: null,
      req.special_remarks ? req.special_remarks: null,
      req.approval_code ? req.approval_code : null,
      req.o_unit_id ? req.o_unit_id : 0,
      req.manager_master_id ? req.manager_master_id : 0,
      req.no_manager_approved ? req.no_manager_approved : 0,
      req.status_id ? req.status_id : 0,
      req.print_count ? req.print_count : 0,
      req.Approval_1 ? req.Approval_1 : 0,
      req.is_cancel_requested ? req.is_cancel_requested : 0,
      req.is_cancel_requested_by ? req.is_cancel_requested_by : 0,
      req.is_ceo_reverted ? req.is_ceo_reverted : 0,
      req.ceo_revert_to ? req.ceo_revert_to : 0,
      req.is_revert_to_approved ? req.is_revert_to_approved : 0,
      req.total ? req.total : 0,
      req.is_approved ? req.is_approved : 0,
      req.payee_name ? req.payee_name : null,
      req.is_deleted ? req.is_deleted : 0,
      req.is_active ? req.is_active : 1,
      req.modified_on ? req.modified_on : null,
      req.modified_by ? req.modified_by : 0,
      0
    ] ,
    options: {
      autoCommit: true,
      bindDefs: [
        { type: oracledb.NUMBER },
        { type: oracledb.NUMBER },
        { type: oracledb.STRING },
        { type: oracledb.NUMBER },
        { type: oracledb.NUMBER },
        { type: oracledb.NUMBER },
        { type: oracledb.NUMBER },
        { type: oracledb.STRING },
        { type: oracledb.STRING },
        { type: oracledb.DATE },
        { type: oracledb.STRING },
        { type: oracledb.STRING },
        { type: oracledb.STRING },
        { type: oracledb.NUMBER },
        { type: oracledb.NUMBER },
        { type: oracledb.NUMBER },
        { type: oracledb.NUMBER },
        { type: oracledb.NUMBER },
        { type: oracledb.NUMBER },
        { type: oracledb.NUMBER },
        { type: oracledb.NUMBER },
        { type: oracledb.NUMBER },
        { type: oracledb.NUMBER },
        { type: oracledb.NUMBER },
        { type: oracledb.NUMBER },
        { type: oracledb.NUMBER },
        { type: oracledb.STRING },
        { type: oracledb.NUMBER },
        { type: oracledb.NUMBER },
        { type: oracledb.DATE },
        { type: oracledb.NUMBER },
      { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT }
      ]
    }
  };

  if (req.type == "Not Return") {
    return new Promise((resolve, reject) => { database.insertStoreProcedureExecute(parameters,function(err,result){ 
      if(err){
        reject(err);
      } else {
        resolve(result);
      } 
      });
    });
  }else{
    database.insertStoreProcedureExecute(parameters, function (err, result) {
      if (err) {
        return res(err, null);
      } else{
        return res(null,result);
      }
    });
  }
}
 

async function getAllDocumentTrackingListByLabel(req, res) {

  let parameters = {
    query: `BEGIN MOB_GET_DOC_TRAC_PENDING(:p_Resource_id,:p_build_code,:p_Unit,:p_Customer_name,:p_lease_num,:p_type,:result_set); END;`,
    params: {
        p_Resource_id: req.Resource_id ? req.Resource_id : null,
        p_build_code: req.build_code ? req.build_code : null,
        p_Unit: req.Unit ? req.Unit : null,
        p_Customer_name: req.Customer_name ? req.Customer_name : null,
        p_lease_num: req.lease_num ? req.lease_num : null,
        p_type: req.label_type ? req.label_type : null,
        result_set: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    }
  };
  if(req.type == "Not Return") {
    return new Promise((resolve, reject) => { database.GetDataStoreProcedure(parameters,function(err,result){ 
      if(err){
        reject(err);
      } else {
        resolve(result);
      } 
      });
    });
  }else{
    database.GetDataStoreProcedure(parameters, function (err, result) {
      if (err) {
        return res(err, null);
      } else{
        return res(null,result);
      }
    });
  }
}


module.exports = {
  list,
  getTaskWeeklyCommentsv1,
  getMoveCommentToObjective,
  getWeeklyCommentsdelete,
  getMoveCommentToResult,
  TaskWeeklyCommentsUpdate,
  TaskWeeklyCommentsfileinsert,
  TaskWeeklyfilelist,
  getRoiFilesList,
  DailytaskcommetsInsert,
  getInsertDailyWeekResultComments,
  getUserRoiWeekDetails,
  getUserRoiWeekSummary,
  getTaskWeeklyCommentsDetails,
  getLpoApprovalListDetails,
  ApprovedatainsertDAL,
  GetFcmTokenForLpo,
  androidPushNotificationSend,
  RejectdatainsertDAL,
  getFinancePaymentApprovalListDetails,
  getDeleteCommonAttachment,
  getFinancePaymentAttachmentList,
  commentsInsert,
  getLpoManagerListALL,
  updateFinancePaymentRequestStatus,
  getAllDocumentTrackingListByLabel
};
