const debug = require('debug')('express:login');

const { FETCH_INFO_ERROR_MESSAGE } = require('../constants');
const { getUser,GetUserResourceList } = require('../repository');

async function redirectToDashboard(req, res) {
  try{
  var userInfo;
  const { user } = req;
  userInfo = await getUser({user_info_id : user.USER_INFO_ID,type : 'Not Return'});
  let resource = await GetUserResourceList({user_info_id : user.USER_INFO_ID,type : 'Not Return'});
  userInfo.resource = (resource.length > 0) ? resource[0]:{USER_TYPE:null,TYPE_ID:null};
  console.log({userInfo});
      //  debug('login:redirectToDashboard');
      req.session.userInfo = userInfo;
      res.redirect('/');
  }catch(ex){
    const messages = {
      errors: {
        databaseError: FETCH_INFO_ERROR_MESSAGE,
      },
    };  
    return res.status(500).render('pages/login', { messages });
  }
  
}

module.exports = redirectToDashboard;
