const { SKILL_NAME } = require('../constans')
module.exports = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  },
  handle (handlerInput) {
    const speechText = [
      `${SKILL_NAME}へようこそ`,
      '香川県のトリビアを教えて',
      'のように話しかけることで都道府県トリビアを知ることができます',
      '何を知りたいですか？'
    ].join('。 ')
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
