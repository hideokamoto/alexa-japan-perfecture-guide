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
const { SKILL_NAME } = require('../constans')
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
    const repromptText = 'ほかに調べたいことはありますか？'
    speaks.push(repromptText)

    return handlerInput.responseBuilder
      .speak(speaks.join('。'))
      .reprompt(repromptText)
      .withSimpleCard(SKILL_NAME, contents.join('\n'))
      .getResponse()
  }
}
