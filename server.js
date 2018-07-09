var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');
	
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	
    var app = express();
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var port = 3000;
    app.get('/', function (req, res) {
      res.render('index');
    });
    app.post('/send-email', function (req, res) {
		/*
		
      let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,//465..25
          secure: false,
          auth: {
              user: 'mikeleilyash@gmail.com',
              pass: 'face112358'
          },
		  tls:{
			rejectUnauthorized: false
			}
      });
      let mailOptions = {
          from: '"Krunal Lathiya" <mikeleilyash@gmail.com>', // sender address
          to: req.body.to, // list of receivers
          subject: req.body.subject, // Subject line
          text: req.body.body, // plain text body
          html: '<b>NodeJS Email Tutorial</b>' // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
          });
		  */
			var nodemailer = require('nodemailer');
			var sgTransport = require('nodemailer-sendgrid-transport');

			var options = {
			  auth: {
				api_user: 'Mikele11',//SENDGRID_USERNAME
				api_key: 'face112358'//SENDGRID_PASSWORD
			  }
			}

			var client = nodemailer.createTransport(sgTransport(options));

			var email = {
			  from: 'mikeleilyash@gmail.com',
			  to: req.body.to,
			  subject: req.body.subject,
			  text: req.body.body,
			  html: '<b>NodeJS Email Tutorial</b>'
			};

			client.sendMail(email, function(err, info){
				if (err ){
				  console.log(error);
				}
				else {
				  console.log('Message sent: ' + info.response);
				}
			});		  
		  
      });
          app.listen(port, function(){
            console.log('Server is running at port: ',port);
          });
