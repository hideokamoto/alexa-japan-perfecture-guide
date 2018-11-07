/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core')
const {
  RequestLogger,
  ResponseLogger
} = require('ask-utils')

const HelloWorldIntentHandler = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent'
  },
  handle (handlerInput) {
    const speechText = 'Hello World!'

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse()
  }
}

const skillBuilder = Alexa.SkillBuilders.custom()

exports.handler = skillBuilder
  .addRequestHandlers(
    require('./handlers/LaunchRequest'),
    HelloWorldIntentHandler,
    require('./handlers/FactIntent'),
    require('./handlers/RandomTriviaIntent'),
    require('./handlers/TriviaIntent'),
    require('./handlers/HelpIntent'),
    require('./handlers/StopIntent'),
    require('./handlers/SessionEndHandler')
  )
  .addRequestInterceptors(new RequestLogger())
  .addResponseInterceptors(new ResponseLogger())
  .addErrorHandlers(require('./handlers/ErrorHandler'))
  .lambda()
