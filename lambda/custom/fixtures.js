const {
  getSlotByName,
  getResolutionSlot,
  getRandomMessage
} = require('ask-utils')
/**
 * Get slot value by slot name with synonyms
 * @param {Object} handlerInput from ask-sdk
 * @param {string} type slot name
 */
const getSlotWithinSynonyms = (handlerInput, type) => {
  const { name } = getResolutionSlot(getSlotByName(handlerInput, type))
  return name
}

class SpeechconContent {
  constructor (lang = 'ja-JP') {
    this.lang = lang
  }
  getGoodByeMessage () {
    const speechText = getRandomMessage([
      'さようなら',
      'それでは',
      'have a nice day',
      'よい一日を',
      'またいつでもどうぞ',
      'よい一日を',
      'またいつでもどうぞ',
      'よい一日を',
      'またいつでもどうぞ'
    ])

    return `<say-as interpret-as="interjection">${speechText}</say-as>`
  }
}

module.exports = {
  getSlotWithinSynonyms,
  SpeechconContent
}
