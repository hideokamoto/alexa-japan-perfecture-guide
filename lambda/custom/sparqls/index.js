
const getDBPediaContent = async (prefName, factType) => {
  const FactClass = getFactClass(factType)
  const worker = new FactClass()
  return worker.getHintByPerfName(prefName)
}
const getFactClass = factType => {
  switch (factType) {
    case 'popRank':
      return require('./popRank')
    case 'areaRank':
      return require('./areaRank')
    case 'birthPlace':
      return require('./birthPlace')
    case 'capital':
      return require('./capital')
    case 'island':
      return require('./island')
    default:
      throw new Error('invalid fact type')
  }
}

module.exports = {
  getFactClass,
  getDBPediaContent
}
