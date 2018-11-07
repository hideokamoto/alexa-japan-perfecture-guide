const {
  getSlotByName,
  getResolutionSlot
} = require('ask-utils')
const getSlotWithinSynonyms = (handlerInput, type) => {
  const { name } = getResolutionSlot(getSlotByName(handlerInput, type))
  return name
}
module.exports = {
  getSlotWithinSynonyms
}
