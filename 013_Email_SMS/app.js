const nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chintan.tops@gmail.com',
      pass: 'dejl icyq qrel gyyf'
    }
  });
  
  var mailOptions = {
    from: 'chintan.tops@gmail.com',
    to: 'chintan.tops@gmail.com',
    subject: 'Sending Email using Node.js',
    html: "<h1>Hello</h1><span>Please verify your account on <a href='https://www.fb.com'>click here</a></span> "
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });