
const bcrypt = require('bcrypt');
const oracledb = require('oracledb');
const database = require('../../db/index');
const request = require('request');

async function getUserForLoginData(req, res) {
  const context ={
    form:  {
      userName : req.username || '',
      password : req.password || ''
    },
    url : 'http://192.168.61.21:8002/MobileAppService.asmx/UserSignIn',
    headers :  {'User-Agent': 'request','Content-Type': 'application/x-www-form-urlencoded;application/json; charset=UTF-8'}
  };
  request.post(context,async function(errReq,xhr,data){
      if(errReq){
        return res(errReq,null); 
      }else{
        if(xhr.statusCode == 200){     
          var users = JSON.parse(data);
            if (users.UserInfoId > 0) {
              users.USER_SURNAME =users.Surname;
              users.USER_INFO_ID =users.UserInfoId;
            return res(null,users);
            } else {
              return res('Invalid Password',null);
            }
        } else {
          return res(xhr.statusMessage,null); 
        }
        } 
     
 });
  
}

async function getUser(req,res){
  
  let params = {  query : `BEGIN usp_user_info_get(:p_user_surname,:p_user_employee_id,:p_user_login_name,:p_user_mobile,
	  :p_user_email,:p_user_level_name,:p_is_active,:p_user_level_id,:p_user_info_id,:p_search_text, :result_set); END;`,
    params : {
      p_user_surname:req.user_surname ? req.user_surname :null,
      p_user_employee_id:req.user_employee_id ? req.user_employee_id:null,
      p_user_login_name:req.user_login_name ? req.user_login_name :null,
      p_user_mobile:req.user_mobile ? req.user_mobile :null,
      p_user_email:req.user_email ? req.user_email :null,
      p_user_level_name:req.user_level_name ? req.user_level_name :null,
      p_is_active:req.is_active ? req.is_active :null,
      p_user_level_id:req.user_level_id ? req.user_level_id :null,
      p_user_info_id:req.user_info_id ? req.user_info_id :null,
      p_search_text:req.search_text ? req.search_text :null,
      result_set:  { type: oracledb.CURSOR, dir : oracledb.BIND_OUT }
    }
  };
  if(req.type == 'Not Return'){
    return new Promise((reolve,reject)=>{ database.GetDataStoreProcedure(params, (err, result) =>{
      if (err) {
        reject(err);
      } else {
        reolve(result.length > 0 ? result[0] :{});
      }
    });
  });
  }else{
    database.GetDataStoreProcedure(params,(err,result)=>{ 
     if(err){
       return res(err,null);
     } else {   
       //console.log(result[0]);
       return res(null,result.length > 0 ? result[0] : {});
     }
     });
  }
}

async function getUserById(id,res){
  return getUser({user_info_id:id},res);
}


var  GetUserResourceList = async (req)=> {
  let parameters = {  query : `BEGIN MOB_RESOURCE_GET_ALL(:result_set,:p_Resource_name,:p_Resource_code,:p_app_user,:p_Month,:p_Year,
    :p_mgr_type,:p_Type_Id,:p_user_id,:p_is_active); END;`,
  params : {
    result_set: { type: oracledb.CURSOR, dir : oracledb.BIND_OUT },
    p_Resource_name   : null,
    p_Resource_code   : null,
    p_app_user        : null,
    p_Month           : null,
    p_Year            : null,
    p_mgr_type        : null,
    p_Type_Id         : null,
    p_user_id         : req.user_info_id ? req.user_info_id : null,
    p_is_active       : null,
    
  }
  };
  
  return new Promise((reolve,reject)=>{ database.GetDataStoreProcedure(parameters, (err, result) =>{
      if (err) {
        reject(err);
      } else {
        reolve(result);
      }
    });
  });
  
}

module.exports = {
  getUserForLoginData,
  getUserById,
  getUser,
  GetUserResourceList
};
