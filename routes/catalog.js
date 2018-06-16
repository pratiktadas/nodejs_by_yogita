var express = require('express');
var router = express.Router();
var login_controller = require('../controller/loginController');
var user_controller = require('../controller/userController');
var client_controller = require('../controller/clientController');
var service_controller = require('../controller/serviceController');
var rule_controller = require('../controller/ruleController');
var multer = require('multer');
router.get('/',user_controller.userList);
router.post('/register',login_controller.register);
router.post('/login',login_controller.login);
router.get('/get_client_data',client_controller.get_client_data);
router.post('/save_client_data',client_controller.save_client_data);
router.get('/get_last_client_code',client_controller.get_last_client_code);
router.post('/save_client_data_by_object',client_controller.save_client_data_by_object);
router.post('/save_multiple_client_data_by_object',client_controller.save_multiple_client_data_by_object);
router.post('/save_client_data_through_direct_object',client_controller.save_client_data_through_direct_object);
router.post('/save_services',service_controller.save_services);
router.get('/get_all_services',service_controller.get_all_services);
router.get('/get_service_data_by_id/:service_id',service_controller.get_service_data_by_id);
router.post('/update_service_data',service_controller.update_service_data);
router.get('/delete_service_data/:service_id',service_controller.delete_service_data);
router.post('/save_rules_data',rule_controller.save_rules_data);
router.get('/get_rules_data',rule_controller.get_rules_data);
router.get('/get_rules_data_by_id/:rule_id',rule_controller.get_rules_data_by_id);
// var storage = multer.diskStorage({
//   dest: function(req,file,callback){
//       callback(null,'./public/images');
//   },
//   filename: function(req,file,callback){
//       callback(null,file.originalname);
//   }
  
// });

// var upload = multer({
//   storage: storage
// }).single('myfile');

 router.get('/getuploadfile',function(req,res){
     res.sendFile('/home/tecture17/my_node_app/helloworld/index.html');
   });

//   router.post('/saveuploadfile',function(req,res){
//     upload(req,res,function(err){
//       if(err){
//           return res.end('error');
//       }
//       res.end('success');
//   });
//   });
module.exports=router;