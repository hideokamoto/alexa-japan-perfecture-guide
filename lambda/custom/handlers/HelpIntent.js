const { SKILL_NAME } = require('../constans')
module.exports = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
  },
  handle (handlerInput) {
    const speechText = [
      '香川県のトリビアを教えて',
      'のように話しかけることで都道府県トリビアを知ることができます',
      '何を知りたいですか？'
    ].join('。 ')
    const reprompt = [
      '何を知りたいですか？',
      '香川県のトリビアを教えて',
      'のように話しかけることで都道府県トリビアを知ることができます'
    ].join('。 ')

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(reprompt)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse()
  }
}
