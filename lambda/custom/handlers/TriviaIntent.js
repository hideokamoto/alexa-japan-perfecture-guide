const {
  canHandle
} = require('ask-utils')
const {
  getPrefName,
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
    const prefName = getPrefName(handlerInput)
    const randomFact = getRandomFactType()
    const {
      speaks,
      contents
    } = await getDBPediaContent(prefName, randomFact)
    const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!'

    return handlerInput.responseBuilder
      .speak(speaks.join('。'))
      .reprompt(speechText)
      .withSimpleCard('Hello World', contents.join('\n'))
      .getResponse()
  }
}
