const express = require('express');

const moment = require('moment');
const router = express.Router();

const mountLoginRoutes = require('../features/login/routes');
const mountLogoutRoutes = require('../features/logout/routes');
var FeedbackDetails = require("../features/feedback/commands/feedback");
var mom = require("../features/minutesofmeeting/commands/minutesofmeeting");
var package = require("../features/packages/commands/package");
var Users_ROI = require("../features/usersroi/commands/usersroi");


function isAuthenticated(req, res, next) {
  if (req.user && req.isAuthenticated()) {
    return next();
  }else{
    return res.redirect('/login');
  }
}

function isNonCustomerAuthorized(req, res, next) {
  if (req.user.IS_CUSTOMER == 0) {
    return next();
  }else{
    return res.status(401);
  }
}

function isCustomerAuthorized(req, res, next) {
  if (req.user.IS_CUSTOMER == 1) {
    return next();
  }else{
    return res.status(401);
  }
}

/* GET home page. */
router.get('/', isAuthenticated, (req, res) => {

  var startOfWeek     = moment().startOf('week').toDate();
  var endOfWeek       = moment().endOf('week').toDate();

  var next_start_date = moment(endOfWeek).add(1, 'days').format("DD-MMM");
  var next_end_date   = moment(endOfWeek).add(7, 'days').format("DD-MMM");

  var start_date      = moment(startOfWeek).format("DD-MMM");
  var end_date        = moment(endOfWeek).format("DD-MMM");


  res.render('pages/dashboard',{
    data: [__currentWeek = start_date+' - '+end_date,__nextWeek    = next_start_date+' - '+next_end_date],
    moment: moment
  });
});

/* Get Feedback list */
router.get('/currentweekroi', isAuthenticated, (req, res) => {
  FeedbackDetails.listdata(req, res);
});

/* Get Feedback list */
router.get('/nextweekroi', isAuthenticated, (req, res) => {
  FeedbackDetails.getNextWeekRoiData(req, res);
});

/* Getting Current Week Details*/
router.post('/currentweekroidetails', isAuthenticated, (req, res) => {
  FeedbackDetails.dailycommentscount(req, res);
});

/* Revert back to objectives*/
router.post('/getMoveResultToObjective', isAuthenticated, (req, res) => {
  FeedbackDetails.getMoveWeeklyCommentToObjective(req, res);
});

/* Delete Roi commentss*/
router.post('/getdeleteroicomment', isAuthenticated, (req, res) => {
  FeedbackDetails.getWeeklycommentsdelete(req, res);
});

/* Move Roi comments to Result*/
router.post('/getMoveObjectiveToResult', isAuthenticated, (req, res) => {
  FeedbackDetails.getMoveWeeklyCommentToResult(req, res);
});

/* Update Result Roi comments */
router.post('/getupdatecurrentroiresult', isAuthenticated, (req, res) => {
  FeedbackDetails.getUpdateResultRoi(req, res);
});

/* Upload Roi files */
router.post('/getuploadroifiles', isAuthenticated, (req, res) => {
  FeedbackDetails.dailycommentsInsertFile(req, res);
});

/* Get ROI file  */
router.post('/weeklyUploadedFileList', isAuthenticated, (req, res) => {
  FeedbackDetails.weeklyUploadedFileList(req, res);
});

/* Payment Details */
router.get('/weeklyroi/download-file/:id', isAuthenticated, (req, res) => {
  FeedbackDetails.getDownloadRoiFiles(req, res);
});

/* Get ROI InsertComments  */
router.post('/dailycommentsinsert', isAuthenticated, (req, res) => {
  FeedbackDetails.getRoiinsert(req, res);
});

/* Get Minutes of meeting list */
router.get('/minutesofmeetings', isAuthenticated, (req, res) => {
  mom.getMomListPage(req, res);
});

/* Get Minutes of meeting Pending list data*/
router.post('/getListOfMinutesOfMeeting', isAuthenticated, (req, res) => {
  mom.getListOfMinutesOfMeeting(req, res);
});

/* Get Minutes of meeting Pending list data*/
router.post('/getConfirmMomList', isAuthenticated, (req, res) => {
  mom.getConfirmMomListById(req, res);
});

/* Get Minutes of meeting Pending list data*/
router.post('/getArchiveMomList', isAuthenticated, (req, res) => {
  mom.getArchiveMomListAll(req, res);
});

/* Get Minutes of meeting Pending list data*/
router.post('/getMomActionPointList', isAuthenticated, (req, res) => {
  mom.getMomActionPointListAll(req, res);
});


/* Get Archive mom action point list data*/
router.post('/getArchiveMomActionPointList', isAuthenticated, (req, res) => {
  mom.getArchiveMomActionPointList(req, res);
});

/* Get Archive mom action point list data*/
router.post('/getConfirmMomActionPoints', isAuthenticated, (req, res) => {
  mom.getConfirmMomActionPoint(req, res);
});

/* Get Archive mom action point list data*/
router.get('/UserList', isAuthenticated, (req, res) => {
  mom.getAllUserList(req, res);
});

router.get('/getcreatenewmom', isAuthenticated, (req, res) => {
  mom.getCreateMom(req, res);
});

/* Get Minutes of meeting Pending list data*/
router.post('/getInsertMomv2', isAuthenticated, (req, res) => {
  mom.getInsertMomDetailsv2(req, res);
});

router.post('/getInsertMomAttendees', isAuthenticated, (req, res) => {
  mom.getInsertMomAttendees(req, res);
});

router.post('/getUpdateInsertActionPointsv1', isAuthenticated, (req, res) => {
  mom.getUpdateInsertMomActionPointv1(req, res);
});

router.post('/getUpdateMinutesOfMeetingv1', isAuthenticated, (req, res) => {
  mom.getUpdateMomActionPointv1(req, res);
});


router.post('/getMomPdfActionPointList', isAuthenticated, (req, res) => {
  mom.getMomPdfDownload(req, res);
});

router.post('/getAllMomPdfActionPointList', isAuthenticated, (req, res) => {
  mom.getMomPdfActionPointListAll(req, res);
});

router.get('/getPdfDownload', isAuthenticated, (req, res) => {
  mom.getDownloadPdf(req, res);
});


router.post('/getArchiveminutesofmeetings', isAuthenticated, (req, res) => {
  mom.getArchiveMom(req, res);
});

router.post('/getArchiveMomPdfDownload', isAuthenticated, (req, res) => {
  mom.getArchiveMomPdfDownload(req, res);
});

router.post('/getAllArchiveMomPdfActionPointList', isAuthenticated, (req, res) => {
  mom.getArchiveMomPdfActionPointListAll(req, res);
});

router.post('/getUndoArchiveMomList', isAuthenticated, (req, res) => {
  mom.getundoArchiveMom(req, res);
});

router.post('/getInsertRoiObjectivesFromMom', isAuthenticated, (req, res) => {
  mom.getInsertObjectiveFromMom(req, res);
});

router.post('/pushnotificationsinglechat', isAuthenticated, (req, res) => {
  mom.pushNotificationChat(req, res);
});

router.post('/getOpenSubMomInsertPage', isAuthenticated, (req, res) => {
  mom.getCreateMom(req, res);
});

router.post('/getSubMyMeetingsList', isAuthenticated, (req, res) => {
  mom.getMomSubListById(req, res);
});

router.get('/emailroipage/:id', (req, res) => {
  FeedbackDetails.getEmailRoiPage(req, res);
});

router.post('/getInsertEmailRoi', (req, res) => {
  FeedbackDetails.getInserWeeklyResults(req, res);
});

router.post('/getInsertEmailRoiObjective', (req, res) => {
  FeedbackDetails.dailycommentsinsert(req, res);
});

router.get('/userroilistpage/:id/:loginUserid/:name', (req, res) => {
  FeedbackDetails.getUserRoiPage(req, res);
});

router.post('/getUserRoiWeek', (req, res) => {
  FeedbackDetails.getUserRoiWeekList(req, res);
});

router.post('/getUserRoiWeekComments', (req, res) => {
  FeedbackDetails.getWeeklycommentsDetails(req, res);
});

router.get('/lpoemailapproval/:id/:usertype',(req,res) =>{
  FeedbackDetails.getUserLpoApprovalListPage(req, res);
});

router.get('/financepaymentemailapproval/:id/:usertype/:type_id',(req,res) =>{
  FeedbackDetails.getUserFinancePaymentListPage(req, res);
});

router.post('/documenttrackingemailapproval/:id/:type_id/:resource_id',(req,res) =>{
  FeedbackDetails.getUserDocumentTrackingListPage(req, res);
});

router.post('/securitydepositemailapproval/:id',(req,res) =>{
  FeedbackDetails.getUserSecurityListPage(req, res);
});

router.post('/getLpoApprovalList', (req, res) => {
  FeedbackDetails.getLpoApprovalDetails(req, res);
});

router.post('/Approvedatainsert', (req, res) => {
  FeedbackDetails.getLpoApprovalData(req, res);
});

router.post('/Rejectdatainsert', (req, res) => {
  FeedbackDetails.Rejectdatainsert(req, res);
});

router.post('/getDeleteFinancePaymentAttachment', (req, res) => {
  FeedbackDetails.getDeleteCommonAttachmentById(req, res);
});

router.post('/getFinancePaymentAttachment', (req, res) => {
  FeedbackDetails.getFinancePaymentAttachmentList(req, res);
});

router.post('/getFinancePaymentListDetails', (req, res) => {
  FeedbackDetails.getFinancePaymentListDetails(req, res);
});

router.post('/getInsertFinancepaymentcommentsinsert', (req, res) => {
  FeedbackDetails.getInsertFinancePaymentComment(req, res);
});

router.post('/getLpoManagerList', (req, res) => {
  FeedbackDetails.getLpoManagerList(req, res);
});

router.post('/getUpdateFinancePaymentRequestStatus', (req, res) => {
  FeedbackDetails.getFinancePaymentRequestStatusUpdate(req, res);
});


router.get('/getcreatenewpackage', isAuthenticated, (req, res) => {
  package.getCreatePackage(req, res);
});



//Repotee ROI (WEB)
router.get('/users_roi', isAuthenticated, (req, res) => {
  Users_ROI.get_roi_userslist(req, res);
});
router.post('/users_roi_summary', isAuthenticated, (req, res) => {
  Users_ROI.getUserRoiSummary(req, res);
});
router.post('/weeklycmt_userwise', isAuthenticated, (req, res) => {
  Users_ROI.weeklycomments_range(req, res);
});
router.post('/getcmts_userwise', isAuthenticated, (req, res) => {
  Users_ROI.getWeeklycommentsDetails(req, res);
});

router.get('/selectweektype/:user_id', isAuthenticated, (req, res) => {
  Users_ROI.Select_WeekType(req, res);
});

/* Create new Object*/
router.get('/createnewobj/:user_id', isAuthenticated, (req, res) => {
  Users_ROI.CreateNewObject(req, res);
});
/* Get ROI Details*/
router.post('/getroidetails', isAuthenticated, (req, res) => {
  Users_ROI.GetRoiComments(req, res);
});



mountLoginRoutes(router);
mountLogoutRoutes(router, [isAuthenticated]);
module.exports = router;
