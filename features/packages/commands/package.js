const registerRepo = require('../repository');
var moment = require('moment');
const constant = require('../../common/constant');

var sendingEmailConfig = require("../../common/sendingemailConfig");
var PdfPrinter = require('pdfmake');
var fs = require('fs');
var path = require('path');

async function getCreatePackage(req, res) {
    const context = {};   

    registerRepo.getuserList(context, async function (err, data) {
        if (!err) {
            let userList = [];
            if (data.length > 0) {
                userList = data
            }
            res.render('pages/createpackage', {userList, moment: moment});
        } else {
            res.status(500).end('Internal Server Error');
        }
    });
}


module.exports = {    
    getCreatePackage
}