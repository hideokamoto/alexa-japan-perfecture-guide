const { canHandle } = require('ask-utils')
const { SKILL_NAME } = require('../constans')
module.exports = {
  canHandle (handlerInput) {
    return canHandle(handlerInput, 'IntentRequest', 'AMAZON.YesIntent')
  },
  handle (handlerInput) {
    const speechText = '何について知りたいですか？'

    const reprompt = [
      '香川県のトリビアを教えて',
      'のように話しかけることで都道府県トリビアを知ることができます',
      '何を知りたいですか？'
    ].join('。 ')

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(reprompt)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse()
  }
}
