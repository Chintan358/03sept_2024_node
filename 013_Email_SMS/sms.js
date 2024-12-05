var unirest = require("unirest");

const sendsms = ()=>{

    var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

req.query({
  "authorization": "",
  "message": "This is a test message",
  "language": "english",
  "route": "q",
  "numbers": "8238215692",
});

req.headers({
  "cache-control": "no-cache"
});


req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});


}

const otp = ()=>{
    var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

req.query({
  "authorization": "",
  "variables_values": "5599",
  "route": "otp",
  "numbers": "8238215692"
});

req.headers({
  "cache-control": "no-cache"
});


req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});

}


//sendsms()
otp()