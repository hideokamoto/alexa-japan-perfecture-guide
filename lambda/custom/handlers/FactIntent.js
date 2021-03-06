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
const { SKILL_NAME, LICENSE } = require('../constans')
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
    const repromptText = 'ほかに調べたいことはありますか？'
    if (!speaks || speaks.length < 1 || !contents || contents.length < 1) {
      return handlerInput.responseBuilder
        .speak([
          'すみません。そのコンテンツについて、DB Pediaから情報を取得することができませんでした。',
          repromptText
        ].join(''))
        .reprompt(repromptText)
        .getResponse()
    }
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
