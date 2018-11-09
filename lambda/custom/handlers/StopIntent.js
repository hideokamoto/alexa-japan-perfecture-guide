const { canHandle } = require('ask-utils')
const { SKILL_NAME } = require('../constans')
const { SpeechconContent } = require('../fixtures')
module.exports = {
  canHandle (handlerInput) {
    if (canHandle(handlerInput, 'IntentRequest', 'AMAZON.CancelIntent')) return true
    if (canHandle(handlerInput, 'IntentRequest', 'AMAZON.StopIntent')) return true
    if (canHandle(handlerInput, 'IntentRequest', 'AMAZON.NoIntent')) return true
    return false
  },
  handle (handlerInput) {
    const Content = new SpeechconContent()
    const { speechText, text } = Content.getGoodByeMessage()

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, text)
      .getResponse()
  }
}
