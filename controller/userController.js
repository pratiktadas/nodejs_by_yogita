var User = require('../models/userModel');
var nodemailer = require('nodemailer');
var multer = require('multer');
var path = require('path');
//require('ssl-root-cas').inject();
// exports.userList = function(req,res){
//     //res.send('msg');
//     new User().where({
//         uname: 'Teju'
//     }).fetch()
//     .then(function(user){
//         res.send(user.toJSON());
//     }).catch(function(error){
//         console.log(error);
//         res.send('Error occured');
//     });
// }

exports.userList = function(req,res){
    //res.send('msg');
    //new User()
    User.forge()
    .fetchAll()
    .then(function(user){
        res.send(user.toJSON());
    }).catch(function(error){
        console.log(error);
        res.send('Error occured');
    });
}

// exports.userAdd = function(req,res){
//     var obj = new User();
//     obj.set('uname','Devi');
//     obj.set('password','Devesh');

//     obj.save().then(function(u){
//         console.log('User saved');
//     }).catch(function(error){
//         res.send('Something went wrong');
//     });
// }

// exports.userAdd = function(req,res){
//     var obj = new User();
//     obj.set('uname','Devi');
//     obj.set('password','Devesh');

//     obj.save().then(function(u){
//         console.log('User saved');
//     }).catch(function(error){
//         res.send('Something went wrong');
//     });

exports.userAdd = function(req,res){
    
    console.log(req.body.uname);
    var obj = new User();
    
    obj.set({
        uname: req.body.uname,
        password: req.body.password
    })
    .save()
    .then(function(u){
        console.log('User saved');
        res.send(u);
    }).catch(function(error){
        res.send(error);
    });
}

exports.userUpdate=function(req,res){
    new User({
        'id':req.body.id
    })
    .save({
        uname: req.body.uname,
        password: req.body.password
    })
    .then(function(updateModel){
        console.log('user updated');
    })
    .catch(function(error){
        console.log(error);
    });
}

exports.userDelete=function(req,res){
    new User({
        'id':req.body.id
    })
    .fetch()
    .then(function(u){
        u.destroy();
        console.log('success');
    })
    .catch(function(error){
        console.log(error);
        res.send(error);
    })
}

exports.userOrderByList=function(req,res){
    var list=new User();
    list
    .orderBy('id','desc')
    .fetchAll()
    .then(function(u){
        console.log('success');
        res.send(u.toJSON());
    })
    .catch(function(error){
        console.log('error');
    })
}

exports.userDataByTerm=function(req,res){
    console.log(req.params.term);
    User.query(function(u){
        //u.where('uname','LIKE',`'%${req.params.term}%'`);
        u.whereRaw(`uname LIKE ?`,[`%${req.params.term}%`])
    })
    .fetchAll()
    .then(function(model){
        res.send(model.toJSON())
    })
    .catch(function(error){
        console.log('success');
        res.send('error');
    })
}

exports.userSendMail=function(req,res){
    // var transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 587,
    //     secure: false,
    //     auth: {
    //         user: 'sudhir.deshmukh8184@gmail.com',
    //         pass: 'Tecture@123'
    //     },
    //     tls: {
    //              rejectUnauthorized: false
    //         }
    // });
    // var text = 'Hello, This is the test mail from Yogita';
    // var mailOptions = {
    //     from: 'tecture@tecture.in',
    //     to: 'yogita.gawande@tecture.in',
    //     subject: 'Test Mail',
    //     text: text,

    // }
    // transporter.sendMail(mailOptions, function(error,info){
    //     if(error){
    //         console.log(error);
    //         res.json({yo: 'error'});
    //     }else{
    //         console.log('message sent:' +info.response);
    //         res.json({yo: info.response});
    //     };
    // });
    var transporter = nodemailer.createTransport({
        host: 'mail.tecture.in',
        port: 587,
        secure: false,
        auth: {
            user: 'yogita.gawande@tecture.in',
            pass: 'Yogita@123$'
        },
        tls: {
                 rejectUnauthorized: false
            }
    });
    var text = 'Hello, This is the test mail from Yogita';
    let mailOptions = {
        from: 'tecture@tecture.in',
        to: 'yogita.gawande@tecture.in, akhilesh.chandak@tecture.in',
        subject: 'Test Mail',
        text: text,
        attachments: [
            {
                filename: 'a.txt',
                content: 'Yogita'
            },
            {
                filename: 'debit.pdf',
                path: '/home/tecture17/Desktop/DEBIT_0010_ACCSYS .pdf'
            }
        ]
    }
    
    // var mailOptions = {
    //     from: 'tecture@tecture.in',
    //     to: 'yogita.gawande@tecture.in',
    //     subject: 'Test Mail',
    //     text: text,

    // }
    transporter.sendMail(mailOptions, function(error,info){
        if(error){
            console.log(error);
            res.json({yo: 'error'});
        }else{
            console.log('message sent:' +info.response);
            res.json({yo: info.response});
        };
    });
}

var store = multer.diskStorage({
    destination: function(req,file,callback){
        callback(null,'./uploads/files');
    },
    filename: function(req,file,callback){
        callback(null,file.originalname);
    }
    
});

var upload = multer({
    storage: store
}).single('myfile');

// exports.getUploadUi=function(req,res){
    
// }
exports.uploadFile=function(req,res){
    //console.log(req.body);
    upload(req,res,function(err){
        if(err){
            return res.end('error');
        }
        res.end('success');
    });
}