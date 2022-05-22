const oracledb = require('oracledb');
const database = require('../../db/index');

var moment = require('moment');

const gcm = require('node-gcm');


function getMinutesOfMeetingListAll(req, res) {
    let parameters = {
      query: `BEGIN MOB_GET_MOM_LIST(:p_user_id,:p_status,:result_set); END;`,
      params: {
        p_user_id: req.user_info_id ?  req.user_info_id : 0,
        p_status: req.status ? req.status : 0,
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

  
function getConfirmMomListAll(req, res) {
    let parameters = {
      query: `BEGIN MOB_GET_MOM_LIST_BY_ID(:p_user_id,:p_status,:p_mom_id,:result_set); END;`,
      params: {
        p_user_id: req.user_info_id ?  req.user_info_id : 0,
        p_status: req.status ? req.status : 0,
        p_mom_id: req.mom_id ? req.mom_id : 0,
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

  
function getArchiveMomListAll(req, res) {
    let parameters = {
      query: `BEGIN MOB_ARCHIVE_MOM_LIST(:p_user_id, :p_status, :p_mom_id, :result_set); END;`,
      params: {
        p_user_id: req.user_info_id ?  req.user_info_id : 0,
        p_status: req.status ? req.status : 0,
        p_mom_id: req.mom_id ? req.mom_id : 0,
        result_set: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
      }
    };
    if(req.returntype == "Not Return") {
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

  
function getMomActionPointList(req, res) {
  let parameters = {
    query: `BEGIN MOB_MOM_ACTION_POINT_LIST(:p_user_id, :p_status, :p_mom_id, :result_set); END;`,
    params: {
      p_user_id: req.user_info_id ?  req.user_info_id : 0,
      p_status: req.status ? req.status : 0,
      p_mom_id: req.mom_id ? req.mom_id : 0,
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


function getArchiveMomActionPointList(req, res) {
  let parameters = {
    query: `BEGIN MOB_ARCHIVE_ACTION_POINT(:p_user_id, :p_status, :p_mom_id, :result_set); END;`,
    params: {
      p_user_id: req.user_info_id ?  req.user_info_id : 0,
      p_status: req.status ? req.status : 0,
      p_mom_id: req.mom_id ? req.mom_id : 0,
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


function getConfirmMomActionPointDetails(req, res) {
  let parameters = {
    query: `BEGIN MOB_CONFIRM_MOM_POINTS(:p_action_point_id, :p_modified_by, :p_modified_on, :p_error_code); END;`,
    params: [
      req.action_point_id ? req.action_point_id : 0,
      req.modified_by ? req.modified_by : 0,
      req.modified_on ? req.modified_on : null,
      0
    ],
    options: {
      autoCommit: true,
      bindDefs: [
        { type: oracledb.NUMBER },
        { type: oracledb.NUMBER },
        { type: oracledb.DB_TYPE_TIMESTAMP },
        { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT }
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



function getMomSubMeetingPdfListAll(req, res) {
  let parameters = {
    query: `BEGIN MOB_GET_PDF_SUB_MOM_ALL(:p_mom_id, :p_user_id, :p_status, :result_set); END;`,
    params: {
      p_mom_id: req.mom_id ? req.mom_id : 0,
      p_user_id: req.user_info_id ?  req.user_info_id : 0,
      p_status: req.status ? req.status : 0,
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


function getMomPdfSubActionPoint(req, res) {
  let parameters = {
    query: `BEGIN MOB_PDF_SUB_ACTION_POINT(:p_user_id, :p_status, :p_mom_id, :result_set); END;`,
    params: {
      p_user_id: req.user_info_id ?  req.user_info_id : 0,
      p_status: req.status ? req.status : 0,
      p_mom_id: req.mom_id ? req.mom_id : 0,
      result_set: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    }
  };
  if(req.returntype == "Not Return") {
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


function getuserList(req, res) {
  let parameters = {
    query: `BEGIN MOB_USER_GET_ALL(:result_set); END;`,
    params: {
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


function getMomInsertv2(req, res) {
  var parameters = {};
  parameters.params = {
    p_title: req.title ? req.title : null,
    p_meeting_date: req.meeting_date ? req.meeting_date : null,
    p_next_meeting_date: req.next_meeting_date ? req.next_meeting_date : null,
    p_status: 1,
    p_created_by: req.created_by ? req.created_by : 0,
    p_created_on: req.created_on ? req.created_on : null,
    p_modified_by: req.modified_by ? req.modified_by : 0,
    p_modified_on: req.modified_on ? req.modified_on : null,
    p_is_active: 1,
    p_is_deleted: 0,
    p_parent_mom_id: req.parent_mom_id ? req.parent_mom_id : null,
    p_organizer_id: req.organizer_id ? req.organizer_id : null,
    p_recurring_meeting: req.recurring_meeting ? req.recurring_meeting : 0,
    p_frequency: req.frequency ? req.frequency : null,
    p_upto_date: req.upto_date ? req.upto_date : null,
    p_next_recurring_date: req.next_recurring_date ? req.next_recurring_date : null,
    p_error_code: { type: oracledb.NUMBER, dir: oracledb.BIND_INOUT }
  }

  parameters.query = `BEGIN MOB_MOM_INSERT_V2(:p_title, :p_meeting_date, :p_next_meeting_date, :p_status, :p_created_by,
                      :p_created_on,:p_modified_by,:p_modified_on, :p_is_active,:p_is_deleted,:p_parent_mom_id,
                      :p_organizer_id,:p_recurring_meeting,:p_frequency,:p_upto_date,:p_next_recurring_date,:p_error_code); END;`,

    database.InsertDataWithGetInsertIdStoreProcedure(parameters, function (err, result) {
      if (err) {
        return res(err, null);
      } else {        
        if(req.COMMENTS_arr.length > 0){
          req.MOM_ID = result.p_error_code;
          getInsertMomActionPointsv1(req, res);
        }else{
          return res(null, result);
        }
      }
    });
}


function getInsertMomActionPointsv1(req, res) {
  let length = 1;
  for (var i = 0; i < req.COMMENTS_arr.length; i++) {
    var action_complete_date = '';
      if(req.COMMENTS_arr[i].action_complete_date !="" && req.COMMENTS_arr[i].action_complete_date != null && req.COMMENTS_arr[i].action_complete_date != undefined){
           action_complete_date = moment(req.COMMENTS_arr[i].action_complete_date).format("DD-MMM-YYYY");
      }else{
        action_complete_date = moment().format("DD-MMM-YYYY");
      }

      
   
      var parameters = {
          query: `BEGIN MOB_INSERT_MOM_ACTION_POINTSV1(:p_mom_id,:p_action_point,:p_action_by,:p_completed_date,
                  :p_created_by,:p_created_on,:p_modified_by,:p_modified_on,:p_is_active,:p_is_deleted,:p_action_by_id,
                  :p_action_by_name,:p_email_to, :p_error_code); END;`,
    
          params: [
            req.MOM_ID ? req.MOM_ID : 0,
            req.COMMENTS_arr[i].action_point ? req.COMMENTS_arr[i].action_point : null,
            req.COMMENTS_arr[i].USER_INFO_ID ? req.COMMENTS_arr[i].USER_INFO_ID : null,
            action_complete_date ? action_complete_date : null,
            req.created_by ? req.created_by : 0,
            req.created_on ? req.created_on : null,
            req.modified_by ? req.modified_by : 0,
            req.modified_on ? req.modified_on : null,
            1,
            0,
            req.COMMENTS_arr[i].action_by_id ? req.COMMENTS_arr[i].action_by_id : null,
            req.COMMENTS_arr[i].action_by_name ? req.COMMENTS_arr[i].action_by_name : null,
            req.COMMENTS_arr[i].emailto ? req.COMMENTS_arr[i].emailto : null,
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
              { type: oracledb.DB_TYPE_TIMESTAMP },
              { type: oracledb.NUMBER },
              { type: oracledb.DB_TYPE_TIMESTAMP },
              { type: oracledb.NUMBER },
              { type: oracledb.NUMBER },
              { type: oracledb.STRING },
              { type: oracledb.STRING },
              { type: oracledb.STRING },
              { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT }
            ]
          }
        }

        database.insertStoreProcedureExecute(parameters, function (err, result) {
          if (err) {
            length = req.COMMENTS_arr.length;
            return res(err, null);
          } else {
            if (req.COMMENTS_arr.length == length) {
              return res(null, req.MOM_ID);
            }
            length++;
          }
        });      
  }
}


function getMomAttendeesInsert(req, res) {
  var parameters = {};
  parameters.params = {
    p_mom_id: req.mom_id ? req.mom_id : null,
    p_user_info_id: req.user_info_id ? req.user_info_id : null,
    p_created_by: req.created_by ? req.created_by : 0,
    p_created_on: req.created_on ? req.created_on : null,
    p_modified_by: req.modified_by ? req.modified_by : 0,
    p_modified_on: req.modified_on ? req.modified_on : null,
    p_is_active: 1,
    p_is_deleted: 0,
    p_error_code: { type: oracledb.NUMBER, dir: oracledb.BIND_INOUT }
  }

  parameters.query = `BEGIN MOB_INSERT_MOM_ATTENDEES(:p_mom_id, :p_user_info_id, :p_created_by, :p_created_on,
                      :p_modified_by,:p_modified_on, :p_is_active,:p_is_deleted,:p_error_code); END;`,

    database.InsertDataWithGetInsertIdStoreProcedure(parameters, function (err, result) {
      if (err) {
        return res(err, null);
      } else {
        return res(null, result);        
      }
    });
}



function getInsertNewActionPointsv1(req, res) {

  var parameters = {
        query: `BEGIN MOB_INS_MOM_ACTION_POINTS_v1(:p_mom_id,:p_action_point,:p_action_by,:p_completed_date,
                :p_created_by,:p_created_on,:p_modified_by,:p_modified_on,:p_is_active,:p_is_deleted,:p_action_by_id,
                :p_action_by_name,:p_emailto, :p_error_code); END;`,
  
        params: [
          req.MOM_ID ? req.MOM_ID : 0,
          req.action_point ? req.action_point : null,
          req.USER_INFO_ID ? req.USER_INFO_ID : null,
          req.action_complete_date ? req.action_complete_date : null,
          req.created_by ? req.created_by : 0,
          req.created_on ? req.created_on : null,
          req.modified_by ? req.modified_by : 0,
          req.modified_on ? req.modified_on : null,
          1,
          0,
          req.action_by_id ? req.action_by_id : null,
          req.action_by_name ? req.action_by_name : null,
          req.emailto ? req.emailto : null,
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
            { type: oracledb.DB_TYPE_TIMESTAMP },
            { type: oracledb.NUMBER },
            { type: oracledb.DB_TYPE_TIMESTAMP },
            { type: oracledb.NUMBER },
            { type: oracledb.NUMBER },
            { type: oracledb.STRING },
            { type: oracledb.STRING },
            { type: oracledb.STRING },
            { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT }
          ]
        }
      }
      database.insertStoreProcedureExecute(parameters, function (err, result) {
        if (err) {            
          return res(err, null);
        } else {       
            return res(null, req.MOM_ID);           
        }
      });        
}


function getUpdateMomActionPointDetailsv1(req, res) {
  let parameters = {
    query: `BEGIN MOB_UPDATE_MOM_POINTS_V1(:p_action_point_id, :p_action_point, :p_action_by,:p_completed_date, :p_modified_by, :p_modified_on,:p_action_by_name,:p_emailto,:p_error_code); END;`,
    params: [
      req.action_point_id ? req.action_point_id : 0,
      req.action_point ? req.action_point : null,
      req.action_by ? req.action_by : 0,
      req.completed_date ? req.completed_date: null,
      req.modified_by ? req.modified_by : 0,
      req.modified_on ? req.modified_on : null,
      req.action_by_name ? req.action_by_name : null,
      req.emailto ? req.emailto : null,
      0
    ],
    options: {
      autoCommit: true,
      bindDefs: [
        { type: oracledb.NUMBER },
        { type: oracledb.STRING },
        { type: oracledb.NUMBER },
        { type: oracledb.DATE },
        { type: oracledb.NUMBER },
        { type: oracledb.DB_TYPE_TIMESTAMP },
        { type: oracledb.STRING },
        { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT }
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


function getMomPdfActionPointList(req, res) {
  let parameters = {
    query: `BEGIN MOB_PDF_ACTION_POINT_LIST(:p_user_id, :p_status, :p_mom_id, :result_set); END;`,
    params: {
      p_user_id: req.user_info_id ?  req.user_info_id : 0,
      p_status: req.status ? req.status : 0,
      p_mom_id: req.mom_id ? req.mom_id : 0,
      result_set: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    }
  };
  if(req.returntype == "Not Return") {
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



function getMomHeaderPdfDownload(req, res) {
  let parameters = {
    query: `BEGIN WEB_GET_PDF_MOM_ALL(:p_mom_id, :p_user_id, :p_status, :result_set); END;`,
    params: {
      p_mom_id: req.mom_id ? req.mom_id : 0,
      p_user_id: req.user_info_id ?  req.user_info_id : 0,
      p_status: req.status ? req.status : 0,
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


function getMomHeaderPdfActionPoint(req, res) {
  let parameters = {
    query: `BEGIN WEB_GET_PDF_ACTION_POINT(:p_user_id, :p_status, :p_mom_id, :result_set); END;`,
    params: {
      p_user_id: req.user_info_id ?  req.user_info_id : 0,
      p_status: req.status ? req.status : 0,
      p_mom_id: req.mom_id ? req.mom_id : 0,
      result_set: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    }
  };
  if(req.returntype == "Not Return") {
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


function getArchiveMomDetails(req, res) {
  let parameters = {
    query: `BEGIN MOB_ARCHIVE_MOM(:p_mom_id, :p_modified_by, :p_modified_on, :p_error_code); END;`,
    params: [
      req.mom_id ? req.mom_id : 0,
      req.modified_by ? req.modified_by : 0,
      req.modified_on ? req.modified_on : null,
      0
    ],
    options: {
      autoCommit: true,
      bindDefs: [
        { type: oracledb.NUMBER },
        { type: oracledb.NUMBER },
        { type: oracledb.DB_TYPE_TIMESTAMP },
        { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT }
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



function getArchiveMomHeaderPdfDownload(req, res) {
  let parameters = {
    query: `BEGIN WEB_GET_ARCHIVE_PDF_MOM_ALL(:p_mom_id, :p_user_id, :p_status, :result_set); END;`,
    params: {
      p_mom_id: req.mom_id ? req.mom_id : 0,
      p_user_id: req.user_info_id ?  req.user_info_id : 0,
      p_status: req.status ? req.status : 0,
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


function getArchiveMomHeaderPdfActionPoint(req, res) {
  let parameters = {
    query: `BEGIN WEB_ARCHIVE_PDF_ACTION_POINT(:p_user_id, :p_status, :p_mom_id, :result_set); END;`,
    params: {
      p_user_id: req.user_info_id ?  req.user_info_id : 0,
      p_status: req.status ? req.status : 0,
      p_mom_id: req.mom_id ? req.mom_id : 0,
      result_set: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    }
  };
  if(req.returntype == "Not Return") {
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



function geArchivetMomPdfListAll(req, res) {
  let parameters = {
    query: `BEGIN MOB_GET_ARCHIVE_PDF_MOM(:p_mom_id, :p_user_id, :p_status, :result_set); END;`,
    params: {
      p_mom_id: req.mom_id ? req.mom_id : 0,
      p_user_id: req.user_info_id ?  req.user_info_id : 0,
      p_status: req.status ? req.status : 0,
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



function getArchiveMomPdfSubActionPoint(req, res) {
  let parameters = {
    query: `BEGIN MOB_ARCHIVE_PDF_SUB_MOM(:p_user_id, :p_status, :p_mom_id, :result_set); END;`,
    params: {
      p_user_id: req.user_info_id ?  req.user_info_id : 0,
      p_status: req.status ? req.status : 0,
      p_mom_id: req.mom_id ? req.mom_id : 0,
      result_set: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    }
  };
  if(req.returntype == "Not Return") {
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


function getUndoArchiveMomDetails(req, res) {
  let parameters = {
    query: `BEGIN MOB_UNDO_ARCHIVE_MOM(:p_mom_id, :p_modified_by, :p_modified_on, :p_error_code); END;`,
    params: [
      req.mom_id ? req.mom_id : 0,
      req.modified_by ? req.modified_by : 0,
      req.modified_on ? req.modified_on : null,
      0
    ],
    options: {
      autoCommit: true,
      bindDefs: [
        { type: oracledb.NUMBER },
        { type: oracledb.NUMBER },
        { type: oracledb.DB_TYPE_TIMESTAMP },
        { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT }
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


function getInsertRoiObjFromMom(req, res) {
  var parameters = {};
  parameters.params = {
    
    p_login_user_id : req.login_user_id ? req.login_user_id : 0,
    p_label_type: req.label_type ? req.label_type : null,
    p_comments: req.COMMENTS ? req.COMMENTS : null,
    p_created_by: req.created_by ? req.created_by : 0,
    p_created_on: req.created_on ? req.created_on : null,
    p_modified_by: req.modified_by ? req.modified_by : 0,
    p_modified_on: req.modified_on ? req.modified_on : null,
    p_is_active: 1,
    p_type: req.comments_type ? req.comments_type : null,
    p_error_code: { type: oracledb.NUMBER, dir: oracledb.BIND_INOUT }
  }
  parameters.query = `BEGIN MOB_INSERT_OBJ_ROI_HEADER(:p_login_user_id,:p_label_type,:p_comments,:p_created_by,:p_created_on,:p_modified_by,:p_modified_on,
            :p_is_active,:p_type,:p_error_code); END;`,

    database.InsertDataWithGetInsertIdStoreProcedure(parameters, function (err, result) {
      if (err) {
        return res(err, null);
      } else {        
        if(req.COMMENTS_arr.length > 0){
          req.COMMENTS_ID = result.p_error_code;
          getObjectiveInsertchildFromMom(req, res);
        }else{
          return res(null, result);
        }
      }
    });
}


function getObjectiveInsertchildFromMom(req, res) {
  let length = 1;
  for (var i = 0; i < req.COMMENTS_arr.length; i++) {
   
      if(req.COMMENTS_arr[i].NAME !=""){
        var parameters = {
          query: `BEGIN MOB_ROI_OBJ_INS_FRM_MOM(:p_comments_id,:p_login_user_id,:p_label_type,:p_comments,:p_created_by,:p_created_on,
          :p_modified_by,:p_modified_on,:p_is_active,:p_is_mom,:p_mom_id,:p_error_code); END;`,
    
          params: [
            req.COMMENTS_ID ? req.COMMENTS_ID : 0,
            req.login_user_id ? req.login_user_id : 0,
            req.label_type ? req.label_type : null,
            req.COMMENTS_arr[i].NAME ? req.COMMENTS_arr[i].NAME : null,
            req.created_by ? req.created_by : 0,
            req.created_on ? req.created_on : null,
            req.modified_by ? req.modified_by : 0,
            req.modified_on ? req.modified_on : null,
            1,
            1,
            req.mom_id ? req.mom_id : 0,
            0
          ],
          options: {
            autoCommit: true,
            bindDefs: [
              { type: oracledb.NUMBER },
              { type: oracledb.NUMBER },
              { type: oracledb.STRING },
              { type: oracledb.STRING },
              { type: oracledb.NUMBER },
              { type: oracledb.DATE },
              { type: oracledb.NUMBER },
              { type: oracledb.DATE },
              { type: oracledb.NUMBER },
              { type: oracledb.NUMBER },
              { type: oracledb.NUMBER },
              { type: oracledb.DB_TYPE_NUMBER, dir: oracledb.BIND_OUT }
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
      }else{
        length++;
      }
      
  }
}

function getChatNotification(req, res) { 
  let parameters = {
    query: `BEGIN MOB_WEEKLY_FCM_TOKEN(:p_user_info_id,:p_app_type,:result_set); END;`,
    params: {
      p_user_info_id: req.user_info_id ? req.user_info_id : 0,
      p_app_type : 'FPAPP',
      result_set: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    }
  };
  
  if (req.type == "Not Return") {
    return new Promise((resolve, reject) => {
      database.GetDataStoreProcedure(parameters, function (err, result) {
        if (err) {
          reject(err);
        } else {
          androidNotificationSendChat(req, result); 
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


function androidNotificationSendChat(req,result) {

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
      "body": req.content+':\n'+req.message
    },
    "data":{
      "trans_type": req.trans_type,
      "chat_user_id": req.loggedin_user_id,
      "received_user_id": req.user_info_id,
      "group_name": req.group_name ? req.group_name: null,
      "roi_comments_id": req.roi_comments_id ? req.roi_comments_id: null
    }
  });

  var regTokens = [];
  for (var i = 0; i < result.length; i++) {
    regTokens.push(result[i].FCM_TOKEN);
  };

  // Actually send the message
  sender.send(message, { registrationTokens: regTokens }, function (err, response) {
    if (err) {
      console.error('Push Notification Send', err);
    }
    else {
      console.log('Push Notification Send', response);
    }
  });
}


function getSubMomListAll(req, res) {
  let parameters = {
    query: `BEGIN MOB_GET_SUB_MOM_LIST_BY_ID(:p_user_id,:p_status,:p_mom_id,:result_set); END;`,
    params: {
      p_user_id: req.user_info_id ?  req.user_info_id : 0,
      p_status: req.status ? req.status : 0,
      p_mom_id: req.mom_id ? req.mom_id : 0,
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

module.exports = {
    getMinutesOfMeetingListAll,
    getConfirmMomListAll,
    getArchiveMomListAll,
    getMomActionPointList,
    getArchiveMomActionPointList,
    getConfirmMomActionPointDetails,
    getMomSubMeetingPdfListAll,
    getMomPdfSubActionPoint,
    getuserList,
    getMomInsertv2,
    getMomAttendeesInsert,
    getInsertNewActionPointsv1,
    getUpdateMomActionPointDetailsv1,
    getMomPdfActionPointList,
    getMomHeaderPdfDownload,
    getMomHeaderPdfActionPoint,
    getArchiveMomDetails,
    getArchiveMomHeaderPdfDownload,
    getArchiveMomHeaderPdfActionPoint,
    geArchivetMomPdfListAll,
    getArchiveMomPdfSubActionPoint,
    getUndoArchiveMomDetails,
    getInsertRoiObjFromMom,
    getChatNotification,
    getSubMomListAll
}