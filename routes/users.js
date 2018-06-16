var express = require('express');
var router = express.Router();
var multer = require('multer');
var user_controller = require('../controller/userController');
// var login_controller = require('../controller/loginController');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool',function(req,res,next){
  res.send("you're so cool");
});

router.get('/a',user_controller.userList);
router.post('/add',user_controller.userAdd);
router.post('/update',user_controller.userUpdate);
router.patch('/delete',user_controller.userDelete);
router.get('/a_orderby',user_controller.userOrderByList);
router.get('/a_dataByTerm/:term',user_controller.userDataByTerm);
router.post('/a_sendMail',user_controller.userSendMail);
// router.post('/register',login_controller.register);
// router.post('/login',login_controller.login);

router.post('/saveuploadfile',user_controller.uploadFile);

// router.post('/saveuploadfile',multer({
//   dest:'./uploads/files'
// }).single('myfile'),function(req,res){
//   console.log(req.body);
// });

module.exports = router;