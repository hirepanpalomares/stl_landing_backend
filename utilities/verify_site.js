var request = require('request');

async function verifySite(token)  {

  let recaptcha_validation = await doRequest(token);
  return recaptcha_validation

}

async function doRequest (token) {
  url = {
    uri: "https://www.google.com/recaptcha/api/siteverify",
    method: "POST",
    form: {
      secret: process.env.RECAPTCHA_SECRET_KEY_V3,
      response: token
    }
  }
  return new Promise(function (resolve, reject) {
    request(url, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(JSON.parse(body));
      } else {
        reject(error);
      }
    });
  });

  // await request({
  //     uri: "https://www.google.com/recaptcha/api/siteverify",
  //     method: "POST",
  //     form: {
  //       secret: "",
  //       response: token
  //     }
  //   }, function(error, response, body){
  //     console.log(error);
  //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //     // console.log(body);
  //     callback(body);
  //   });
}



module.exports = {doRequest, verifySite};
