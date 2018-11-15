const {
  getSlotByName,
  getRandomMessage
} = require('ask-utils')

const getPrefName = (handlerInput) => {
  const pref = getSlotByName(handlerInput, 'pref')
  const prefName = pref.value
  if (prefName === '北海道') return prefName
  if (/^東京/.test(prefName)) return '東京都'
  if (/^京都/.test(prefName) || /^大阪/.test(prefName)) {
    if (/府$/.test(prefName)) return prefName
    return `${prefName}府`
  }
  if (/県$/.test(prefName)) return prefName
  return `${prefName}県`
}

const getRandomPrefName = () => getRandomMessage([
  '北海道',
  '青森県',
  '秋田県',
  '岩手県',
  '山形県',
  '宮城県',
  '福島県',
  '新潟県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '山梨県',
  '静岡県',
  '長野県',
  '富山県',
  '岐阜県',
  '愛知県',
  '石川県',
  '福井県',
  '滋賀県',
  '三重県',
  '京都府',
  '和歌山県',
  '大阪府',
  '奈良県',
  '兵庫県',
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',
  '香川県',
  '徳島県',
  '高知県',
  '愛媛県',
  '福岡県',
  '熊本県',
  '大分県',
  '佐賀県',
  '長崎県',
  '宮崎県',
  '鹿児島県',
  '沖縄県'
])
const getRandomFactType = (prefName) => {
  if (prefName === '東京都') {
    return getRandomMessage([
      'birthPlace',
      'capital'
    ])
  }
  return getRandomMessage([
    'popRank',
    'areaRank',
    'birthPlace',
    'capital',
    'island'
  ])
}

module.exports = {
  getRandomPrefName,
  getRandomFactType,
  getPrefName
}
