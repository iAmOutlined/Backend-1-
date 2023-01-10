const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const errors = require("./structs/errors");
const { v4: uuidv4 } = require("uuid");
const { ApiException } = errors;
const version = "2.0.0";
const URL_LOGGING = true;

(function() {
  "use strict";

  String.prototype.format = function() {
    const args = arguments[0] instanceof Array ? arguments[0] : arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != "undefined" ? args[number] : match;
    });
  };

  const app = express();

  app.set('port', process.env.PORT || 8080);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.set("etag", false);

  if (URL_LOGGING)
    app.use((req, res, next) => {
      if (!req.url.endsWith('VerifyRealMoneyPurchase?profileId=common_core&rvn=1') && !req.url.endsWith('Sentimos que tengas este error.')) {
        console.log(req.url)
      }
      next()
    })



  
  app.use("/", express.static("public"));

  fs.readdirSync(`${__dirname}/managers`).forEach(route => {
    require(`${__dirname}/managers/${route}`)(app, process.env.PORT || 8080);
  })

  app.use((req, res, next) => {
    next(new ApiException(errors.com.epicgames.common.not_found));
  })

  app.use((err, req, res, next) => {
    let error = null;

    if (err instanceof ApiException) {
      error = err;
    } else {
      const trackingId = req.headers["x-epic-correlation-id"] || uuidv4();
      error = new ApiException(errors.com.epicgames.common.server_error).with(trackingId);
      console.error(trackingId, err);
    }

    error.apply(res);
  });


  app.listen(process.env.PORT || 8080, () => {
    console.log(`Listening port to ${version}  ${8080}!`);
  });

  module.exports = app;
}());