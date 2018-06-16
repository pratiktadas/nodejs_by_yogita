var Users = require('../models/loginModel');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../config');

exports.register = function(req, res){
    
    var hash_password = bcrypt.hashSync(req.body.password,10);
    Users.forge()
    .save({
        email: req.body.email,
        password: hash_password
    },
    function(err,user){
        if(err) return res.status(500).send('problem registering user');
        var token = jwt.sign({ id: user._id}, config.secret, {expiresIn:86400});
        res.status(200).send({auth: true, token: token});
    });
};

exports.login = function(req,res){
    console.log(req.body);
    Users.where({
        'email': req.body.email
    })
    .fetch()
    .then(function(user){
        console.log(user.get('password'));
        
        if(user.get('password').length>0){
            var pass=user.get('password');
            console.log('in user.get(password).length>0');
            
            if(bcrypt.compareSync(req.body.password,pass)){
                console.log('in bcrypt.hashSync(req.body.password)==u.get(password)')
                var token = jwt.sign({id:user.get('id')},process.env.SECRET_KEY,{expiresIn: 86400});
                res.json({
                    status: true,
                    token: token
                });
            }else{
                console.log('in else');
                res.json({
                    status: false,
                    message: "Something went wrong"
                });
            }
        }
    }).catch(function(error){
        console.log('error');
    });
};