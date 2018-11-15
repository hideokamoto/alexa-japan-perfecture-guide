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
const { SKILL_NAME, LICENSE } = require('../constans')
module.exports = {
  canHandle (handlerInput) {
    return canHandle(handlerInput, 'IntentRequest', 'TriviaIntent')
  },
  async handle (handlerInput) {
    const prefName = getPrefName(handlerInput)
    const randomFact = getRandomFactType(prefName)
    const {
      speaks,
      contents
    } = await getDBPediaContent(prefName, randomFact)
    const repromptText = 'ほかに調べたいことはありますか？'
    speaks.push(repromptText)
    contents.push('')
    contents.push(LICENSE)

    return handlerInput.responseBuilder
      .speak(speaks.join('。'))
      .reprompt(repromptText)
      .withSimpleCard(SKILL_NAME, contents.join('\n'))
      .getResponse()
  }
}
