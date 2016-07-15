fs = require('fs');

/*
 * GET home page.
 */
var config = require('../config.json');

exports.index = function(req, res){

    // read an stl file in from the current dir
    fs.readFile('example.stl', 'utf8', function (err,filestrr) {

      if (err) {
        return console.log(err);
      }

      //assign a filename that will error out
      var filename = "example"; //example.stl will work error free

      var params = {
        "file":filestrr,
        "fileName":filename,
        "hasRightsToModel":1,
        "acceptTermsAndConditions":1
      };

      req.api.addModel(params, function(error, results){

          if( error != null ){

            //error.data is not a JSON object
            var error_json = JSON.parse( error.data );

            //other stuff that needs to happen with error.data
          }

          res.render('index', {
              title: config.app.name,
              results: results
          });
      });

    });

};
