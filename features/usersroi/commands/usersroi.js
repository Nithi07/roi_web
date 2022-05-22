const registerRepo = require('../repository');
var moment = require('moment');


async function get_roi_userslist(req, res) {
    const context = {user_id:req.user.USER_INFO_ID};
    registerRepo.getuserList(context, async function (err, data) {
        if (!err) {
            let userList = [];
            if (data.length > 0) {
                userList = data
            }
            res.render('pages/userlist', {userList, moment: moment});
        } else {
            res.status(500).end('Internal Server Error');
        }
    });
}
async function Select_WeekType(req, res) {
    const userID = req.params.user_id;
    res.render('pages/week_type', {userID});
  //   const context = {user_id:userID};
  //   registerRepo.getuserList(context, async function (err, data) {
  //     if (!err) {
  //         let userList = [];
  //         if (data.length > 0) {
  //             userList = data
  //         }
  //         res.render('pages/week_type', {userID,userList});
  //     } else {
  //         res.status(500).end('Internal Server Error');
  //     }
  // });

}

function weeklycomments_range(req, res, next) {
  try {

      var roi_userid = req.body.roi_userid
      var startOfWeek = req.body.from_date
      var endOfWeek = req.body.to_date
      const context = {};
        context.start_date = moment(startOfWeek).format("DD-MMM-YY");
        context.end_date = moment(endOfWeek).format("DD-MMM-YY");
        context.user_info_id = roi_userid;
        context.type = "ROI"

        registerRepo.getTaskWeeklyComments(context, async function (err, data) {
          if (!err) {
            let userComments = [];
            if (data.length > 0) {
                userComments = data
            }
            // console.log("comments:",data);
            res.render('pages/week_range_comments', {userComments,roi_userid,moment});

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
      var result = {}
      context.start_date = moment(req.body.from_date).format("DD-MMM-YYYY");
      context.end_date = moment(req.body.to_date).format("DD-MMM-YYYY");
      context.user_info_id = req.body.roi_userid ? req.body.roi_userid : null;

      var array = ["R","O","I"]
      var length = 1
      array.forEach(element => {
        context.type = element
        registerRepo.getTaskWeeklyCommentsDetails(context, async function (err, data) {
            if (!err) {
                result[element] = data
                if(length == array.length){
                  // console.log("AllList:",result)
                  res.status(200).json(result);
                }
                length ++
            } else {
                res.status(500).end('Internal Server Error');
            }
        });
    });
  } catch (err) {
      next(err);
  }
}

function CreateNewObject(req, res, next) {
  try {
    var userID = req.params.user_id
    res.render('pages/createnewobject', {userID,moment});
  } catch (err) {
    next(err);
  }
}
function GetRoiComments(req, res, next) {
  try {
    const context = {};
      context.user_info_id = parseInt(req.body.user_id);

    registerRepo.getRoiCommentsv1(context, async function (err, data) {
      if (!err) {
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

module.exports = {
  get_roi_userslist,
  Select_WeekType,
  weeklycomments_range,
  getWeeklycommentsDetails,
  CreateNewObject,
  GetRoiComments
}
