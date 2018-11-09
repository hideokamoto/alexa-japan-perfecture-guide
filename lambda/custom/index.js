/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core')
const {
  RequestLogger,
  ResponseLogger
} = require('ask-utils')

const skillBuilder = Alexa.SkillBuilders.custom()

exports.handler = skillBuilder
  .addRequestHandlers(
    require('./handlers/LaunchRequest'),
    require('./handlers/FactIntent'),
    require('./handlers/RandomTriviaIntent'),
    require('./handlers/TriviaIntent'),
    require('./handlers/HelpIntent'),
    require('./handlers/YesIntent'),
    require('./handlers/StopIntent'),
    require('./handlers/SessionEndHandler')
  )
  .addRequestInterceptors(new RequestLogger())
  .addResponseInterceptors(new ResponseLogger())
  .addErrorHandlers(require('./handlers/ErrorHandler'))
  .lambda()
