var airQuality = require("./airquality.js");
var alexa = require("./alexa.js");

exports.handler = function (event, context) {
    try {

        if (event.request.type === "LaunchRequest") {
            onLaunch(event, 
                event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(alexa.buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(alexa.buildResponse(sessionAttributes, speechletResponse));
                });
        } 
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // dispatch custom intents to handlers here
    if (intentName == 'NitrogenOxideIntent') {
        handleNitrogenOxideIntent(intent, session, callback);
    }
    else if (intentName == 'ParticulateMatterIntent') {
        handleParticulateMatterIntent(intent, session, callback);
    }
    else if (intentName == 'SulfurDioxideIntent') {
        handleSulfurDioxideIntent(intent, session, callback);
    }
    else if (intentName == 'OzoneIntent') {
        handleOzoneIntent(intent, session, callback);
    }
    else if (intentName == 'CarbonMonoxideIntent') {
        handleCarbonMonoxideIntent(intent, session, callback);
    }
    else if (intentName == 'AMAZON.HelpIntent') {
        // Help
        callback(session.attributes,
        alexa.buildSpeechletResponseWithoutCard("If you would like to know the air quality in Northern Ireland, ask something like 'What is the level of Nitrous Oxide in Belfast'", "", "false"));
        return;
    }
    else if (intentName == 'AMAZON.StopIntent') {
        // Stop
        callback(session.attributes,
        alexa.buildSpeechletResponseWithoutCard("ok", "", "true"));
    }
    else if (intentName == 'AMAZON.CancelIntent') {
        // Cancel
        callback(session.attributes,
        alexa.buildSpeechletResponseWithoutCard("ok", "", "true"));
    }
    else {
        throw "Invalid intent";
    }
}

function onLaunch(event, launchRequest, session, callback) {

    var cardTitle = "Air Quality Northern Ireland";
    var speechOutput = "Learn about air quality in northern ireland, ask about levels of Pollutants such as Nitrous Oxide, Particulate Matter, Sulfur Dioxide and Carbon Monoxide";

    callback(session.attributes,
      alexa.buildSpeechletResponse(cardTitle, speechOutput, "", false));
   
}

function handleNitrogenOxideIntent(intent, session, callback) {
  airQuality.NitrogenOxide(intent.slots.city.value, function(toSay){
    callback(session.attributes,
       alexa.buildSpeechletResponseWithoutCard(toSay, "", "false"));   
  });
}

function handleParticulateMatterIntent(intent, session, callback) {
  airQuality.ParticulateMatter(intent.slots.city.value, function(toSay){
    callback(session.attributes,
       alexa.buildSpeechletResponseWithoutCard(toSay, "", "false"));   
  });
}

function handleSulfurDioxideIntent(intent, session, callback) {
  airQuality.SulfurDioxide(intent.slots.city.value, function(toSay){
    callback(session.attributes,
       alexa.buildSpeechletResponseWithoutCard(toSay, "", "false"));   
  });
}

function handleOzoneIntent(intent, session, callback) {
  airQuality.Ozone(intent.slots.city.value, function(toSay){
    callback(session.attributes,
       alexa.buildSpeechletResponseWithoutCard(toSay, "", "false"));   
  });
}

function handleCarbonMonoxideIntent(intent, session, callback) {
  airQuality.CarbonMonoxide(intent.slots.city.value, function(toSay){
    callback(session.attributes,
       alexa.buildSpeechletResponseWithoutCard(toSay, "", "true"));   
  });
}