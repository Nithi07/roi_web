const registerRepo = require('../repository');
var moment = require('moment');
const constant = require('../../common/constant');

var sendingEmailConfig = require("../../common/sendingemailConfig");
var PdfPrinter = require('pdfmake');
var fs = require('fs');
var path = require('path');


async function getMomListPage(req, res) {
    const context = {};
    registerRepo.getuserList(context, async function (err, data) {
        if (!err) {
            let userList = [];
            if (data.length > 0) {
                userList = data
            }
            res.render('pages/mymeetings', {userList, moment: moment});
        } else {
            res.status(500).end('Internal Server Error');
        }
    });
}

  
async function getCreateMom(req, res) {
    const context = {};
    var _id = req.query.mom_id ? req.query.mom_id : 0;
    var mom_id = parseInt(_id);
    console.log(mom_id);

    registerRepo.getuserList(context, async function (err, data) {
        if (!err) {
            let userList = [];
            if (data.length > 0) {
                userList = data
            }
            res.render('pages/createminutesofmeeting', {userList, mom_id, moment: moment});
        } else {
            res.status(500).end('Internal Server Error');
        }
    });
}


function getListOfMinutesOfMeeting(req, res, next) {
  try {
      const context = {};
      context.user_info_id = parseInt(req.body.user_info_id);
      context.status = parseInt(req.body.status);
      context.mom_id = parseInt(req.body.mom_id);

      registerRepo.getMinutesOfMeetingListAll(context, async function (err, data) {
            if (!err) {
                let allList = {};
                allList = data;
                res.status(200).json(allList);
            } else {
                res.status(500).end('Internal Server Error');
            }
        });

  }
  catch (err) {
    next(err);
  }
}


function getConfirmMomListById(req, res, next) {
  try {
      const context = {};
      context.user_info_id = parseInt(req.body.user_info_id);
      context.status = parseInt(req.body.status);
      context.mom_id = parseInt(req.body.mom_id);

      registerRepo.getConfirmMomListAll(context, async function (err, data) {
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


function getArchiveMomListAll(req, res, next) {
  try {
      const context = {};
      context.user_info_id = parseInt(req.body.user_info_id);
      context.status = parseInt(req.body.status);
      context.mom_id = parseInt(req.body.mom_id);

      registerRepo.getArchiveMomListAll(context, async function (err, data) {
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


function getMomActionPointListAll(req, res, next) {
    try {
        const context = {};
        context.user_info_id = parseInt(req.body.user_info_id);
        context.status = parseInt(req.body.status);
        context.mom_id = parseInt(req.body.mom_id);

        registerRepo.getMomActionPointList(context, async function (err, data) {
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


function getArchiveMomActionPointList(req, res, next) {
    try {
        const context = {};
        context.user_info_id = parseInt(req.body.user_info_id);
        context.status = parseInt(req.body.status);
        context.mom_id = parseInt(req.body.mom_id);

        registerRepo.getArchiveMomActionPointList(context, async function (err, data) {
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

function getConfirmMomActionPoint123(req, res, next) {

    var fonts = {
        Roboto: {
            normal: path.join(basedir_filepath , '/fonts/Roboto-Regular.ttf'),
            bold: path.join(basedir_filepath + '/fonts/Roboto-Medium.ttf'),
            italics: path.join(basedir_filepath + '/fonts/Roboto-Italic.ttf'),
            bolditalics: path.join(basedir_filepath + '/fonts/Roboto-MediumItalic.ttf')
        }
    };
      
      var PdfPrinter = require('pdfmake');
      var printer = new PdfPrinter(fonts);
      var fs = require('fs');
      
      var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
      
      var options = {
        
      }
      
      var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
      pdfDoc.pipe(fs.createWriteStream('document.pdf'));
      pdfDoc.end();


}


// Confirm Mom
function getConfirmMomActionPoint(req, res, next) {
    try {

        var send_email_id = '';

        if(req.body.to_email != "" && req.body.to_email != null){
            send_email_id = JSON.parse(req.body.to_email);
        } 

        var attendees_array = [];
        var mydate = new Date(req.body.meeting_date);
        var meetingDate = moment(mydate).format("DD-MM-YYYY");

        const context = {};
        context.action_point_id = parseInt(req.body.mom_id);
        context.modified_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.modified_by = parseInt(req.body.user_info_id);

        registerRepo.getConfirmMomActionPointDetails(context, async function (err, data) {
            if (!err) {
                let allList = {};
                allList = data;

                const context1 = {};
                context1.user_info_id = parseInt(req.body.user_info_id);
                context1.mom_id = parseInt(req.body.mom_id);
                context1.status = 0;

                registerRepo.getMomSubMeetingPdfListAll(context1, async function (err, data1) {
                    if (!err) {
                        let allList1 = {};
                        allList1 = data1;

                        const context2 = {};
                        context2.user_info_id = parseInt(req.body.user_info_id);
                        context2.status = 2;
                        context2.mom_id = parseInt(req.body.mom_id);

                        registerRepo.getMomPdfSubActionPoint(context2, async function (err, data2) {
                            if (!err) {
                                
                                let attendees = '';
                                let allList2 = {};
                                allList2 = data2;
                                var content = [];

                                var heading = {
                                    text: 'Minutes of the Meeting',
                                    style: 'header',
                                    decoration: 'underline'
                                };

                                for (let j = 0; j < allList1.length; j++) {

                                    var Mom_items = allList2.filter(x => x.MOM_ID == req.body.mom_id);
                                    var Mom_items_filter = allList2.filter(x => x.MOM_ID == req.body.mom_id && x.ACTION_POINTS != null);

                                    let length = 1;

                                    for (let i = 0; i < Mom_items.length; i++) {

                                        let completed_date = '';

                                        if (Mom_items[i].COMPLETED_DATE != null) {
                                            completed_date = moment(Mom_items[i].COMPLETED_DATE).format("DD-MM-YYYY")
                                        } else {
                                            completed_date = '';
                                        }

                                        Mom_items[i].COMPLETED_DATE = completed_date;
                                      
                                        if(Mom_items[i].ACTION_BY_NAME != "" && Mom_items[i].ACTION_BY_NAME != null){

                                            var action_by_name_array = Mom_items[i].ACTION_BY_NAME.split(',');
                                            for (let j = 0; j < action_by_name_array.length; j++) {
                                                if (attendees_array.indexOf(action_by_name_array[j]) === -1) {
                                                    attendees_array.push(action_by_name_array[j]);
                                                }
                                            }
                                        }
                                        
                                        if(Mom_items[i].TO_EMAIL != "" && Mom_items[i].TO_EMAIL != null){
                                            var email_to_array       = Mom_items[i].TO_EMAIL.split(',');
                                            for (let k = 0; k < email_to_array.length; k++) {
                                                if (attendees_array.indexOf(email_to_array[k]) === -1) {
                                                  attendees_array.push(email_to_array[k]);
                                                }
                                            }
                                        }
                                                                                
                                        if (Mom_items.length == length) {
                                            let flag = attendees_array.includes(req.body.login_user_name);
                                            if (!flag) {
                                                attendees_array.push(req.body.login_user_name);
                                            }
                                            let flag_org = attendees_array.includes(allList1[j].ORGANIZER_NAME);

                                            if (!flag_org) {
                                                attendees_array.push(allList1[j].ORGANIZER_NAME);
                                            }
                                            attendees = arrayToString(attendees_array);
                                        }

                                        length++;

                                        console.log(attendees);

                                    }

                                    let meeting_date = moment(allList1[j].MEETING_DATE).format("DD-MM-YYYY");
                                    let created_on = moment(allList1[j].CREATED_ON).format("DD-MM-YYYY hh:mm A")

                                    if (allList1[j].NEXT_MEETING_DATE != '' && allList1[j].NEXT_MEETING_DATE != null) {
                                        next_meeting_date = moment(allList1[j].NEXT_MEETING_DATE).format("DD-MM-YYYY")
                                    } else {
                                        next_meeting_date = '-';
                                    }

                                    let title = allList1[j].TITLE;

                                    var empty_line = {
                                        text: '                                                           '
                                    };
                                    var Organizer = {
                                        text: 'Organizer: ' + allList1[j].ORGANIZER_NAME,
                                        bold: true
                                    };
                                    var PreparedBy = {
                                        text: 'Prepared By: ' + allList1[j].USER_SURNAME,
                                        bold: true
                                    };
                                    var Create_on = {
                                        text: 'Created On: ' + created_on,
                                        bold: true
                                    };
                                    var content_obj = {
                                        style: 'tableExample',
                                        table: {
                                            widths: [125, 350],
                                            heights: ['auto', 'auto', 'auto', 'auto'],
                                            body: [
                                                [{
                                                    text: 'Date of Meeting',
                                                    bold: true
                                                }, {
                                                    text: meeting_date,
                                                    bold: true
                                                }],
                                                [{
                                                    text: 'Purpose',
                                                    bold: true
                                                }, {
                                                    text: title,
                                                    bold: true
                                                }],
                                                [{
                                                    text: 'Attendees',
                                                    bold: true
                                                }, {
                                                    text: attendees,
                                                    bold: true
                                                }],
                                                [{
                                                    text: 'Next Meeting',
                                                    bold: true
                                                }, {
                                                    text: next_meeting_date,
                                                    bold: true
                                                }]
                                            ]
                                        }
                                    }

                                    content.push(heading);
                                    content.push(empty_line);
                                    content.push(empty_line);
                                    content.push(content_obj);
                                    content.push(empty_line);
                                    content.push(Organizer);
                                    content.push(PreparedBy);
                                    content.push(Create_on);
                                    content.push(empty_line);
                                    content.push(empty_line);
                                    content.push('                                       ');
                                    content.push(table(Mom_items_filter, ['ROW_NUMBER', 'ACTION_POINTS', 'ACTION_BY_NAME', 'COMPLETED_DATE'], ['S.No', 'Action Points', 'Action By', 'When']));

                                }

                                var docDefinition = {
                                    content: content,
                                    styles: {
                                        header: {
                                            fontSize: 18,
                                            bold: true,
                                            alignment: 'center'
                                        },
                                        tableHeader: {
                                            bold: true,
                                            fontSize: 13,
                                            color: 'black'
                                        },
                                        subheader: {
                                            fontSize: 14,
                                            bold: true,
                                            margin: [0, 15, 0, 0]
                                        },
                                        story: {
                                            italic: true,
                                            alignment: 'center',
                                            width: '50%',
                                        },
                                        itemsTableHeader: {
                                            bold: true,
                                            fontSize: 13,
                                            color: 'black'
                                        },
                                        tableExample: {
                                            margin: [0, 5, 0, 15]
                                        }
                                    }
                                };

                                var options = {}

                                console.log(basedir_filepath);

                                var fonts = {
                                    Roboto: {
                                        normal: path.join(basedir_filepath , '/fonts/Roboto-Regular.ttf'),
                                        bold: path.join(basedir_filepath + '/fonts/Roboto-Medium.ttf'),
                                        italics: path.join(basedir_filepath + '/fonts/Roboto-Italic.ttf'),
                                        bolditalics: path.join(basedir_filepath + '/fonts/Roboto-MediumItalic.ttf')
                                    }
                                };

                                var printer = new PdfPrinter(fonts);

                                var dir = basedir_filepath + '/mom/';
                                console.log(dir);
                                
                                console.log(docDefinition);
                                var pdfDoc = printer.createPdfKitDocument(docDefinition,options);
                                pdfDoc.pipe(fs.createWriteStream(dir + 'mom_' + meetingDate + '.pdf'));
                                pdfDoc.end();

                                for(let i=0; i< send_email_id.length; i++){

                                    let heldon = moment(req.body.meeting_date).format("DD-MM-YYYY");
                                    var subject = 'mom '+meetingDate+' '+req.body.title;
                                    var body = "<h1>Hello,</h1><br><p>Title:"+req.body.title+"</p><br><p>Held On:"+heldon+"</p><br><p>Organizer:"+req.body.organizer+"</p><br><p>Prepared By:"+req.body.prepared_by+"</p><br><p>Attendees:"+attendees+"</p>";
                                    var url = basedir_filepath + '/mom/' + 'mom_' + meetingDate + '.pdf';
                                
                                    mailOptions = {
                                        from: sendingEmailConfig.FP_TASK_EMAIL_ID,
                                        to: send_email_id[i],
                                        subject: subject,
                                        html: body,
                                        attachments: [{
                                            filename: 'mom_'+meetingDate+'.pdf',
                                            path: url,
                                            contentType: 'application/pdf'
                                        }]
                                    }
                
                                    console.log(mailOptions);
                
                                    sendingEmailConfig.sendingMail(mailOptions, function (error, response) {
                                        if (error) {
                                            console.log(error);
                                            next(error);
                                        }
                                        if (response) {
                                            console.log('Email Sent Successfully.-->' + response);
                                        }
                                    });
                                }

                            }
                        });

                    }
                });
                
                res.status(200).json(allList);
            } else {
                res.status(500).end('Internal Server Error');
            }
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

function arrayToString(arr) {
    let str = '';
    arr.forEach(function (i, index) {
        str += i;
        if (index != (arr.length - 1)) {
            str += ',';
        };
    });
    return str;
}


function table(data, columns, display) {
    return {
        table: {
            headerRows: 1,
            body: buildTableBody(data, columns, display)
        }
    };
}

function buildTableBody(data, columns, display) {
    var body = [];

    body.push(display);

    data.forEach(function (row) {
        var dataRow = [];

        columns.forEach(function (column) {
            dataRow.push(row[column]);
        })

        body.push(dataRow);
    });

    return body;
}



function getAllUserList(req, res, next) {
    try {
        const context = {};
        registerRepo.getuserList(context, async function (err, data) {
            if (!err) {
                let userList = [];
                if (data.length > 0) {
                    userList = data
                }
                res.status(200).json(userList);
            } else {
                res.status(500).end('Internal Server Error');
            }
        });
    } catch (err) {
        next(err);
    }
}


function getInsertMomDetailsv2(req, res, next) {
    try {

        var post = req.body;
        console.log(post);

        var comments_val = JSON.parse(req.body.COMMENTS);

        var next_of_meeting = '';
        var meeting_date = '';
        var parent_mom_id = '';
        var organizer_id = '';
        var recurring_meeting = 0;
        var frequency = '';
        var upto_date = '';
        var next_recurring_date = '';

        if (post.next_of_meeting != "" && post.next_of_meeting != null) {
            next_of_meeting = moment(post.next_of_meeting).format("DD-MMM-YYYY");
        } else {
            next_of_meeting = "";
        }

        if (post.date_of_meeting != "" && post.date_of_meeting != null) {
            meeting_date = moment(post.date_of_meeting).format("DD-MMM-YYYY");
        } else {
            meeting_date = moment().format("DD-MMM-YYYY");
        }

        if (post.parent_mom_id != "" && post.parent_mom_id != null) {
            parent_mom_id = parseInt(post.parent_mom_id);
        } else {
            parent_mom_id = '';
            
        }

        if (post.organizer_selected != "" && post.organizer_selected != null) {
            organizer_id = parseInt(post.organizer_selected);
        } else {
            organizer_id = '';
        }

        if(post.recurring_meeting){

            recurring_meeting = 1;
            frequency = post.frequency;
            upto_date = moment(post.upto_date).format("DD-MMM-YYYY");

            if(post.frequency == 'weekly'){
                next_recurring_date = moment().add(7, 'days').format("DD-MMM-YYYY");
            }else if(post.frequency == 'monthly'){
                next_recurring_date = moment().add(30, 'days').format("DD-MMM-YYYY");
            }else if(post.frequency == 'fortnightly'){
                next_recurring_date = moment().add(15, 'days').format("DD-MMM-YYYY");
            }
            
        }else{
            recurring_meeting = 0;
            frequency         = "";
            upto_date         = "";
            next_recurring_date = "";
        };
 
        const context             = {};
        context.title             = post.title;
        context.created_on        = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.created_by        = parseInt(req.body.created_by);
        context.modified_by       = parseInt(req.body.created_by);
        context.modified_on       = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.meeting_date      = meeting_date;
        context.next_meeting_date = next_of_meeting;
        context.COMMENTS_arr      = comments_val;
        context.parent_mom_id     = parent_mom_id;
        context.organizer_id      = organizer_id;
        context.recurring_meeting = recurring_meeting;
        context.frequency         = frequency;
        context.upto_date         = upto_date
        context.next_recurring_date = next_recurring_date;

        registerRepo.getMomInsertv2(context, async function (err, data) {
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


function getInsertMomAttendees(req, res, next) {
    try {

        var post = req.body;
        console.log(post);

        const context = {};
        context.mom_id = parseInt(post.mom_id);
        context.user_info_id = parseInt(post.user_info_id);
        context.created_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.created_by = parseInt(req.body.created_by);
        context.modified_by = parseInt(req.body.created_by);
        context.modified_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");

        registerRepo.getMomAttendeesInsert(context, async function (err, data) {
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



function getUpdateInsertMomActionPointv1(req, res, next) {
    try {
        var completed_date = '';
        if(req.body.action_complete_date != "" && req.body.action_complete_date != null){
            completed_date = moment(req.body.action_complete_date).format("DD-MMM-YYYY");
        }else{
            completed_date = moment().format("DD-MMM-YYYY");
        }
        
        const context          = {};
        context.MOM_ID         = parseInt(req.body.mom_id);
        context.action_point   = req.body.action_point;
        context.action_complete_date = completed_date;
        context.created_by     = parseInt(req.body.user_info_id);
        context.created_on     = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.modified_by    = parseInt(req.body.user_info_id);
        context.modified_on    = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.action_by_id   = req.body.action_by_id;
        context.action_by_name = req.body.action_by_name;
        context.emailto        = req.body.emailto

        registerRepo.getInsertNewActionPointsv1(context, async function (err, data) {
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


function getUpdateMomActionPointv1(req, res, next) {
    try {
        const context = {};
        context.action_point_id = parseInt(req.body.action_point_id);
        context.modified_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.completed_date = moment(req.body.action_completed_date).format("DD-MMM-YYYY");
        context.action_by = req.body.action_by_id;
        context.action_point = req.body.action_point;
        context.modified_by = parseInt(req.body.user_info_id);
        context.action_by_name = req.body.action_by_name;
        context.emailto  = req.body.emailto;

        registerRepo.getUpdateMomActionPointDetailsv1(context, async function (err, data) {
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


// Download Pdf All
function getMomPdfActionPointListAll(req, res, next) {
    try {

        var fonts = {
            Roboto: {
                normal: path.join(basedir_filepath , '/fonts/Roboto-Regular.ttf'),
                bold: path.join(basedir_filepath + '/fonts/Roboto-Medium.ttf'),
                italics: path.join(basedir_filepath + '/fonts/Roboto-Italic.ttf'),
                bolditalics: path.join(basedir_filepath + '/fonts/Roboto-MediumItalic.ttf')
            }
        };

        console.log(fonts);
              
        var attendees_array = [];
        //var mydate = new Date(req.body.meeting_date);
        var mom_meeting_date = req.body.meeting_date;
        var meetingDate = moment(mom_meeting_date).format("DD-MM-YYYY");

        const context1 = {};
        context1.user_info_id = parseInt(req.body.user_info_id);
        context1.mom_id = parseInt(req.body.mom_id);
        context1.status = 0;

        registerRepo.getMomSubMeetingPdfListAll(context1, async function (err, data1) {
            if (!err) {
                let allList1 = {};
                    allList1 = data1;

                const context2 = {};
                context2.user_info_id = parseInt(req.body.user_info_id);
                context2.status = 2;
                context2.mom_id = parseInt(req.body.mom_id);             

                registerRepo.getMomPdfSubActionPoint(context2, async function (err, data2) {
                    if (!err) {
                                
                        let attendees = '';
                        let allList2 = {};

                        allList2 = data2;
                        var content = [];

                        var heading = {
                            text: 'Minutes of the Meeting',
                            style: 'header',
                            decoration: 'underline'
                        };

                        for (let j = 0; j < allList1.length; j++) {

                            var Mom_items = allList2.filter(x => x.MOM_ID == req.body.mom_id);
                            var Mom_items_filter = allList2.filter(x => x.MOM_ID == req.body.mom_id && x.ID == allList1[j].ID && x.ACTION_POINTS != null);

                            let length = 1;

                            for (let i = 0; i < Mom_items.length; i++) {

                                let completed_date = '';

                                if (Mom_items[i].COMPLETED_DATE != null) {
                                    completed_date = moment(Mom_items[i].COMPLETED_DATE).format("DD-MM-YYYY")
                                } else {
                                    completed_date = '';
                                }

                                Mom_items[i].COMPLETED_DATE = completed_date;
                                      
                                if(Mom_items[i].ACTION_BY_NAME != "" && Mom_items[i].ACTION_BY_NAME != null){

                                    var action_by_name_array = Mom_items[i].ACTION_BY_NAME.split(',');
                                    for (let j = 0; j < action_by_name_array.length; j++) {
                                        if (attendees_array.indexOf(action_by_name_array[j]) === -1) {
                                            attendees_array.push(action_by_name_array[j]);
                                        }
                                    }
                                }
                                        
                                if(Mom_items[i].TO_EMAIL != "" && Mom_items[i].TO_EMAIL != null){
                                    var email_to_array       = Mom_items[i].TO_EMAIL.split(',');
                                    for (let k = 0; k < email_to_array.length; k++) {
                                        if (attendees_array.indexOf(email_to_array[k]) === -1) {
                                            attendees_array.push(email_to_array[k]);
                                        }
                                    }
                                }
                                                                                
                                if (Mom_items.length == length) {
                                    let flag = attendees_array.includes(req.body.login_user_name);
                                    if (!flag) {
                                        attendees_array.push(req.body.login_user_name);
                                    }
                                    let flag_org = attendees_array.includes(allList1[j].ORGANIZER_NAME);

                                    if (!flag_org) {
                                        attendees_array.push(allList1[j].ORGANIZER_NAME);
                                    }
                                    attendees = arrayToString(attendees_array);
                                }

                                length++;

                                console.log(attendees);

                            }

                            let meeting_date = moment(allList1[j].MEETING_DATE).format("DD-MM-YYYY");
                            let created_on = moment(allList1[j].CREATED_ON).format("DD-MM-YYYY hh:mm A")

                            if (allList1[j].NEXT_MEETING_DATE != '' && allList1[j].NEXT_MEETING_DATE != null) {
                                next_meeting_date = moment(allList1[j].NEXT_MEETING_DATE).format("DD-MM-YYYY")
                            } else {
                                next_meeting_date = '-';
                            }

                            let title = allList1[j].TITLE;

                            var empty_line = {
                                        text: '                                                           '
                                    };
                            var Organizer = {
                                        text: 'Organizer: ' + allList1[j].ORGANIZER_NAME,
                                        bold: true
                                    };
                            var PreparedBy = {
                                        text: 'Prepared By: ' + allList1[j].USER_SURNAME,
                                        bold: true
                                    };
                            var Create_on = {
                                        text: 'Created On: ' + created_on,
                                        bold: true
                                    };
                                    var content_obj = {
                                        style: 'tableExample',
                                        table: {
                                            widths: [125, 350],
                                            heights: ['auto', 'auto', 'auto', 'auto'],
                                            body: [
                                                [{
                                                    text: 'Date of Meeting',
                                                    bold: true
                                                }, {
                                                    text: meeting_date,
                                                    bold: true
                                                }],
                                                [{
                                                    text: 'Purpose',
                                                    bold: true
                                                }, {
                                                    text: title,
                                                    bold: true
                                                }],
                                                [{
                                                    text: 'Attendees',
                                                    bold: true
                                                }, {
                                                    text: attendees,
                                                    bold: true
                                                }],
                                                [{
                                                    text: 'Next Meeting',
                                                    bold: true
                                                }, {
                                                    text: next_meeting_date,
                                                    bold: true
                                                }]
                                            ]
                                        }
                                    }

                                    content.push(heading);
                                    content.push(empty_line);
                                    content.push(empty_line);
                                    content.push(content_obj);
                                    content.push(empty_line);
                                    content.push(Organizer);
                                    content.push(PreparedBy);
                                    content.push(Create_on);
                                    content.push(empty_line);
                                    content.push(empty_line);
                                    content.push('                                       ');
                                    content.push(table(Mom_items_filter, ['ROW_NUMBER', 'ACTION_POINTS', 'ACTION_BY_NAME', 'COMPLETED_DATE'], ['S.No', 'Action Points', 'Action By', 'When']));

                                }

                                var docDefinition = {
                                    content: content,
                                    styles: {
                                        header: {
                                            fontSize: 18,
                                            bold: true,
                                            alignment: 'center'
                                        },
                                        tableHeader: {
                                            bold: true,
                                            fontSize: 13,
                                            color: 'black'
                                        },
                                        subheader: {
                                            fontSize: 14,
                                            bold: true,
                                            margin: [0, 15, 0, 0]
                                        },
                                        story: {
                                            italic: true,
                                            alignment: 'center',
                                            width: '50%',
                                        },
                                        itemsTableHeader: {
                                            bold: true,
                                            fontSize: 13,
                                            color: 'black'
                                        },
                                        tableExample: {
                                            margin: [0, 5, 0, 15]
                                        }
                                    }
                                };

                                var options = {}

                                console.log(basedir_filepath);

                                

                                var printer = new PdfPrinter(fonts);

                                var dir = basedir_filepath + '/mom/';
                                console.log(dir);
                                
                                console.log(docDefinition);
                                var pdfDoc = printer.createPdfKitDocument(docDefinition,options);
                                pdfDoc.pipe(fs.createWriteStream(dir + 'mom_' + meetingDate + '.pdf'));
                                pdfDoc.end(); 
                           
                                var ret = {
                                    file_path: dir + 'mom_' + meetingDate + '.pdf',
                                    file_name: 'mom_' + meetingDate + '.pdf'
                                }

                                res.status(200).json(ret);                               
                                
                            }else{
                                res.status(500).end('Internal Server Error');
                            }                            

                        });

                    }else {
                        res.status(500).end('Internal Server Error');
                    }


                });
              
    } catch (err) {
        console.log(err);
        next(err);
    }
}


function getDownloadPdf(req, res, next){

    
    var dir = basedir_filepath + '/mom/';
    var mom_meeting_date = req.query.meeting_date;
    var meetingDate = moment(mom_meeting_date).format("DD-MM-YYYY");

    var file_name =  'mom_' + meetingDate + '.pdf';
    var file_path =  dir+file_name;
    
    console.log(file_path);
    console.log('File download..');

    res.download(file_path,file_name, function(err){
        if (err){
            console.log(err);
        } else {
            console.log('downloading successful');
        }
    });      

}


// Download Pdf All
function getMomPdfDownload(req, res, next) {
    try {

        var fonts = {
            Roboto: {
                normal: path.join(basedir_filepath , '/fonts/Roboto-Regular.ttf'),
                bold: path.join(basedir_filepath + '/fonts/Roboto-Medium.ttf'),
                italics: path.join(basedir_filepath + '/fonts/Roboto-Italic.ttf'),
                bolditalics: path.join(basedir_filepath + '/fonts/Roboto-MediumItalic.ttf')
            }
        };

        console.log(fonts);
              
        var attendees_array = [];
        //var mydate = new Date(req.body.meeting_date);
        var mom_meeting_date = req.body.meeting_date;
        var meetingDate = moment(mom_meeting_date).format("DD-MM-YYYY");

        const context1 = {};
        context1.user_info_id = parseInt(req.body.user_info_id);
        context1.mom_id = parseInt(req.body.mom_id);
        context1.status = 0;

        registerRepo.getMomHeaderPdfDownload(context1, async function (err, data1) {
            if (!err) {
                let allList1 = {};
                    allList1 = data1;

                const context2 = {};
                context2.user_info_id = parseInt(req.body.user_info_id);
                context2.status = 2;
                context2.mom_id = parseInt(req.body.mom_id);             

                registerRepo.getMomHeaderPdfActionPoint(context2, async function (err, data2) {
                    if (!err) {
                                
                        let attendees = '';
                        let allList2 = {};

                        allList2 = data2;
                        var content = [];

                        var heading = {
                            text: 'Minutes of the Meeting',
                            style: 'header',
                            decoration: 'underline'
                        };

                        for (let j = 0; j < allList1.length; j++) {

                            var Mom_items = allList2.filter(x => x.MOM_ID == req.body.mom_id);
                            var Mom_items_filter = allList2.filter(x => x.MOM_ID == req.body.mom_id && x.ACTION_POINTS != null);

                            let length = 1;

                            for (let i = 0; i < Mom_items.length; i++) {

                                let completed_date = '';

                                if (Mom_items[i].COMPLETED_DATE != null) {
                                    completed_date = moment(Mom_items[i].COMPLETED_DATE).format("DD-MM-YYYY")
                                } else {
                                    completed_date = '';
                                }

                                Mom_items[i].COMPLETED_DATE = completed_date;
                                      
                                if(Mom_items[i].ACTION_BY_NAME != "" && Mom_items[i].ACTION_BY_NAME != null){

                                    var action_by_name_array = Mom_items[i].ACTION_BY_NAME.split(',');
                                    for (let j = 0; j < action_by_name_array.length; j++) {
                                        if (attendees_array.indexOf(action_by_name_array[j]) === -1) {
                                            attendees_array.push(action_by_name_array[j]);
                                        }
                                    }
                                }
                                        
                                if(Mom_items[i].TO_EMAIL != "" && Mom_items[i].TO_EMAIL != null){
                                    var email_to_array       = Mom_items[i].TO_EMAIL.split(',');
                                    for (let k = 0; k < email_to_array.length; k++) {
                                        if (attendees_array.indexOf(email_to_array[k]) === -1) {
                                            attendees_array.push(email_to_array[k]);
                                        }
                                    }
                                }
                                                                                
                                if (Mom_items.length == length) {
                                    let flag = attendees_array.includes(req.body.login_user_name);
                                    if (!flag) {
                                        attendees_array.push(req.body.login_user_name);
                                    }
                                    let flag_org = attendees_array.includes(allList1[j].ORGANIZER_NAME);

                                    if (!flag_org) {
                                        attendees_array.push(allList1[j].ORGANIZER_NAME);
                                    }
                                    attendees = arrayToString(attendees_array);
                                }

                                length++;

                                console.log(attendees);

                            }

                            let meeting_date = moment(allList1[j].MEETING_DATE).format("DD-MM-YYYY");
                            let created_on = moment(allList1[j].CREATED_ON).format("DD-MM-YYYY hh:mm A")

                            if (allList1[j].NEXT_MEETING_DATE != '' && allList1[j].NEXT_MEETING_DATE != null) {
                                next_meeting_date = moment(allList1[j].NEXT_MEETING_DATE).format("DD-MM-YYYY")
                            } else {
                                next_meeting_date = '-';
                            }

                            let title = allList1[j].TITLE;

                            var empty_line = {
                                        text: '                                                           '
                                    };
                            var Organizer = {
                                        text: 'Organizer: ' + allList1[j].ORGANIZER_NAME,
                                        bold: true
                                    };
                            var PreparedBy = {
                                        text: 'Prepared By: ' + allList1[j].USER_SURNAME,
                                        bold: true
                                    };
                            var Create_on = {
                                        text: 'Created On: ' + created_on,
                                        bold: true
                                    };
                                    var content_obj = {
                                        style: 'tableExample',
                                        table: {
                                            widths: [125, 350],
                                            heights: ['auto', 'auto', 'auto', 'auto'],
                                            body: [
                                                [{
                                                    text: 'Date of Meeting',
                                                    bold: true
                                                }, {
                                                    text: meeting_date,
                                                    bold: true
                                                }],
                                                [{
                                                    text: 'Purpose',
                                                    bold: true
                                                }, {
                                                    text: title,
                                                    bold: true
                                                }],
                                                [{
                                                    text: 'Attendees',
                                                    bold: true
                                                }, {
                                                    text: attendees,
                                                    bold: true
                                                }],
                                                [{
                                                    text: 'Next Meeting',
                                                    bold: true
                                                }, {
                                                    text: next_meeting_date,
                                                    bold: true
                                                }]
                                            ]
                                        }
                                    }

                                    content.push(heading);
                                    content.push(empty_line);
                                    content.push(empty_line);
                                    content.push(content_obj);
                                    content.push(empty_line);
                                    content.push(Organizer);
                                    content.push(PreparedBy);
                                    content.push(Create_on);
                                    content.push(empty_line);
                                    content.push(empty_line);
                                    content.push('                                       ');
                                    content.push(table(Mom_items_filter, ['ROW_NUMBER', 'ACTION_POINTS', 'ACTION_BY_NAME', 'COMPLETED_DATE'], ['S.No', 'Action Points', 'Action By', 'When']));

                                }

                                var docDefinition = {
                                    content: content,
                                    styles: {
                                        header: {
                                            fontSize: 18,
                                            bold: true,
                                            alignment: 'center'
                                        },
                                        tableHeader: {
                                            bold: true,
                                            fontSize: 13,
                                            color: 'black'
                                        },
                                        subheader: {
                                            fontSize: 14,
                                            bold: true,
                                            margin: [0, 15, 0, 0]
                                        },
                                        story: {
                                            italic: true,
                                            alignment: 'center',
                                            width: '50%',
                                        },
                                        itemsTableHeader: {
                                            bold: true,
                                            fontSize: 13,
                                            color: 'black'
                                        },
                                        tableExample: {
                                            margin: [0, 5, 0, 15]
                                        }
                                    }
                                };

                                var options = {}

                                console.log(basedir_filepath);

                                

                                var printer = new PdfPrinter(fonts);

                                var dir = basedir_filepath + '/mom/';
                                console.log(dir);
                                
                                console.log(docDefinition);
                                var pdfDoc = printer.createPdfKitDocument(docDefinition,options);
                                pdfDoc.pipe(fs.createWriteStream(dir + 'mom_' + meetingDate + '.pdf'));
                                pdfDoc.end(); 
                           
                                var ret = {
                                    file_path: dir + 'mom_' + meetingDate + '.pdf',
                                    file_name: 'mom_' + meetingDate + '.pdf'
                                }

                                res.status(200).json(ret);                               
                                
                            }else{
                                res.status(500).end('Internal Server Error');
                            }                            

                        });

                    }else {
                        res.status(500).end('Internal Server Error');
                    }


                });
              
    } catch (err) {
        console.log(err);
        next(err);
    }
}

function getArchiveMom(req, res, next) {
    try {
        const context = {};
        context.mom_id = parseInt(req.body.mom_id);
        context.modified_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.modified_by = parseInt(req.body.user_info_id);

        registerRepo.getArchiveMomDetails(context, async function (err, data) {
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




// Download Pdf All
function getArchiveMomPdfDownload(req, res, next) {
    try {

        var fonts = {
            Roboto: {
                normal: path.join(basedir_filepath , '/fonts/Roboto-Regular.ttf'),
                bold: path.join(basedir_filepath + '/fonts/Roboto-Medium.ttf'),
                italics: path.join(basedir_filepath + '/fonts/Roboto-Italic.ttf'),
                bolditalics: path.join(basedir_filepath + '/fonts/Roboto-MediumItalic.ttf')
            }
        };

        console.log(fonts);
              
        var attendees_array = [];
        //var mydate = new Date(req.body.meeting_date);
        var mom_meeting_date = req.body.meeting_date;
        var meetingDate = moment(mom_meeting_date).format("DD-MM-YYYY");

        const context1 = {};
        context1.user_info_id = parseInt(req.body.user_info_id);
        context1.mom_id = parseInt(req.body.mom_id);
        context1.status = 0;

        registerRepo.getArchiveMomHeaderPdfDownload(context1, async function (err, data1) {
            if (!err) {
                let allList1 = {};
                    allList1 = data1;

                const context2 = {};
                context2.user_info_id = parseInt(req.body.user_info_id);
                context2.status = 2;
                context2.mom_id = parseInt(req.body.mom_id);             

                registerRepo.getArchiveMomHeaderPdfActionPoint(context2, async function (err, data2) {
                    if (!err) {
                                
                        let attendees = '';
                        let allList2 = {};

                        allList2 = data2;
                        var content = [];

                        var heading = {
                            text: 'Minutes of the Meeting',
                            style: 'header',
                            decoration: 'underline'
                        };

                        for (let j = 0; j < allList1.length; j++) {

                            var Mom_items = allList2.filter(x => x.MOM_ID == req.body.mom_id);
                            var Mom_items_filter = allList2.filter(x => x.MOM_ID == req.body.mom_id && x.ACTION_POINTS != null);

                            let length = 1;

                            for (let i = 0; i < Mom_items.length; i++) {

                                let completed_date = '';

                                if (Mom_items[i].COMPLETED_DATE != null) {
                                    completed_date = moment(Mom_items[i].COMPLETED_DATE).format("DD-MM-YYYY")
                                } else {
                                    completed_date = '';
                                }

                                Mom_items[i].COMPLETED_DATE = completed_date;
                                      
                                if(Mom_items[i].ACTION_BY_NAME != "" && Mom_items[i].ACTION_BY_NAME != null){

                                    var action_by_name_array = Mom_items[i].ACTION_BY_NAME.split(',');
                                    for (let j = 0; j < action_by_name_array.length; j++) {
                                        if (attendees_array.indexOf(action_by_name_array[j]) === -1) {
                                            attendees_array.push(action_by_name_array[j]);
                                        }
                                    }
                                }
                                        
                                if(Mom_items[i].TO_EMAIL != "" && Mom_items[i].TO_EMAIL != null){
                                    var email_to_array       = Mom_items[i].TO_EMAIL.split(',');
                                    for (let k = 0; k < email_to_array.length; k++) {
                                        if (attendees_array.indexOf(email_to_array[k]) === -1) {
                                            attendees_array.push(email_to_array[k]);
                                        }
                                    }
                                }
                                                                                
                                if (Mom_items.length == length) {
                                    let flag = attendees_array.includes(req.body.login_user_name);
                                    if (!flag) {
                                        attendees_array.push(req.body.login_user_name);
                                    }
                                    let flag_org = attendees_array.includes(allList1[j].ORGANIZER_NAME);

                                    if (!flag_org) {
                                        attendees_array.push(allList1[j].ORGANIZER_NAME);
                                    }
                                    attendees = arrayToString(attendees_array);
                                }

                                length++;

                                console.log(attendees);

                            }

                            let meeting_date = moment(allList1[j].MEETING_DATE).format("DD-MM-YYYY");
                            let created_on = moment(allList1[j].CREATED_ON).format("DD-MM-YYYY hh:mm A")

                            if (allList1[j].NEXT_MEETING_DATE != '' && allList1[j].NEXT_MEETING_DATE != null) {
                                next_meeting_date = moment(allList1[j].NEXT_MEETING_DATE).format("DD-MM-YYYY")
                            } else {
                                next_meeting_date = '-';
                            }

                            let title = allList1[j].TITLE;

                            var empty_line = {
                                        text: '                                                           '
                                    };
                            var Organizer = {
                                        text: 'Organizer: ' + allList1[j].ORGANIZER_NAME,
                                        bold: true
                                    };
                            var PreparedBy = {
                                        text: 'Prepared By: ' + allList1[j].USER_SURNAME,
                                        bold: true
                                    };
                            var Create_on = {
                                        text: 'Created On: ' + created_on,
                                        bold: true
                                    };
                                    var content_obj = {
                                        style: 'tableExample',
                                        table: {
                                            widths: [125, 350],
                                            heights: ['auto', 'auto', 'auto', 'auto'],
                                            body: [
                                                [{
                                                    text: 'Date of Meeting',
                                                    bold: true
                                                }, {
                                                    text: meeting_date,
                                                    bold: true
                                                }],
                                                [{
                                                    text: 'Purpose',
                                                    bold: true
                                                }, {
                                                    text: title,
                                                    bold: true
                                                }],
                                                [{
                                                    text: 'Attendees',
                                                    bold: true
                                                }, {
                                                    text: attendees,
                                                    bold: true
                                                }],
                                                [{
                                                    text: 'Next Meeting',
                                                    bold: true
                                                }, {
                                                    text: next_meeting_date,
                                                    bold: true
                                                }]
                                            ]
                                        }
                                    }

                                    content.push(heading);
                                    content.push(empty_line);
                                    content.push(empty_line);
                                    content.push(content_obj);
                                    content.push(empty_line);
                                    content.push(Organizer);
                                    content.push(PreparedBy);
                                    content.push(Create_on);
                                    content.push(empty_line);
                                    content.push(empty_line);
                                    content.push('                                       ');
                                    content.push(table(Mom_items_filter, ['ROW_NUMBER', 'ACTION_POINTS', 'ACTION_BY_NAME', 'COMPLETED_DATE'], ['S.No', 'Action Points', 'Action By', 'When']));

                                }

                                var docDefinition = {
                                    content: content,
                                    styles: {
                                        header: {
                                            fontSize: 18,
                                            bold: true,
                                            alignment: 'center'
                                        },
                                        tableHeader: {
                                            bold: true,
                                            fontSize: 13,
                                            color: 'black'
                                        },
                                        subheader: {
                                            fontSize: 14,
                                            bold: true,
                                            margin: [0, 15, 0, 0]
                                        },
                                        story: {
                                            italic: true,
                                            alignment: 'center',
                                            width: '50%',
                                        },
                                        itemsTableHeader: {
                                            bold: true,
                                            fontSize: 13,
                                            color: 'black'
                                        },
                                        tableExample: {
                                            margin: [0, 5, 0, 15]
                                        }
                                    }
                                };

                                var options = {}

                                console.log(basedir_filepath);

                                

                                var printer = new PdfPrinter(fonts);

                                var dir = basedir_filepath + '/mom/';
                                console.log(dir);
                                
                                console.log(docDefinition);
                                var pdfDoc = printer.createPdfKitDocument(docDefinition,options);
                                pdfDoc.pipe(fs.createWriteStream(dir + 'mom_' + meetingDate + '.pdf'));
                                pdfDoc.end(); 
                           
                                var ret = {
                                    file_path: dir + 'mom_' + meetingDate + '.pdf',
                                    file_name: 'mom_' + meetingDate + '.pdf'
                                }

                                res.status(200).json(ret);                               
                                
                            }else{
                                res.status(500).end('Internal Server Error');
                            }                            

                        });

                    }else {
                        res.status(500).end('Internal Server Error');
                    }


                });
              
    } catch (err) {
        console.log(err);
        next(err);
    }
}



// Download Pdf All
function getArchiveMomPdfActionPointListAll(req, res, next) {
    try {

        var fonts = {
            Roboto: {
                normal: path.join(basedir_filepath , '/fonts/Roboto-Regular.ttf'),
                bold: path.join(basedir_filepath + '/fonts/Roboto-Medium.ttf'),
                italics: path.join(basedir_filepath + '/fonts/Roboto-Italic.ttf'),
                bolditalics: path.join(basedir_filepath + '/fonts/Roboto-MediumItalic.ttf')
            }
        };

        console.log(fonts);
              
        var attendees_array = [];
        //var mydate = new Date(req.body.meeting_date);
        var mom_meeting_date = req.body.meeting_date;
        var meetingDate = moment(mom_meeting_date).format("DD-MM-YYYY");

        const context1 = {};
        context1.user_info_id = parseInt(req.body.user_info_id);
        context1.mom_id = parseInt(req.body.mom_id);
        context1.status = 0;

        registerRepo.geArchivetMomPdfListAll(context1, async function (err, data1) {
            if (!err) {
                let allList1 = {};
                    allList1 = data1;

                const context2 = {};
                context2.user_info_id = parseInt(req.body.user_info_id);
                context2.status = 2;
                context2.mom_id = parseInt(req.body.mom_id);             

                registerRepo.getArchiveMomPdfSubActionPoint(context2, async function (err, data2) {
                    if (!err) {
                                
                        let attendees = '';
                        let allList2 = {};

                        allList2 = data2;
                        var content = [];

                        var heading = {
                            text: 'Minutes of the Meeting',
                            style: 'header',
                            decoration: 'underline'
                        };

                        for (let j = 0; j < allList1.length; j++) {

                            var Mom_items = allList2.filter(x => x.MOM_ID == req.body.mom_id);
                            var Mom_items_filter = allList2.filter(x => x.MOM_ID == req.body.mom_id && x.ID == allList1[j].ID && x.ACTION_POINTS != null);

                            let length = 1;

                            for (let i = 0; i < Mom_items.length; i++) {

                                let completed_date = '';

                                if (Mom_items[i].COMPLETED_DATE != null) {
                                    completed_date = moment(Mom_items[i].COMPLETED_DATE).format("DD-MM-YYYY")
                                } else {
                                    completed_date = '';
                                }

                                Mom_items[i].COMPLETED_DATE = completed_date;
                                      
                                if(Mom_items[i].ACTION_BY_NAME != "" && Mom_items[i].ACTION_BY_NAME != null){

                                    var action_by_name_array = Mom_items[i].ACTION_BY_NAME.split(',');
                                    for (let j = 0; j < action_by_name_array.length; j++) {
                                        if (attendees_array.indexOf(action_by_name_array[j]) === -1) {
                                            attendees_array.push(action_by_name_array[j]);
                                        }
                                    }
                                }
                                        
                                if(Mom_items[i].TO_EMAIL != "" && Mom_items[i].TO_EMAIL != null){
                                    var email_to_array       = Mom_items[i].TO_EMAIL.split(',');
                                    for (let k = 0; k < email_to_array.length; k++) {
                                        if (attendees_array.indexOf(email_to_array[k]) === -1) {
                                            attendees_array.push(email_to_array[k]);
                                        }
                                    }
                                }
                                                                                
                                if (Mom_items.length == length) {
                                    let flag = attendees_array.includes(req.body.login_user_name);
                                    if (!flag) {
                                        attendees_array.push(req.body.login_user_name);
                                    }
                                    let flag_org = attendees_array.includes(allList1[j].ORGANIZER_NAME);

                                    if (!flag_org) {
                                        attendees_array.push(allList1[j].ORGANIZER_NAME);
                                    }
                                    attendees = arrayToString(attendees_array);
                                }

                                length++;

                                console.log(attendees);

                            }

                            let meeting_date = moment(allList1[j].MEETING_DATE).format("DD-MM-YYYY");
                            let created_on = moment(allList1[j].CREATED_ON).format("DD-MM-YYYY hh:mm A")

                            if (allList1[j].NEXT_MEETING_DATE != '' && allList1[j].NEXT_MEETING_DATE != null) {
                                next_meeting_date = moment(allList1[j].NEXT_MEETING_DATE).format("DD-MM-YYYY")
                            } else {
                                next_meeting_date = '-';
                            }

                            let title = allList1[j].TITLE;

                            var empty_line = {
                                        text: '                                                           '
                                    };
                            var Organizer = {
                                        text: 'Organizer: ' + allList1[j].ORGANIZER_NAME,
                                        bold: true
                                    };
                            var PreparedBy = {
                                        text: 'Prepared By: ' + allList1[j].USER_SURNAME,
                                        bold: true
                                    };
                            var Create_on = {
                                        text: 'Created On: ' + created_on,
                                        bold: true
                                    };
                                    var content_obj = {
                                        style: 'tableExample',
                                        table: {
                                            widths: [125, 350],
                                            heights: ['auto', 'auto', 'auto', 'auto'],
                                            body: [
                                                [{
                                                    text: 'Date of Meeting',
                                                    bold: true
                                                }, {
                                                    text: meeting_date,
                                                    bold: true
                                                }],
                                                [{
                                                    text: 'Purpose',
                                                    bold: true
                                                }, {
                                                    text: title,
                                                    bold: true
                                                }],
                                                [{
                                                    text: 'Attendees',
                                                    bold: true
                                                }, {
                                                    text: attendees,
                                                    bold: true
                                                }],
                                                [{
                                                    text: 'Next Meeting',
                                                    bold: true
                                                }, {
                                                    text: next_meeting_date,
                                                    bold: true
                                                }]
                                            ]
                                        }
                                    }

                                    content.push(heading);
                                    content.push(empty_line);
                                    content.push(empty_line);
                                    content.push(content_obj);
                                    content.push(empty_line);
                                    content.push(Organizer);
                                    content.push(PreparedBy);
                                    content.push(Create_on);
                                    content.push(empty_line);
                                    content.push(empty_line);
                                    content.push('                                       ');
                                    content.push(table(Mom_items_filter, ['ROW_NUMBER', 'ACTION_POINTS', 'ACTION_BY_NAME', 'COMPLETED_DATE'], ['S.No', 'Action Points', 'Action By', 'When']));

                                }

                                var docDefinition = {
                                    content: content,
                                    styles: {
                                        header: {
                                            fontSize: 18,
                                            bold: true,
                                            alignment: 'center'
                                        },
                                        tableHeader: {
                                            bold: true,
                                            fontSize: 13,
                                            color: 'black'
                                        },
                                        subheader: {
                                            fontSize: 14,
                                            bold: true,
                                            margin: [0, 15, 0, 0]
                                        },
                                        story: {
                                            italic: true,
                                            alignment: 'center',
                                            width: '50%',
                                        },
                                        itemsTableHeader: {
                                            bold: true,
                                            fontSize: 13,
                                            color: 'black'
                                        },
                                        tableExample: {
                                            margin: [0, 5, 0, 15]
                                        }
                                    }
                                };

                                var options = {}

                                console.log(basedir_filepath);

                                

                                var printer = new PdfPrinter(fonts);

                                var dir = basedir_filepath + '/mom/';
                                console.log(dir);
                                
                                console.log(docDefinition);
                                var pdfDoc = printer.createPdfKitDocument(docDefinition,options);
                                pdfDoc.pipe(fs.createWriteStream(dir + 'mom_' + meetingDate + '.pdf'));
                                pdfDoc.end(); 
                           
                                var ret = {
                                    file_path: dir + 'mom_' + meetingDate + '.pdf',
                                    file_name: 'mom_' + meetingDate + '.pdf'
                                }

                                res.status(200).json(ret);                               
                                
                            }else{
                                res.status(500).end('Internal Server Error');
                            }                            

                        });

                    }else {
                        res.status(500).end('Internal Server Error');
                    }


                });
              
    } catch (err) {
        console.log(err);
        next(err);
    }
}

function getundoArchiveMom(req, res, next) {
    try {
        const context = {};
        context.mom_id = parseInt(req.body.mom_id);
        context.modified_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
        context.modified_by = parseInt(req.body.user_info_id);

        registerRepo.getUndoArchiveMomDetails(context, async function (err, data) {
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


function getInsertObjectiveFromMom(req, res, next) {
    try {
        var comments_text = '';
        var comments_val = JSON.parse(req.body.COMMENTS);
        comments_val = comments_val.filter((x) => x.NAME != '' && x.NAME != 'null' && x.NAME != null);

        for (var i = 0; i < comments_val.length; i++) {
            if (comments_val[i].NAME != '') {
                comments_text += '<p>' + comments_val[i].NAME + '</P>';
            }
        }

        if (comments_val.length > 0) {

            const context = {};

            if (req.body.insert_type == "Current") {
                context.created_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
                context.created_by = parseInt(req.body.created_by);
                context.modified_by = parseInt(req.body.modified_by);
                context.modified_on = moment().format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
                context.COMMENTS = comments_text;
                context.COMMENTS_arr = comments_val;
                context.login_user_id = req.body.login_user_id;
                context.label_type = req.body.label_type;

            } else if (req.body.insert_type == "Next") {
                context.created_on = moment().add(7, 'days').format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
                context.created_by = parseInt(req.body.created_by);
                context.modified_by = parseInt(req.body.modified_by);
                context.modified_on = moment().add(7, 'days').format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
                context.COMMENTS = comments_text;
                context.COMMENTS_arr = comments_val;
                context.login_user_id = req.body.login_user_id;
                context.label_type = req.body.label_type;

            } else if (req.body.insert_type == "UserObject") {

                context.created_on = moment(req.body.selected_date).format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
                context.created_by = parseInt(req.body.created_by);
                context.modified_by = parseInt(req.body.modified_by);
                context.modified_on = moment(req.body.selected_date).format("DD-MMM-YYYY hh:mm:ss.SSSSSSSSS A");
                context.COMMENTS = comments_text;
                context.COMMENTS_arr = comments_val;
                context.login_user_id = req.body.login_user_id;
                context.label_type = req.body.label_type;

            }

            context.comments_type = req.body.comments_type;
            context.mom_id = parseInt(req.body.mom_id);

            registerRepo.getInsertRoiObjFromMom(context, async function (err, data) {
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

async function pushNotificationChat(req, resp, next) {
    try { 
        const context             = {};
        context.type              = "Not Return";
        context.title             = req.body.title;
        context.message           = req.body.message ? req.body.message : null;
        context.app_platform      = req.body.app_platform;
        context.content           = req.body.content ? req.body.content : null;
        context.user_info_id      = parseInt(req.body.user_info_id) ? parseInt(req.body.user_info_id) : 0;
        context.loggedin_user_id  = parseInt(req.body.loggedin_user_id) ? parseInt(req.body.loggedin_user_id) : 0;
        context.trans_type        = req.body.trans_type ? req.body.trans_type :'CHAT';
        context.group_name        = req.body.group_name ? req.body.group_name : null;
        context.roi_comments_id   = req.body.roi_comments_id ? req.body.roi_comments_id : null;

        var notificationList      = await registerRepo.getChatNotification(context);
 
        resp.status(200).json(notificationList);
    } catch (err) {
        next(err);
    }
}


function getMomSubListById(req, res, next) {
    try {
        const context = {};
        context.user_info_id = parseInt(req.body.user_info_id);
        context.status = parseInt(req.body.status);
        context.mom_id = parseInt(req.body.mom_id);

        registerRepo.getSubMomListAll(context, async function (err, data) {
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


module.exports = {
    getMomListPage,
    getListOfMinutesOfMeeting,
    getConfirmMomListById,
    getArchiveMomListAll,
    getMomActionPointListAll,
    getArchiveMomActionPointList,
    getConfirmMomActionPoint,
    getAllUserList,
    getCreateMom,
    getInsertMomDetailsv2,
    getInsertMomAttendees,
    getUpdateInsertMomActionPointv1,
    getUpdateMomActionPointv1,
    getMomPdfActionPointListAll,
    getDownloadPdf,
    getMomPdfDownload,
    getArchiveMom,
    getArchiveMomPdfDownload,
    getArchiveMomPdfActionPointListAll,
    getundoArchiveMom,
    getInsertObjectiveFromMom,
    pushNotificationChat,
    getMomSubListById
}