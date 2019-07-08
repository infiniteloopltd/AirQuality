(function() {
 
 module.exports.buildSpeechletResponseWithoutCard = function(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: "Sorry?"
            }
        },
        shouldEndSession: shouldEndSession
    };
};

module.exports.buildResponse = function(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
};

module.exports.buildSpeechletResponse = function(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: "Sorry?"
            }
        },
        shouldEndSession: shouldEndSession
    };
};
 
})();