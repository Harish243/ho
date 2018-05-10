var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var mongojs = require('mongojs');
var db = mongojs('localhost:27017/iho', ['users','customers','survey', 'appointment']);



var app = express();


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'paruchuriharish07@gmail.com',
      pass: 'Akhila@111'
    }
  });


app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const userData = [];

function sentMail(mail, subject, html,cb) {
    var mailOptions = {
        from: 'paruchuriharish07@gmail.com',
        to: mail,
        subject: subject,
        html: html
    };
    console.log('=====================================');
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            cb(error, null);
        } else {
            console.log('Email sent: ' + info.response);
            cb(null, info);
        }
    });
}


app.post('/users', function (req, res) {
    db.users.findOne({username:req.body.username,password:req.body.password},function(err,data){
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
});
app.post('/allocateDoctor', function (req, res) {
    console.log(req.body);

    db.customers.update({_id:mongojs.ObjectId(req.body.custId)},{$set:{docId:req.body.docId,docName:req.body.docName}},function(err,data){
        if (err) {
            res.json(err);
        } else {
            db.customers.find({},function(err,data){
                if (err) {
                    res.json(err);
                } else {
                    res.json(data);
                }
            });
        }
    });
});
app.get('/getCustomer', function (req, res) {
    db.customers.find({},function(err,data){
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
});
app.get('/getDoctors', function (req, res) {
    db.users.find({user_type:'doctor'},{password:0,user_type:0},function(err,data){
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
});
app.post('/feedback', function (req, res) {
    db.customers.find({feedBack:'',docId:req.body.id},function(err,data){
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
});
app.post('/getAppointments', function (req, res) {
    db.appointment.find({docId:req.body.id},function(err,data){
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
});
app.post('/updateFeedBack', function (req, res) {
    var html = '<html><body><div style="text-align:left;"><h5> Doctor feedBack='+ req.body.feedBack +'\
    </div></body></html>';
    db.appointment.insert(req.body,function(err,data) {
        if (err) {
            res.json(err);
        } else {
            sentMail(req.body.email,'Docter feedack', html, function(err,data){
                console.log('mail sented succesfully.!');                
            });
            db.customers.update({_id: mongojs.ObjectId(req.body._id)},{
                $set: {feedBack:'1'}
            },function(err,data){
                if (err) {
                    res.json(err);
                } else {
                    res.json(data);
                }
            });
        }
    });
});

app.get('/getCustmers', function (req, res) {
    console.log('/getCustmers===id=', req.query.userId);
    db.customers.find({userId:req.query.userId},function(err,data){
        if (err) {
            res.json(err);
        } else {
            console.log('==========================');
            res.json(data);
        }
    });
});

app.put('/updateCustomer', function (req, res) {
    console.log(req.body);
    var id = req.body._id;
    delete req.body._id;
    db.customers.update({_id:mongojs.ObjectId(id)},
    {$set:{
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "city": req.body.city,
        "gender": req.body.gender,
        "voucher": req.body.voucher,
        "dob": req.body.dob,
        "mobile": req.body.mobile,
        "email": req.body.email,
        "height": req.body.height,
        "weight": req.body.weight,
        "waist": req.body.waist,
        "lan": req.body.lan,
        "text": req.body.text,
        "plan": req.body.plan,
        "expire": req.body.expire,
        "custId" : req.body.custId
    }},function(err,data){
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
});

app.post('/changepass', function (req, res) {
    console.log(req.body);
    db.users.update({_id: mongojs.ObjectId(req.body.id)},
    {$set:{
        password: req.body.first
    }},function(err,data){
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
});
app.post('/updateCustomerData', function (req, res) {
    console.log('/updateCustomerData===',req.body);
    db.customers.findOne({_id: mongojs.ObjectId(req.body.id)},function(err,doc){
        if(err){
            res.json(err);
        }else{
            delete doc._id; 
            var obj=[];
            obj.push(req.body.next);
            obj.push(req.body.next1);
            obj.push(req.body.next2);
            var data = [];
            for(var i=0;i<obj.length;i++){
                var cust = JSON.parse(JSON.stringify(doc));
                cust.appointDate = obj[i];
                // cust.form_type = 'add';
                data.push(cust);            
            }
            db.customers.update({_id: mongojs.ObjectId(req.body.id)},{$set:{appointDate:req.body.dates}},function(){
                if (err) {
                    res.json(err);
                } else {
                    db.customers.insert(data,function(err,data){
                            if (err) {
                                res.json(err);
                            } else {
                                var customers = data;
                                db.survey.findOne({custId:req.body.id},function(err,survey){
                                    if (err) {
                                        res.json(err);
                                    } else {
                                         var surveyArray = [];
                                         for(var i=0;i<customers.length;i++){
                                            var survey = JSON.parse(JSON.stringify(survey));
                                            delete survey._id;
                                            survey.custId = customers[i]._id.toString();
                                            surveyArray.push(survey); 
                                        }

                                        console.log(surveyArray.length);

                                        db.survey.insert(surveyArray,function(err,doc){
                                            if (err) {
                                                res.json(err);
                                            } else {
                                                res.json(doc);
                                            }
                                        });
                                    }
                                });
                            }
                    });
                }
            });
        }
        
           
    });
       
});
app.post('/getSurvey', function (req, res) {

    console.log(req.body);
    db.survey.findOne({custId:req.body.custId},function(err,data){
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
});

app.post('/editSurvey', function (req, res) {
    console.log(req.body);

    db.survey.update({_id:mongojs.ObjectId(req.body._id)},
    {$set:{
        "veg" :req.body.veg,
        "high" :req.body.high,
        "problem1" : req.body.problem1,
        "problem2" : req.body.problem2,
        "problem3" : req.body.problem3,
        "problem4" : req.body.problem4,
        "problem5" : req.body.problem5,
        "problem6" : req.body.problem6,
        "problem7" : req.body.problem7,
        "problem8" : req.body.problem8,
        "problem9" : req.body.problem9,
        "THypertension1" : req.body.THypertension1,
        "THypertension2" : req.body.THypertension2,
        "THypertension3" : req.body.THypertension3,
        "THypertension4" : req.body.THypertension4,
        "THypertension5" : req.body.THypertension5,
        "THypertension6" : req.body.THypertension6,
        "yes1" :req.body.yes1,
        "yes2" : req.body.yes2,
        "almost" : req.body.almost,
        "every" :req.body.every,
        "yes3" :req.body.yes3,
        "everyday" : req.body.everyday,
        "custId" : req.body.custId
    }},function(err,data){
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
});


app.post('/survey', function (req, res) {


    db.survey.insert(req.body,function(err,data){
        if (err) {
            res.json(err);
        } else {
            db.customers.update({_id:mongojs.ObjectId(req.body.custId)},{$set: { form_type: 'edit' } },function(err,data){
                if (err) {
                    res.json(err);
                } else {
                    db.customers.find({},function(err,data){
                        if (err) {
                            res.json(err);
                        } else {
                            res.json(data);
                        }
                    });
                }
            });
        }
    });
    
});



app.post('/saveCustomer', function (req, res) {
    var userName = (req.body.firstname+'_'+ Math.random().toString(36).substring(20));
    var pwd = Math.random().toString(36).substring(17);
    var html = '<html><body><div style="text-align:left;"><h5>Hi '+req.body.firstname +' Please find your login credentials</h5>\
    <h4>User Name:- '+ userName +'</h4> \
    <h4>Password:- '+ pwd +'</h4>\
    <a href="http://localhost:4000/#/Login">Click here to login</a>\
    </div></body></html>';
    var user = {
        username: userName,
        password: pwd,
        role_id: 5
    };
    db.users.insert(user, function(err,data) {
        if (err) {
            res.json(err);
        } else {
            console.log('user Data ===', data);
            sentMail(req.body.email,'login credentials', html, function(err,data){
                console.log('mail sented succesfully.!');                
            });
            req.body.userId =(data._id).toString();
            db.customers.insert(req.body, function(err,data1) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(data1);
                }
            });
        }
    });
});



var server = app.listen(4000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("app listening at http://%s:%s", host, port);
});


