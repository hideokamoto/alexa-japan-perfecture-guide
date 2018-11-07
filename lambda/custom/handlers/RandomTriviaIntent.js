const {
  canHandle
} = require('ask-utils')
const {
  getRandomPrefName,
  getRandomFactType
} = require('../utils')
const {
  getDBPediaContent
} = require('../sparqls/index')
module.exports = {
  canHandle (handlerInput) {
    return canHandle(handlerInput, 'IntentRequest', 'RandomTriviaIntent')
  },
  async handle (handlerInput) {
    const randomPref = getRandomPrefName()
    const randomFact = getRandomFactType()
    const {
      speaks,
      contents
    } = await getDBPediaContent(randomPref, randomFact)
    const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!'

    return handlerInput.responseBuilder
      .speak(speaks.join('。'))
      .reprompt(speechText)
      .withSimpleCard('Hello World', contents.join('\n'))
      .getResponse()
  }
}
