const {
  canHandle,
  getSlotByName,
  getResolutionSlot
} = require('ask-utils')
const {
  getPrefName
} = require('../utils')
const {
  getDBPediaContent
} = require('../sparqls/index')
module.exports = {
  canHandle (handlerInput) {
    return canHandle(handlerInput, 'IntentRequest', 'FactIntent')
  },
  async handle (handlerInput) {
    const prefName = getPrefName(handlerInput)
    const fact = getResolutionSlot(getSlotByName(handlerInput, 'factType'))
    const factType = fact.name
    const {
      speaks,
      contents
    } = await getDBPediaContent(prefName, factType)
    const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!'

    return handlerInput.responseBuilder
      .speak(speaks.join('。'))
      .reprompt(speechText)
      .withSimpleCard('Hello World', contents.join('\n'))
      .getResponse()
  }
}
