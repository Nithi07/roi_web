const registerRepo = require('../repository');
var moment = require('moment');
const constant = require('../../common/constant');
var atob = require('atob');
var Blob = require('node-blob');

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
//const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

var key = "abcdefghijklmnopqrstuvwx";

async function listdata(req, res) {

  res.render('pages/currentweekroi', {
    data: [],
    moment: moment
  });

}

async function getNextWeekRoiData(req, res) {

  res.render('pages/nextweekroi', {
    data: [],
    moment: moment
  });

}


function dailycommentscount(req, res, next) {
  try {
    const context = {};

    var startOfWeek = moment().startOf('week').toDate();
    var endOfWeek = moment().endOf('week').toDate();

    if (req.body.comments_type == "Current") {

      context.start_date = moment(startOfWeek).format("DD-MMM-YYYY");
      context.end_date = moment(endOfWeek).format("DD-MMM-YYYY");
      context.type = parseInt(req.body.gettype) ? parseInt(req.body.gettype) : 1;

    } else if (req.body.comments_type == "Next") {

      context.start_date = moment(endOfWeek).add(1, 'days').format("DD-MMM-YYYY");
      context.end_date = moment(endOfWeek).add(7, 'days').format("DD-MMM-YYYY");
      context.type = 5;

    } else {

      context.start_date = moment(endOfWeek).add(1, 'days').format("DD-MMM-YYYY");
      context.end_date = moment(endOfWeek).add(7, 'days').format("DD-MMM-YYYY");
      context.type = parseInt(req.body.gettype) ? parseInt(req.body.gettype) : 1;
    }

    context.user_info_id = parseInt(req.body.user_id);

    registerRepo.getTaskWeeklyCommentsv1(context, async function (err, data) {
      if (!err) {
        var comment_data = [];
        let weeklycomments_count = {};
        if (data.length > 0) {
          let Result = data.filter(x => x.TYPE == 'R');
          let Objects = data.filter(x => x.TYPE == 'O');
          let Ideas = data.filter(x => x.TYPE == 'I');
          weeklycomments_count.Result = Result;
          weeklycomments_count.Object = Objects;
          weeklycomments_count.Ideas = Ideas;
        } else {
          weeklycomments_count.Result = [];
          weeklycomments_count.Object = [];
          weeklycomments_count.Ideas = [];
        }
        res.status(200).json(weeklycomments_count);
      } else {
        res.status(500).end('Internal Server Error');
      }
    });
  } catch (err) {
    next(err);
  }
}


function getMoveWeeklyCommentToObjective(req, res, next) {
  try {
    const context = {};
    context.modified_by = parseInt(req.body.user_info_id);
    context.modified_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
    context.comments_child_id = parseInt(req.body.comments_child_id);
    context.user_info_id = parseInt(req.body.user_info_id);
    context.type = 'O';

    registerRepo.getMoveCommentToObjective(context, async function (err, data) {
      if (!err) {
        let allList = {};
        allList = data;
        res.status(200).json(allList);
      } else {
        res.status(500).end('Internal Server Error');
      }
    });
  } catch (err) {
    next(err);
  }
}


function getWeeklycommentsdelete(req, res, next) {
  try {
    const context = {};
    context.modified_by = parseInt(req.body.user_info_id);
    context.modified_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
    context.child_id = parseInt(req.body.comments_child_id);
    context.is_deleted = 1;

    registerRepo.getWeeklyCommentsdelete(context, async function (err, data) {
      if (!err) {
        let allList = {};
        allList = data;
        res.status(200).json(allList);
      } else {
        res.status(500).end('Internal Server Error');
      }
    });
  } catch (err) {
    next(err);
  }
}


function getMoveWeeklyCommentToResult(req, res, next) {
  try {
    const context = {};
    context.modified_by = parseInt(req.body.user_info_id);
    context.modified_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
    context.comments_child_id = parseInt(req.body.comments_child_id);
    context.user_info_id = parseInt(req.body.user_info_id);
    context.type = 'R';

    registerRepo.getMoveCommentToResult(context, async function (err, data) {
      if (!err) {
        let allList = {};
        allList = data;
        res.status(200).json(allList);
      } else {
        res.status(500).end('Internal Server Error');
      }
    });
  } catch (err) {
    next(err);
  }
}


async function getUpdateResultRoi(req, res, next) {
  try {
    var comments_text = '';
    var post = req.body;
    var comments_val = JSON.parse(req.body.comments_val);
    comments_val = comments_val.filter((x) => x.comments != '' && x.comments != 'null' && x.comments != null);
    for (var i = 0; i < comments_val.length; i++) {
      if (comments_val[i].comments != '') {
        comments_text += '<p>' + comments_val[i].comments + '</P>';
      }
    }

    const context = {};
    context.modified_by = parseInt(req.body.user_info_id);
    context.modified_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
    context.COMMENTS = comments_text;
    context.COMMENTS_arr = comments_val;
    context.COMMENTS_ID = parseInt(req.body.comments_id);
    context.is_deleted = 0;


    registerRepo.TaskWeeklyCommentsUpdate(context, async function (err, data) {
      if (!err) {
        let allList = {};
        allList = data;
        res.status(200).json(allList);
      } else {
        res.status(500).end('Internal Server Error');
      }
    });
  } catch (err) {
    next(err);
  }
}


function dailycommentsInsertFile(req, res, next) {
  try {
    req.body.name = JSON.parse(req.body.name);
    req.body.size_data = JSON.parse(req.body.size_data);
    req.body.imageURI = JSON.parse(req.body.imageURI_data);

    var sizedata = req.body.size_data ? req.body.size_data : 0;

    if (sizedata.length > 0 || sizedata > 0) {
      blobdata(req, res);

      for (j = 0; j < req.body.imageURI.length; j++) {
        const context = {};

        context.created_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.created_by = parseInt(req.body.user_info_id);
        context.modified_by = parseInt(req.body.user_info_id);
        context.modified_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.COMMENTS_ID = parseInt(req.body.COMMENTS_ID);
        context.size_data = req.body.size_data[j];
        context.file_content = req.blob[j];
        context.file_name = req.body.name[j];

        if (bytesToSize(req.body.size_data[j]) > 2) {
          console.log(bytesToSize(req.body.size_data[j]));
          res.status(500).end('File size is too large.');
        } else {
          console.log(bytesToSize(req.body.size_data[j]));
          registerRepo.TaskWeeklyCommentsfileinsert(context, async function (err, data) {
            if (!err) {
              let allList = {};
              allList = data;
              res.status(200).json(allList);
            } else {
              res.status(500).end('Internal Server Error');
            }
          });
        }
      }

    } else {
      res.status(500).end('File not found.');
    }
  } catch (err) {
    next(err);
  }
}

function bytesToSize(bytes) {
  return parseFloat((bytes / 1048576).toFixed(2));
}

function blobdata(req, res) {
  if (req.body.imageURI.length > 0) {
    var b = [];
    for (j = 0; j < req.body.imageURI.length; j++) {
      var dataURL = req.body.imageURI[j];
      var BASE64_MARKER = ';base64,';

      var parts = dataURL.split(BASE64_MARKER);
      var contentType = parts[0].split(':')[1];
      var raw = atob(parts[1]);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);
      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      b.push(new Blob([uInt8Array], {
        type: contentType
      }));
    }
    req.blob = b;
  }

}


function weeklyUploadedFileList(req, res, next) {
  try {
    const context = {};

    context.COMMENTS_ID = parseInt(req.body.COMMENTS_ID);

    registerRepo.TaskWeeklyfilelist(context, async function (err, data) {
      if (!err) {
        let allList = {};
        allList = data;
        res.status(200).json(allList);
      } else {
        res.status(500).end('Internal Server Error');
      }
    });
  } catch (err) {
    next(err);
  }
}

var getDownloadRoiFiles = async (req, res) => {
  try {

    let data = await registerRepo.getRoiFilesList({ file_id: req.params.id });
    if (data.length > 0) {
      let file_name = data[0].FILE_NAME;
      let nameSplit = file_name.split('.');
      let fileTypes = constant.filetypes;
      let extn = nameSplit[nameSplit.length - 1];
      extn = extn ? extn.toUpperCase() : ''
      let _type = fileTypes.find((item) => item.EXTN = extn);
      let c_type = _type ? _type.CONTENT_TYPE : '';
      res.status(200);
      res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': c_type,
        'Content-Disposition': 'attachment; filename=' + data[0].FILE_NAME
      });
      res.send(data[0].FILE_CONTENT);
    } else {
      res.status('404').json(data);
    }
  }
  catch (ex) {
    res.status('500').json();
  }
}



function dailycommentsinsert(req, res, next) {
  try {
    var comments_text = '';
    var comments_val = JSON.parse(req.body.COMMENTS);
    comments_val = comments_val.filter((x) => x.comments != '' && x.comments != 'null' && x.comments != null);

    for (var i = 0; i < comments_val.length; i++) {
      if (comments_val[i].comments != '') {
        comments_text += '<p>' + comments_val[i].comments + '</P>';
      }
    }

    let encryptData = req.body.created_by;

    var decrypt = crypto.createDecipheriv('des-ede3', key, "");
    var s = decrypt.update(encryptData, 'base64', 'utf8');
    var user_info_id = s + decrypt.final('utf8');
    console.log(user_info_id);

    if (comments_val.length > 0) {
      const context = {};
      if (req.body.insert_type == "Current") {
        context.created_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.created_by = parseInt(user_info_id);
        context.modified_by = parseInt(user_info_id);
        context.modified_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.COMMENTS = comments_text;
        context.COMMENTS_arr = comments_val;
      } else if (req.body.insert_type == "Next") {
        context.created_on = moment().add(7, 'days').format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.created_by = parseInt(user_info_id);
        context.modified_by = parseInt(user_info_id);
        context.modified_on = moment().add(7, 'days').format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.COMMENTS = comments_text;
        context.COMMENTS_arr = comments_val;
      }
      context.comments_type = req.body.comments_type;
      registerRepo.DailytaskcommetsInsert(context, async function (err, data) {
        if (!err) {
          res.status(200).json(data);
        } else {
          res.status(500).end('Internal Server Error');
        }
      });
    } else {
      res.status(200).json({});
    }
  } catch (err) {
    //next(err);
    console.log(err);
  }
}

async function getEmailRoiPage(req, res) {

  console.log(req.params.id);

  let userid = req.params.id.toString().replace('Por21Ld', '/');

  console.log(userid);

  console.log(__basedir);
  res.render('pages/emailroi', {
    data: [],
    moment: moment,
    userInfoId: userid,
    site_url: __basedir
  });
}



function getInserWeeklyResults(req, res, next) {
  try {
    var comments_text = '';
    var comments_val = JSON.parse(req.body.COMMENTS);
    comments_val = comments_val.filter((x) => x.comments != '' && x.comments != 'null' && x.comments != null);

    for (var i = 0; i < comments_val.length; i++) {
      if (comments_val[i].comments != '') {
        comments_text += '<p>' + comments_val[i].comments + '</P>';
      }
    }

    let encryptData = req.body.created_by;

    var decrypt = crypto.createDecipheriv('des-ede3', key, "");
    var s = decrypt.update(encryptData, 'base64', 'utf8');
    var user_info_id = s + decrypt.final('utf8');
    console.log(user_info_id);

    if (comments_val.length > 0) {
      const context = {};
      if (req.body.insert_type == "Current") {
        context.created_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.created_by = parseInt(user_info_id);
        context.modified_by = parseInt(user_info_id);
        context.modified_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.COMMENTS = comments_text;
        context.COMMENTS_arr = comments_val;
      } else if (req.body.insert_type == "Next") {
        context.created_on = moment().add(7, 'days').format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.created_by = parseInt(user_info_id);
        context.modified_by = parseInt(user_info_id);
        context.modified_on = moment().add(7, 'days').format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.COMMENTS = comments_text;
        context.COMMENTS_arr = comments_val;
      }
      context.comments_type = req.body.comments_type;
      registerRepo.getInsertDailyWeekResultComments(context, async function (err, data) {
        if (!err) {
          res.status(200).json(data);
        } else {
          res.status(500).end('Internal Server Error');
        }
      });
    } else {
      res.status(200).json({});
    }
  } catch (err) {
    next(err);
  }
}

function encrypt(text) {
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  //return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

async function getUserRoiPage(req, res) {

  console.log(req.params);

  let userid = req.params.id.toString().replace('Por21Ld', '/');
  let loginuserid = req.params.loginUserid.toString().replace('Por21Ld', '/');

  console.log(__basedir);
  console.log(userid);
  console.log(loginuserid);

  res.render('pages/userroilist', {
    data: [],
    moment: moment,
    userInfoId: userid,
    userName: req.params.name,
    site_url: __basedir,
    loginUser: loginuserid
  });

}

function getUserRoiWeekList(req, res, next) {
  try {
    const context = {};
    var startOfWeek = moment().startOf('week').toDate();
    var endOfWeek = moment().endOf('week').toDate();

    context.start_date = moment(startOfWeek).format("DD-MMM-YYYY");
    context.end_date = moment(endOfWeek).format("DD-MMM-YYYY");
    context.type = req.body.type_id ? req.body.type_id : 2;
    context.reporting_user_name = req.body.user_name;

    let encryptData = req.body.login_user_id;

    var decrypt = crypto.createDecipheriv('des-ede3', key, "");
    var s = decrypt.update(encryptData, 'base64', 'utf8');
    var user_info_id = s + decrypt.final('utf8');
    console.log(user_info_id);

    context.user_info_id = parseInt(user_info_id);

    let encryptData1 = req.body.user_id;

    var decrypt = crypto.createDecipheriv('des-ede3', key, "");
    var s = decrypt.update(encryptData1, 'base64', 'utf8');
    var reporting_user_id = s + decrypt.final('utf8');
    console.log(reporting_user_id);
    context.reporting_user_id = parseInt(reporting_user_id);

    registerRepo.getUserRoiWeekSummary(context, async function (err, data) {
      if (!err) {
        res.status(200).json(data);
      } else {
        res.status(500).end('Internal Server Error');
      }
    });
  } catch (err) {
    next(err);
  }
}

function getWeeklycommentsDetails(req, res, next) {
  try {

    const context = {};

    var startOfWeek = '';
    var endOfWeek = '';

    if (req.body.startweek == "" || req.body.startweek == null || req.body.startweek == undefined) {
      startOfWeek = moment().startOf('week').toDate();

    } else {
      startOfWeek = req.body.startweek
    }

    if (req.body.endweek == "" || req.body.endweek == null || req.body.endweek == undefined) {
      endOfWeek = moment().endOf('week').toDate();

    } else {
      endOfWeek = req.body.endweek
    }

    context.start_date = moment(startOfWeek).format("DD-MMM-YYYY");
    context.end_date = moment(endOfWeek).format("DD-MMM-YYYY");
    context.type = req.body.type;

    let encryptData = req.body.user_id;

    var decrypt = crypto.createDecipheriv('des-ede3', key, "");
    var s = decrypt.update(encryptData, 'base64', 'utf8');
    var user_info_id = s + decrypt.final('utf8');
    console.log(user_info_id);

    context.user_info_id = parseInt(user_info_id);

    registerRepo.getTaskWeeklyCommentsDetails(context, async function (err, data) {
      if (!err) {
        let allList = {};
        allList = data;
        res.status(200).json(allList);
      } else {
        res.status(500).end('Internal Server Error');
      }
    });
  } catch (err) {
    next(err);
  }
}

async function getUserLpoApprovalListPage(req, res) {

  console.log(req.params);

  console.log(__basedir);

  let encryptData = req.params.id.toString().replace('Por21Ld', '/');

  var decrypt = crypto.createDecipheriv('des-ede3', key, "");
  var s = decrypt.update(encryptData, 'base64', 'utf8');
  var user_info_id = s + decrypt.final('utf8');
  console.log(user_info_id);

  let context = {
    LBL_TYPE: 'CEOA',
    LPO_ID: null,
    CALL_ID: null,
    USER_INFO_ID: parseInt(user_info_id)
  }

  registerRepo.getLpoApprovalListDetails(context, async function (err, data) {
    if (!err) {

      res.render('pages/userlpolist', {
        data: [],
        moment: moment,
        userInfoId: req.params.id,
        lpodata: data,
        site_url: __basedir,
        userType: req.params.usertype
      });

    } else {
      res.status(500).end('Internal Server Error');
    }
  });

}

async function getUserFinancePaymentListPage(req, res) {

  console.log(req.params);

  console.log(__basedir);

  let encryptData = req.params.id.toString().replace('Por21Ld', '/');

  var decrypt = crypto.createDecipheriv('des-ede3', key, "");
  var s = decrypt.update(encryptData, 'base64', 'utf8');
  var user_info_id = s + decrypt.final('utf8');
  console.log(user_info_id);

  let context = {
    USER_INFO_ID: parseInt(user_info_id)
  }

  registerRepo.getFinancePaymentApprovalListDetails(context, async function (err, data) {
    if (!err) {

      console.log(data);
      res.render('pages/userfinancepaymentlist', {
        data: [],
        moment: moment,
        userInfoId: req.params.id,
        lpodata: data,
        site_url: __basedir,
        userType: req.params.usertype,
        type_id: req.params.type_id
      });

    } else {
      res.status(500).end('Internal Server Error');
    }

  });

}

async function getUserDocumentTrackingListPage(req, res) {

  console.log(req.params);
  console.log(__basedir);
  let type_id = req.params.type_id;
 
  let encryptData = req.params.id.toString().replace('Por21Ld', '/');

  var decrypt = crypto.createDecipheriv('des-ede3', key, "");
  var s = decrypt.update(encryptData, 'base64', 'utf8');
  var user_info_id = s + decrypt.final('utf8');
  console.log(user_info_id);

  let user_id = parseInt(user_info_id);
  let resource_type_id = parseInt(type_id);


  // let res_encryptData = req.params.resource_id;

  // var res_decrypt = crypto.createDecipheriv('des-ede3', key, "");
  // var s = res_decrypt.update(res_encryptData, 'base64', 'utf8');
  // var res_ = s + res_decrypt.final('utf8');
  // console.log(res_);

  let resource_id = parseInt(req.params.resource_id);

  const context = {};
  context.user_info_id = null;
  if (resource_type_id == 22 || resource_type_id == 8 || user_id == 2) {
    context.Resource_id = null;
  } else {
    context.Resource_id = resource_id;
  }
  context.label_type = req.body.type;
  context.type = "";

  registerRepo.getAllDocumentTrackingListByLabel(context, async function (err, data) {
    if (!err) {
      console.log(data);
      let documenttrackingdetails = data;
      let searchdocumenttrackingdetails = [];

      if (documenttrackingdetails.length > 0) {

        let length = 1;

        for (let i = 0; i < documenttrackingdetails.length; i++) {

          documenttrackingdetails[i].LEASE_COMMENCEMENT_DATE = moment(documenttrackingdetails[i].LEASE_COMMENCEMENT_DATE).format("DD-MMM-YYYY");
          documenttrackingdetails[i].LEASE_TERMINATION_DATE = moment(documenttrackingdetails[i].LEASE_TERMINATION_DATE).format("DD-MMM-YYYY");

          documenttrackingdetails[i].ENABLE_STATUS_VISIBLE = 0;
          documenttrackingdetails[i].ENABLE_STATUS = 0;
          documenttrackingdetails[i].STATUS_NAME = '';
          documenttrackingdetails[i].TOOL_TIP = '';

          documenttrackingdetails[i].ENABLE_STATUS_1_VISIBLE = 0;
          documenttrackingdetails[i].ENABLE_STATUS_1 = 0;
          documenttrackingdetails[i].STATUS_NAME_1 = '';
          documenttrackingdetails[i].TOOL_TIP_1 = '';

          documenttrackingdetails[i].ENABLE_STATUS_2_VISIBLE = 0;
          documenttrackingdetails[i].ENABLE_STATUS_2 = 0;
          documenttrackingdetails[i].STATUS_NAME_2 = '';
          documenttrackingdetails[i].TOOL_TIP_2 = '';

          documenttrackingdetails[i].ENABLE_STATUS_3_VISIBLE = 0;
          documenttrackingdetails[i].ENABLE_STATUS_3 = 0;
          documenttrackingdetails[i].STATUS_NAME_3 = '';
          documenttrackingdetails[i].TOOL_TIP_3 = '';

          if (documenttrackingdetails[i].STATUS == 0) {

            documenttrackingdetails[i].ENABLE_STATUS = 1;
            documenttrackingdetails[i].STATUS_NAME = "Pending for sent to client sign/";

            if(resource_type_id == 10 || resource_type_id == 14 || user_id == 2) {
                documenttrackingdetails[i].ENABLE_STATUS = 1;
            } else {
                documenttrackingdetails[i].ENABLE_STATUS = 0;
                documenttrackingdetails[i].TOOL_TIP = "Only Leasing user can update";
            }

          } else if (documenttrackingdetails[i].STATUS == 1) {

            documenttrackingdetails[i].ENABLE_STATUS = 1;
            documenttrackingdetails[i].STATUS_NAME = "Pending to Receive from client/";

            if (resource_type_id == 10 || resource_type_id == 14 || user_id == 2) {
              documenttrackingdetails[i].ENABLE_STATUS = 1;
            } else {
              documenttrackingdetails[i].ENABLE_STATUS = 0;
              documenttrackingdetails[i].TOOL_TIP = "Only Leasing user can update/";
            }

          } else if (documenttrackingdetails[i].STATUS == 2) {

            documenttrackingdetails[i].ENABLE_STATUS = 1;
            documenttrackingdetails[i].STATUS_NAME = "Pending to sent for Mgmt Sign/";

            if (resource_type_id == 10 || resource_type_id == 14 || user_id == 2) {
              documenttrackingdetails[i].ENABLE_STATUS = 1;
            } else {
              documenttrackingdetails[i].ENABLE_STATUS = 0;
              documenttrackingdetails[i].TOOL_TIP = "Only Leasing user can update";
            }

          } else if (documenttrackingdetails[i].STATUS == 3) {

            if (documenttrackingdetails[i].LEASE_TYPE_CODE != 'GRS' && documenttrackingdetails[i].ATTRIBUTE2 == 0) 
            {

              documenttrackingdetails[i].STATUS_NAME = "Pending to Receive From Landlord Sign/";

              if (resource_type_id == 8 || resource_type_id == 22 || resource_type_id == 43 || resource_type_id == 44 || resource_type_id == 14 || user_id == 2) {
                documenttrackingdetails[i].ENABLE_STATUS = 1;
              } else {
                documenttrackingdetails[i].ENABLE_STATUS = 0;
                documenttrackingdetails[i].TOOL_TIP = "Only CEO/COO or CEO-Office or Leasing Mgr user can update";
              }

              if (documenttrackingdetails[i].PROPERTY_NAME != "AJMAN" && documenttrackingdetails[i].PROPERTY_NAME != "Ajman" && documenttrackingdetails[i].ATTRIBUTE1 != 'Parking') {

                if (documenttrackingdetails[i].EJARI == 0) {

                  documenttrackingdetails[i].ENABLE_STATUS_2_VISIBLE = 1;
                  documenttrackingdetails[i].STATUS_NAME_2 = " /Request for Ejari";

                  if (resource_type_id == 10 || resource_type_id == 14 || user_id == 2) {
                    documenttrackingdetails[i].ENABLE_STATUS_2 = 1;
                  } else {
                    documenttrackingdetails[i].ENABLE_STATUS_2 = 0;
                    documenttrackingdetails[i].TOOL_TIP_2 = "Only Leasing type user can request";
                  }

                } else if (documenttrackingdetails[i].EJARI == 1) {

                  documenttrackingdetails[i].ENABLE_STATUS_2_VISIBLE = 1;
                  documenttrackingdetails[i].STATUS_NAME_2 = " /Check the contract";

                  if (!(resource_type_id == 43 || resource_type_id == 44 || user_id == 2)) {
                    documenttrackingdetails[i].ENABLE_STATUS_2 = 0;
                    documenttrackingdetails[i].TOOL_TIP_2 = "Only CEO-office user can update";
                  }

                } else if (documenttrackingdetails[i].EJARI == 2) {

                  documenttrackingdetails[i].ENABLE_STATUS_2_VISIBLE = 1;
                  documenttrackingdetails[i].STATUS_NAME_2 = " /Pending for COO/CEO Approval";

                  if (!(resource_type_id == 8 || resource_type_id == 22 || user_id == 2)) {
                    documenttrackingdetails[i].ENABLE_STATUS_2 = 0;
                    documenttrackingdetails[i].TOOL_TIP_2 = "Only CEO/COO type user can update";
                  }

                } else if (documenttrackingdetails[i].EJARI == 3) {

                  if (documenttrackingdetails[i].EJARI_COUNT == 0) {

                    documenttrackingdetails[i].ENABLE_STATUS_3_VISIBLE = 1;
                    documenttrackingdetails[i].STATUS_NAME_3 = " /Upload Ejari";

                    if (!(resource_type_id == 10 || resource_type_id == 14 || user_id == 2)) {
                      documenttrackingdetails[i].ENABLE_STATUS_3 = 0;
                      documenttrackingdetails[i].TOOL_TIP_3 = "Only Leasing team can upload";
                    }
                  } else {
                    documenttrackingdetails[i].ENABLE_STATUS_3_VISIBLE = 1;
                    documenttrackingdetails[i].STATUS_NAME_3 = " /Ejari Completed";
                  }
                }
              }
            } else {
              documenttrackingdetails[i].ENABLE_STATUS = 1;
              documenttrackingdetails[i].STATUS_NAME = "Sent for Mgmt Sign, To be Received/";

              if (resource_type_id == 8 || resource_type_id == 22 || resource_type_id == 43 || resource_type_id == 44 || user_id == 2) {
                documenttrackingdetails[i].ENABLE_STATUS = 1;
              } else {
                documenttrackingdetails[i].ENABLE_STATUS = 0;
                documenttrackingdetails[i].TOOL_TIP = "Only CEO/COO or CEO-Office user can update";
              }

              if (documenttrackingdetails[i].PROPERTY_NAME != "AJMAN" && documenttrackingdetails[i].PROPERTY_NAME != "Ajman" && documenttrackingdetails[i].ATTRIBUTE1 != 'Parking') {

                if (documenttrackingdetails[i].EJARI == 0) {

                  documenttrackingdetails[i].ENABLE_STATUS_2_VISIBLE = 1;
                  documenttrackingdetails[i].STATUS_NAME_2 = " /Request for Ejari";

                  if (resource_type_id == 10 || resource_type_id == 14 || user_id == 2) {
                    documenttrackingdetails[i].ENABLE_STATUS_2 = 1;
                  } else {
                    documenttrackingdetails[i].ENABLE_STATUS_2 = 0;
                    documenttrackingdetails[i].TOOL_TIP_2 = "Only Leasing type user can request";
                  }

                } else if (documenttrackingdetails[i].EJARI == 1) {

                  documenttrackingdetails[i].ENABLE_STATUS_2_VISIBLE = 1;
                  documenttrackingdetails[i].STATUS_NAME_2 = " /Check the contract";

                  if (!(resource_type_id == 43 || resource_type_id == 44 || user_id == 2)) {
                    documenttrackingdetails[i].ENABLE_STATUS_2 = 0;
                    documenttrackingdetails[i].TOOL_TIP_2 = "Only CEO-office user can update";
                  }

                } else if (documenttrackingdetails[i].EJARI == 2) {

                  documenttrackingdetails[i].ENABLE_STATUS_2_VISIBLE = 1;
                  documenttrackingdetails[i].STATUS_NAME_2 = "Pending for COO/CEO Approval";

                  if (!(resource_type_id == 8 || resource_type_id == 22 || user_id == 2)) {
                    documenttrackingdetails[i].ENABLE_STATUS_2 = 0;
                    documenttrackingdetails[i].TOOL_TIP_2 = "Only CEO/COO type user can update";
                  }

                } else if (documenttrackingdetails[i].EJARI == 3) {

                  if (documenttrackingdetails[i].EJARI_COUNT == 0) {

                    documenttrackingdetails[i].ENABLE_STATUS_3_VISIBLE = 1;
                    documenttrackingdetails[i].STATUS_NAME_3 = " /Upload Ejari";

                    if (!(resource_type_id == 10 || resource_type_id == 14 || user_id == 2)) {
                      documenttrackingdetails[i].ENABLE_STATUS_3 = 0;
                      documenttrackingdetails[i].TOOL_TIP_3 = "Only Leasing team can upload";
                    }

                  } else if (documenttrackingdetails[i].EJARI_COUNT == 1) {
                    documenttrackingdetails[i].ENABLE_STATUS_3_VISIBLE = 1;
                    documenttrackingdetails[i].STATUS_NAME_3 = " /Ejari Completed";
                  }
                }
              }
            }

          } else if (documenttrackingdetails[i].STATUS == 4) {

            documenttrackingdetails[i].ENABLE_STATUS = 1;
            documenttrackingdetails[i].STATUS_NAME = "Received from mgmt sign/";

            if (resource_type_id == 8 || resource_type_id == 8 || resource_type_id == 43 || resource_type_id == 44 || user_id == 2) {
              documenttrackingdetails[i].ENABLE_STATUS = 1;
            } else {
              documenttrackingdetails[i].ENABLE_STATUS = 0;
            }

            if (documenttrackingdetails[i].PROPERTY_NAME != "AJMAN") {

              if (documenttrackingdetails[i].EJARI == 1) {

                documenttrackingdetails[i].ENABLE_STATUS_2_VISIBLE = 1;
                documenttrackingdetails[i].STATUS_NAME_2 = "Check the contract";

                if (!(resource_type_id == 43 || resource_type_id == 44 || user_id == 2)) {
                  documenttrackingdetails[i].ENABLE_STATUS_2 = 0;
                  documenttrackingdetails[i].TOOL_TIP_2 = "Only CEO-office user can update";
                }

              } else if (documenttrackingdetails[i].EJARI == 2) {

                documenttrackingdetails[i].ENABLE_STATUS_2_VISIBLE = 1;
                documenttrackingdetails[i].STATUS_NAME_2 = "Pending for COO/CEO Approval";

                if (!(resource_type_id == 8 || resource_type_id == 22 || user_id == 2)) {
                  documenttrackingdetails[i].ENABLE_STATUS_2 = 0;
                  documenttrackingdetails[i].TOOL_TIP_2 = "Only CEO/COO type user can update";
                }
              } else if (documenttrackingdetails[i].EJARI == 3) {

                if (documenttrackingdetails[i].EJARI_COUNT == 0) {

                  documenttrackingdetails[i].ENABLE_STATUS_3_VISIBLE = 1;
                  documenttrackingdetails[i].STATUS_NAME_3 = " /Upload Ejari";

                  if (!(resource_type_id == 10 || resource_type_id == 14 || user_id == 2)) {
                    documenttrackingdetails[i].ENABLE_STATUS_3 = 0;
                    documenttrackingdetails[i].TOOL_TIP_3 = "Only Leasing team can upload";

                  } else if (documenttrackingdetails[i].EJARI_COUNT == 1) {
                    documenttrackingdetails[i].ENABLE_STATUS_3_VISIBLE = 1;
                    documenttrackingdetails[i].STATUS_NAME_3 = " /Ejari Completed";
                  }
                }
              }
            }

          } else if (documenttrackingdetails[i].STATUS == 5) {

            if (documenttrackingdetails[i].FILED == 0) {

              documenttrackingdetails[i].ENABLE_STATUS_1_VISIBLE = 1;
              documenttrackingdetails[i].STATUS_NAME_1 = "Pending for signed and filed/";

              if (resource_type_id == 8 || resource_type_id == 22 || resource_type_id == 43 || resource_type_id == 44 || user_id == 2) {
                documenttrackingdetails[i].ENABLE_STATUS_1 = 1;
              }
              else {
                if (documenttrackingdetails[i].PROPERTY_NAME != "AJMAN" && documenttrackingdetails[i].PROPERTY_NAME != "Ajman") {

                  if (resource_type_id == 14) {
                    documenttrackingdetails[i].ENABLE_STATUS_1 = 1;
                  } else {
                    documenttrackingdetails[i].ENABLE_STATUS_1 = 0;
                    documenttrackingdetails[i].TOOL_TIP_1 = "Only CEO/COO or CEO-Office or Leasing MGR user can update";
                  }
                } else {
                  documenttrackingdetails[i].ENABLE_STATUS_1 = 0;
                  documenttrackingdetails[i].TOOL_TIP_1 = "Only CEO/COO or CEO-Office user can update";
                }
              }
            } else {
              documenttrackingdetails[i].ENABLE_STATUS_1_VISIBLE = 0;
            }

            if (documenttrackingdetails[i].CUST_DISP == 1) {

              documenttrackingdetails[i].ENABLE_STATUS = 1;
              documenttrackingdetails[i].STATUS_NAME = "Pending for client dispatch";

              if (resource_type_id || resource_type_id == 14 || user_id == 2) {
                documenttrackingdetails[i].ENABLE_STATUS = 1;
              } else {
                documenttrackingdetails[i].ENABLE_STATUS = 0;
              }

            } else if (documenttrackingdetails[i].CUST_DISP == 0) {

              documenttrackingdetails[i].ENABLE_STATUS = 1;
              documenttrackingdetails[i].STATUS_NAME = "Handover to Leasing For Client Copy Dispatch";

              if (resource_type_id == 8 || resource_type_id == 22 || resource_type_id == 43 || resource_type_id == 44 || user_id == 2) {
                documenttrackingdetails[i].ENABLE_STATUS = 1;
              } else {
                documenttrackingdetails[i].ENABLE_STATUS = 0;
                documenttrackingdetails[i].TOOL_TIP = "Only CEO/COO or CEO-Office user can update";
              }

            } else {
              documenttrackingdetails[i].ENABLE_STATUS_VISIBLE = 0;
            }

            if (documenttrackingdetails[i].FILED == 1 && documenttrackingdetails[i].CUST_DISP == 2) {

              documenttrackingdetails[i].ENABLE_STATUS_1_VISIBLE = 0;
              documenttrackingdetails[i].ENABLE_STATUS_VISIBLE = 1;
              documenttrackingdetails[i].ENABLE_STATUS = 0;
              documenttrackingdetails[i].STATUS_NAME = 'Completed';

            }

            if (documenttrackingdetails[i].PROPERTY_NAME != "AJMAN" && documenttrackingdetails[i].PROPERTY_NAME != "Ajman" && documenttrackingdetails[i].ATTRIBUTE1 != "Parking") {
              if (documenttrackingdetails[i].EJARI_COUNT == 0) {

                documenttrackingdetails[i].ENABLE_STATUS_3_VISIBLE = 1;
                documenttrackingdetails[i].STATUS_NAME_3 = " /Upload Ejari";

                if (!(resource_type_id == 10 || resource_type_id == 14 || user_id == 2)) {
                  documenttrackingdetails[i].ENABLE_STATUS_3 = 0;
                  documenttrackingdetails[i].TOOL_TIP_3 = "Only Leasing team can upload";
                }
              } else {
                documenttrackingdetails[i].ENABLE_STATUS_3_VISIBLE = 1;
                documenttrackingdetails[i].STATUS_NAME_3 = " /Ejari Completed";
              }
            }

          } else if (documenttrackingdetails[i].STATUS == 6) {

            documenttrackingdetails[i].ENABLE_STATUS = 0;
            documenttrackingdetails[i].STATUS_NAME = "Completed/";

            if (documenttrackingdetails[i].PROPERTY_NAME != "AJMAN" && documenttrackingdetails[i].PROPERTY_NAME != "Ajman" && documenttrackingdetails[i].ATTRIBUTE1 != "Parking") {
              if (documenttrackingdetails[i].EJARI_COUNT == 0) {

                documenttrackingdetails[i].ENABLE_STATUS_3_VISIBLE = 1;
                documenttrackingdetails[i].STATUS_NAME_3 = " /Upload Ejari";

                if (!(resource_type_id == 10 || resource_type_id == 14 || user_id == 2)) {
                  documenttrackingdetails[i].ENABLE_STATUS_3 = 0;
                  documenttrackingdetails[i].TOOL_TIP_3 = "Only Leasing team can upload";

                } else if (documenttrackingdetails[i].EJARI_COUNT == 1) {
                  documenttrackingdetails[i].ENABLE_STATUS_3_VISIBLE = 1;
                  documenttrackingdetails[i].STATUS_NAME_3 = " /Ejari Completed";
                }
              }
            }
          }

          if (length == documenttrackingdetails.length) {
            searchdocumenttrackingdetails = documenttrackingdetails.filter(x=> x.ENABLE_STATUS == 1 || x.ENABLE_STATUS_1 == 1 ||x.ENABLE_STATUS_2 == 1||x.ENABLE_STATUS_3 == 1);
            console.log(searchdocumenttrackingdetails);
          }

          length++;

        }
       
      }

      res.render('pages/userdocumenttrackinglist', {
        data: [],
        moment: moment,
        userInfoId: req.params.id,
        lpodata: searchdocumenttrackingdetails,
        site_url: __basedir,
        userType: null,
        type_id: req.params.type_id
      });

    } else {
      res.status(500).end('Internal Server Error');
    }

  });
  
}


async function getUserSecurityListPage(req, res) {

  console.log(req.params);

  console.log(__basedir);

  let userid = req.params.id.toString().replace('Por21Ld', '/');

  res.render('pages/usersecuritydepositlist', {
    data: [],
    moment: moment,
    userInfoId: userid,
    userName: req.params.name,
    site_url: __basedir,
    loginUser: req.params.loginUserid
  });
}

async function getLpoApprovalDetails(req, res, next) {
  try {
    var postData = req.body;

    let encryptData = req.body.user_id;

    var decrypt = crypto.createDecipheriv('des-ede3', key, "");
    var s = decrypt.update(encryptData, 'base64', 'utf8');
    var user_info_id = s + decrypt.final('utf8');
    console.log(user_info_id);

    let context = {
      LBL_TYPE: postData.LBL_TYPE,
      LPO_ID: postData.LPO_ID,
      CALL_ID: postData.CALL_ID,
      USER_INFO_ID: parseInt(user_info_id)
    }
    var dataList = await registerRepo.getLpoApprovalListDetails(context);
    await res.status(200).json(dataList);
  } catch (err) {
    console.log(err);
    next(err);
  }
}


async function getLpoApprovalData1(req, res, next) {
  try {
    var postData = req.body;
    console.log(postData);

    var dataList = [];
    await res.status(200).json(dataList);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

function getLpoApprovalData(req, res, next) {
  try {

    let encryptData = req.body.userInfoId;

    var decrypt = crypto.createDecipheriv('des-ede3', key, "");
    var s = decrypt.update(encryptData, 'base64', 'utf8');
    var user_info_id = s + decrypt.final('utf8');
    console.log(user_info_id);

    var context = {};
    context.Reference_Id = parseInt(req.body.LPOno);
    context.LPO_ID = parseInt(req.body.LPOno);
    context.ReferenceType = "LPO STATUS";
    context.ReferenceType1 = "LPO COMMENT";
    context.comments = req.body.approveComment;
    context.usertype = req.body.usertype;
    context.created_on = moment().format("DD-MMM-YYYY,h:mm:ss a");
    context.created_by = parseInt(user_info_id);
    context.modified_on = moment().format("DD-MMM-YYYY,h:mm:ss a");
    context.modified_by = parseInt(user_info_id);
    context.ref_type = 2;

    if (req.body.usertype == "CEO") {
      context.usertype_id = 8;
    } else {
      context.usertype_id = 0;
    }


    registerRepo.ApprovedatainsertDAL(context, function (err, data) {
      if (!err) {
        const contextPushNotify = {
          LPO_ID: context.Reference_Id,
          COMMENT_BY: context.created_by,
          STATUS: 'Online',
          APP_TYPE: 'FPAPP',
          APP_PLATFORM: null,
          pushNotify: {
            title: `LPO Id :  ${context.Reference_Id}`,
            message: context.usertype + " --> LPO Approved",
            trans_type: 'LPO',
            trans_id: context.Reference_Id,
            seq_text: '',
            chat_user_id: context.created_by
          }
        };
        GetFcmTokenSendPushNotifyForLpo(contextPushNotify);
        res.status(200).json(data);
      } else {
        res.status(500).end('Internal Server Error');
      }
    });
  } catch (err) {
    next(err);
  }
}

var GetFcmTokenSendPushNotifyForLpo = async (req) => {
  try {
    const context = {
      LPO_ID: req.LPO_ID,
      COMMENT_BY: req.COMMENT_BY,
      STATUS: req.STATUS,
      APP_TYPE: req.APP_TYPE,
      APP_PLATFORM: req.APP_PLATFORM
    }
    let lpoTokenList = await registerRepo.GetFcmTokenForLpo(context);
    //  console.log(lpoTokenList);
    await registerRepo.androidPushNotificationSend(req.pushNotify, lpoTokenList)
  } catch (err) {
    console.log(err);
  }
}


function Rejectdatainsert(req, res, next) {
  try {

    let encryptData = req.body.RejectuserInfoId;

    var decrypt = crypto.createDecipheriv('des-ede3', key, "");
    var s = decrypt.update(encryptData, 'base64', 'utf8');
    var user_info_id = s + decrypt.final('utf8');
    console.log(user_info_id);

    var context = {};
    context.Reference_Id = parseInt(req.body.RejectLPOno);
    context.LPO_ID = parseInt(req.body.RejectLPOno);
    context.comments = req.body.rejectComment;
    context.ReferenceType = "LPO COMMENT";
    context.ReferenceType1 = "LPO STATUS";
    context.Comments1 = "LPO Rejected",
      context.created_on = moment().format("DD-MMM-YYYY,h:mm:ss a");
    context.created_by = parseInt(user_info_id);
    context.modified_on = moment().format("DD-MMM-YYYY,h:mm:ss a");
    context.modified_by = parseInt(user_info_id);
    context.ref_type = 1;

    registerRepo.RejectdatainsertDAL(context, function (err, data) {
      if (!err) {
        const contextPushNotify = {
          LPO_ID: context.Reference_Id,
          COMMENT_BY: context.created_by,
          STATUS: 'Online',
          APP_TYPE: 'FPAPP',
          APP_PLATFORM: null,
          pushNotify: {
            title: `LPO Id :  ${context.Reference_Id}`,
            message: context.usertype + " --> " + context.Comments1,
            trans_type: 'LPO',
            trans_id: context.Reference_Id,
            seq_text: '',
            chat_user_id: context.created_by
          }
        };
        GetFcmTokenSendPushNotifyForLpo(contextPushNotify);
        res.status(200).json(data);
      } else {
        res.status(500).end('Internal Server Error');
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).end('Internal Server Error');
  }
}


function getDeleteCommonAttachmentById(req, res, next) {
  try {
    var context = {};
    context.attachment_id = parseInt(req.body.attachment_id);
    context.modified_on = moment().format("DD-MMM-YYYY,h:mm:ss a");
    context.modified_by = req.body.modified_by;

    registerRepo.getDeleteCommonAttachment(context, async function (err, data) {
      if (!err) {
        let commonattachmentDALList = [];
        if (data.length > 0) {
          commonattachmentDALList = data;
        }
        res.status(200).json(commonattachmentDALList);
      } else {
        res.status(500).end('Internal Server Error');
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).end('Internal Server Error');
  }
}


function getFinancePaymentAttachmentList(req, res, next) {
  try {
    const context = {};
    context.ref_id = parseInt(req.body.PAYMENT_REQUEST_ID);
    context.ref_type_id = 2;
    context.ref_code = null;//req.body.ref_code


    registerRepo.getFinancePaymentAttachmentList(context, async function (err, data) {
      if (!err) {
        let rentcommentsList = [];
        if (data.length > 0) {
          rentcommentsList = data;
        }
        res.status(200).json(rentcommentsList);
      } else {
        res.status(500).end('Internal Server Error');
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).end('Internal Server Error');
  }
}

function getFinancePaymentListDetails(req, res, next) {
  try {

    let encryptData = req.body.user_id;

    var decrypt = crypto.createDecipheriv('des-ede3', key, "");
    var s = decrypt.update(encryptData, 'base64', 'utf8');
    var user_info_id = s + decrypt.final('utf8');
    console.log(user_info_id);

    const context = {};
    context.USER_INFO_ID = user_info_id;

    registerRepo.getFinancePaymentApprovalListDetails(context, async function (err, data) {
      if (!err) {
        let rentcommentsList = [];
        if (data.length > 0) {
          rentcommentsList = data;
        }
        res.status(200).json(rentcommentsList);
      } else {
        res.status(500).end('Internal Server Error');
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).end('Internal Server Error');
  }
}

function getInsertFinancePaymentComment(req, res, next) {
  try {
    const context = {};
    let _comments = req.body.COMMENTS;

    let encryptData = req.body.modified_by;

    var decrypt = crypto.createDecipheriv('des-ede3', key, "");
    var s = decrypt.update(encryptData, 'base64', 'utf8');
    var user_info_id = s + decrypt.final('utf8');
    console.log(user_info_id);

    let user_id = parseInt(user_info_id);

    const context1 = {};
    context1.Reference_Id = parseInt(req.body.PAYMENT_REQUEST_ID);
    context1.ReferenceType = req.body.ReferenceType;
    context1.Comments = _comments;
    context1.created_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
    context1.created_by = user_id;
    context1.modified_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
    context1.modified_by = user_id;
    context1.typereturn = "";

    registerRepo.commentsInsert(context1, function (err1, data1) {
      if (!err1) {
        console.log('Common Comments Inserted Successfully...');
        res.status(200).json(data1);
      } else {
        res.status(500).end('Internal Server Error');
      }
    });
  } catch (err) {
    res.status(500).end('Internal Server Error');
  }
}


function getLpoManagerList(req, res, next) {
  try {


    let encryptData = req.body.user_info_id;

    var decrypt = crypto.createDecipheriv('des-ede3', key, "");
    var s = decrypt.update(encryptData, 'base64', 'utf8');
    var user_info_id = s + decrypt.final('utf8');
    console.log(user_info_id);
    let user_id = parseInt(user_info_id);

    const context = {};

    if (user_id == 2) {
      context.user_info_id = null;
    } else {
      context.user_info_id = parseInt(req.body.user_info_id);
    }

    context.type = "";

    registerRepo.getLpoManagerListALL(context, async function (err, data) {
      if (!err) {
        let paymentList = [];
        if (data.length > 0) {
          paymentList = data;
        }
        res.status(200).json(paymentList);
      } else {
        res.status(500).end('Internal Server Error');
      }
    });
  } catch (err) {
    res.status(500).end('Internal Server Error');
  }
}

async function getFinancePaymentRequestStatusUpdate(req, res, next) {
  try {
    const context = {};

    let encryptData = req.body.modified_by;

    var decrypt = crypto.createDecipheriv('des-ede3', key, "");
    var s = decrypt.update(encryptData, 'base64', 'utf8');
    var user_info_id = s + decrypt.final('utf8');
    console.log(user_info_id);
    let user_id = parseInt(user_info_id);

    let old_data = JSON.parse(req.body.old_data);
    let invoice_date = "";

    if (old_data[0].INVOICE_DATE != "" && old_data[0].INVOICE_DATE != null) {
      invoice_date = moment(old_data[0].INVOICE_DATE).format("DD-MMM-YYYY")
    } else {
      invoice_date = null;
    }
    console.log(old_data);
    context.FinancePayReq_Id = old_data[0].FINANCE_PAY_REQ_ID;
    context.Supplier_id = old_data[0].SUPPLIER_ID,
      context.Currency = old_data[0].CURRENCY,
      context.mode_of_payment = old_data[0].MODE_OF_PAYMENT,
      context.hc_rcvd_by = old_data[0].HC_RCVD_BY,
      context.ceo_app_req = old_data[0].CEO_APP_REQ,
      context.is_hard_copy_rcvd = old_data[0].IS_HARD_COPY_RCVD,
      context.finance_remarks = old_data[0].FINANCE_REMARKS,
      context.invoice_number = old_data[0].INVOICE_NUMBER,
      context.invoice_date = invoice_date,
      context.supper_mail = old_data[0].SUPPER_MAIL,
      context.special_remarks = old_data[0].SPECIAL_REMARKS,
      context.approval_code = old_data[0].APPROVAL_CODE,
      context.o_unit_id = old_data[0].O_UNIT_ID,
      context.manager_master_id = old_data[0].MANAGER_MASTER_ID,
      context.no_manager_approved = old_data[0].NO_MANAGER_APPROVED,
      context.status_id = old_data[0].STATUS_ID,
      context.print_count = old_data[0].PRINT_COUNT,
      context.Approval_1 = old_data[0].APPROVAL_1,
      context.is_cancel_requested = old_data[0].IS_CANCEL_REQUESTED,
      context.is_cancel_requested_by = old_data[0].IS_CANCEL_REQUESTED_BY,
      context.is_ceo_reverted = old_data[0].IS_CEO_REVERTED,
      context.ceo_revert_to = old_data[0].CEO_REVERT_TO,
      context.is_revert_to_approved = old_data[0].IS_REVERT_TO_APPROVED,
      context.total = old_data[0].TOTAL,
      context.is_approved = old_data[0].IS_APPROVED,
      context.payee_name = old_data[0].PAYEE_NAME,
      context.is_deleted = old_data[0].IS_DELETED,
      context.is_active = old_data[0].IS_ACTIVE,
      context.modified_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A"),
      context.modified_by = user_id,
      context.type = "Not Return";

    console.log(context);

    let paydetail = {};
    paydetail.detail = await registerRepo.updateFinancePaymentRequestStatus(context);

    res.status(200).json(paydetail);

  } catch (err) {
    res.status(500).end('Internal Server Error');
  }
}



function getRoiinsert(req, res, next) {
  try {
    var comments_text = '';
    var comments_val = JSON.parse(req.body.COMMENTS);
    comments_val = comments_val.filter((x) => x.comments != '' && x.comments != 'null' && x.comments != null);

    for (var i = 0; i < comments_val.length; i++) {
      if (comments_val[i].comments != '') {
        comments_text += '<p>' + comments_val[i].comments + '</P>';
      }
    }

    let user_info_id = req.body.created_by;

    // var decrypt = crypto.createDecipheriv('des-ede3', key, "");
    // var s = decrypt.update(encryptData, 'base64', 'utf8');
    // var user_info_id = s + decrypt.final('utf8');
    // console.log(user_info_id);

    if (comments_val.length > 0) {
      const context = {};
      if (req.body.insert_type == "Current") {
        context.created_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.created_by = parseInt(user_info_id);
        context.modified_by = parseInt(user_info_id);
        context.modified_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.COMMENTS = comments_text;
        context.COMMENTS_arr = comments_val;
      } else if (req.body.insert_type == "Next") {
        context.created_on = moment().add(7, 'days').format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.created_by = parseInt(user_info_id);
        context.modified_by = parseInt(user_info_id);
        context.modified_on = moment().add(7, 'days').format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.COMMENTS = comments_text;
        context.COMMENTS_arr = comments_val;
      }
      context.comments_type = req.body.comments_type;
      registerRepo.DailytaskcommetsInsert(context, async function (err, data) {
        if (!err) {
          res.status(200).json(data);
        } else {
          res.status(500).end('Internal Server Error');
        }
      });
    } else {
      res.status(200).json({});
    }
  } catch (err) {
    //next(err);
    console.log(err);
  }
}

module.exports = {
  listdata,
  getNextWeekRoiData,
  dailycommentscount,
  getMoveWeeklyCommentToObjective,
  getWeeklycommentsdelete,
  getMoveWeeklyCommentToResult,
  getUpdateResultRoi,
  dailycommentsInsertFile,
  weeklyUploadedFileList,
  getDownloadRoiFiles,
  dailycommentsinsert,
  getEmailRoiPage,
  getInserWeeklyResults,
  getUserRoiPage,
  getUserRoiWeekList,
  getWeeklycommentsDetails,
  getUserLpoApprovalListPage,
  getUserFinancePaymentListPage,
  getUserDocumentTrackingListPage,
  getUserSecurityListPage,
  getLpoApprovalDetails,
  getLpoApprovalData,
  Rejectdatainsert,
  getDeleteCommonAttachmentById,
  getFinancePaymentAttachmentList,
  getFinancePaymentListDetails,
  getInsertFinancePaymentComment,
  getLpoManagerList,
  getFinancePaymentRequestStatusUpdate,
  getRoiinsert
};
