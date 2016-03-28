var express = require("express");
var app = express();


var port = (process.env.VCAP_APP_PORT || 3000);

var bodyParser = require('body-parser');

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.raw({extended:true}))
var urlOfService;
if(process.env.VCAP_SERVICES){
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var userProvidedServiceArray = env['user-provided'];
    for(var i = 0; i < userProvidedServiceArray.length; i++) {
        var nameOfService = userProvidedServiceArray[i].name;
        if(nameOfService=='sampleserviceforcreatingcontacts') {
            urlOfService = userProvidedServiceArray[i].credentials.uri+'/contacts'
        }
    }

}
else{
    urlOfService='www.google.com'
}


var router = express.Router();

router.get('/getAllContacts', function(request,response){

    var request = require('request');
    request(urlOfService, function (error, responseforrequest, body) {
        if (!error && response.statusCode == 200) {
            response.send(body) // Show the HTML for the Google homepage.
        }
    })

});



app.use('/', router);
app.listen(port);
console.log("server running");