const registerRepo = require('../repository');
var moment = require('moment');
const constant = require('../../common/constant');

var sendingEmailConfig = require("../../common/sendingemailConfig");

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
//const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
var key = "abcdefghijklmnopqrstuvwx";

async function getSendRoiEmailToUser(req, res) {
    const context = {};
    context.returntype = "";
    registerRepo.getEmailRoiUserlist(context, function (err, result) {
        if (!err) {

            if (result.length > 0) {

                result.forEach(data => {
                    //for (let i = 0; i < data.length; i++) {

                    console.log(data.USER_INFO_ID + ' ' + data.USER_SURNAME + ' ' + data.USER_EMAIL);

                    var subject = `UPDATE ROI and Pending LPO/PRF Approvals`;
                    let userInfoId = data.USER_INFO_ID
                    let to_mail = data.USER_EMAIL;
                    let user_name = data.USER_SURNAME;
                    let type_user = data.TYPE_USER;
                    let type_id = data.TYPE_ID;
                    let resource_id = data.RESOURCE_ID;

                    let hw = userInfoId.toString();
                    //let res_hw = resource_id.toString();

                    var encrypt = crypto.createCipheriv('des-ede3', key, "");
                    var theCipher = encrypt.update(hw, 'utf8', 'base64');
                    theCipher += encrypt.final('base64');

                    theCipher = theCipher.toString().replace('/','Por21Ld');
                    console.log(theCipher);

                    // var res_encrypt = crypto.createCipheriv('des-ede3', key, "");
                    // var resCipher = res_encrypt.update(res_hw, 'utf8', 'base64');
                    // resCipher += res_encrypt.final('base64');

                    // resCipher = resCipher.toString().replace('/','Por21Ld');
                    // console.log(resCipher);

                    const context1 = {};
                    context1.user_info_id = userInfoId;

                    registerRepo.getReortingUserForManager(context1, function (err1, data1) {

                        if (!err1) {
                            console.log(data1);

                            var img = '';
                            var rpt_header = '';

                            if (data1.length > 0) {
                                rpt_header = "<h2>Reporting User List</h2>";
                            }

                            for (let i = 0; i < data1.length; i++) {

                                let reporting_user_id = data1[i].USER_INFO_ID;
                                let hw1 = reporting_user_id.toString();

                                var encrypt = crypto.createCipheriv('des-ede3', key, "");
                                var theCipher1 = encrypt.update(hw1, 'utf8', 'base64');
                                theCipher1 += encrypt.final('base64');

                                theCipher1 = theCipher1.toString().replace('/','Por21Ld');
                                console.log(theCipher1);


                                var u_url = `http://roi.fakhruddinproperties.com:7200/userroilistpage/${theCipher1}/${theCipher}/${data1[i].USER_SURNAME}`;
                                var roi_indi = '';

                                if (data1[i].ROI_COUNT == 0) {
                                    roi_indi = 'No current week ROI';
                                    img += '<li><a href="' + u_url + '" style="color: #f50;">' + data1[i].USER_SURNAME + ' (' + roi_indi + ')</a></li>'
                                } else {
                                    img += '<li><a href="' + u_url + '">' + data1[i].USER_SURNAME + '</a></li>'
                                }

                            }

                            var table_header = '';
                            var table_row = '';

                            if (data.LPO != 0 || data.FINANCE_PAY_COUNT != 0 || data.DOCUMENT_COUNT != 0 || data.SECURITY_COUNT != 0) {
                                table_header = '<h2>Total Pending Approval:</h2>';

                                if (data.LPO != 0) {
                                    var lpo_url = `http://roi.fakhruddinproperties.com:7200/lpoemailapproval/${theCipher}/${type_user}`;
                                    table_row += '<span><a href="' + lpo_url + '" style="color: #f50;">LPO (' + data.LPO + ')</a>,</span>';
                                }

                                if (data.FINANCE_PAY_COUNT != 0) {
                                    var fin_pay_url = `http://roi.fakhruddinproperties.com:7200/financepaymentemailapproval/${theCipher}/${type_user}/${type_id}`;
                                    table_row += '<span><a href="' + fin_pay_url + '" style="color: #f50;">Finace Payment Request (' + data.FINANCE_PAY_COUNT + ')</a>,</span>';
                                }

                                if (data.DOCUMENT_COUNT != 0) {
                                    var doc_url = `http://roi.fakhruddinproperties.com:7200/documenttrackingemailapproval/${theCipher}/${type_id}/${resource_id}`;
                                    table_row += '<span><a href="' + doc_url + '" style="color: #f50;"> Document Tracking (' + data.DOCUMENT_COUNT + ')</a>,</span>';
                                }

                                if (data.SECURITY_COUNT != 0) {
                                    var sec_url = `http://roi.fakhruddinproperties.com:7200/securitydepositemailapproval/${theCipher}`;
                                    table_row += '<span><a href="' + sec_url + '" style="color: #f50;"> Security Deposit (' + data.SECURITY_COUNT + ')</a>,</span>';
                                }
                            }

                            console.log(table_row);

                            var url = `http://roi.fakhruddinproperties.com:7200/emailroipage/${theCipher}`;

                            var body = "Hello " + user_name + ",<br> <strong>Click link to Update ROI: <a href =" + url + ">" + url + "</a> </strong><br><br>" +
                                table_header +
                                "<p>" +
                                table_row +
                                "</p>" +
                                rpt_header + "<div><ol>" + img + "</ol></div>";

                            console.log(body);

                            let mailOptions = {
                                from: sendingEmailConfig.FP_TASK_EMAIL_ID,
                                to: to_mail,
                                subject: subject,
                                html: body
                            }

                            console.log(mailOptions);

                            sendingEmailConfig.sendingMail(mailOptions, function (error, response) {
                                if (error) {
                                    console.log(error);
                                }
                                if (response) {
                                    console.log('Email Sent Successfully to-->' + data.USER_SURNAME+' -'+theCipher);
                                }
                            });

                        } else {
                            console.log('Internal Server Error');
                        }

                    });

                    //}
                });
            }
        } else {
            console.log('Internal Server Error');
        }
    });
}


function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    //return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

module.exports = {
    getSendRoiEmailToUser
}