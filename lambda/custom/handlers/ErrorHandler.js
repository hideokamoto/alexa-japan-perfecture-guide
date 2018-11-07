module.exports = {
  canHandle () {
    return true
  },
  handle (handlerInput, error) {
    console.log(`Error handled: ${error.message}`)
    const speechText = 'すみません。うまく聞き取ることができませんでした。もう一度お願いします。'
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse()
  }
}
