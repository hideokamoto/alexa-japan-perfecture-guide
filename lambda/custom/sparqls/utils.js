const reverseEnName = (enName, jpName) => {
  if (jpName[0] === enName[0]) return enName
  const en = enName.split(' ')
  return `${en[1] || ''} ${en[0]}`
}

module.exports = {
  reverseEnName
}
