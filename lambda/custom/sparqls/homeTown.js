const shuffle = require('fisher-yates-shuffle')
const SparqlClient = require('./client')

const { reverseEnName } = require('./utils')
/**
 * @example
 * // JP
 * const c = new  PrefHomeTown()
 * .getHintByPerfName('大阪府')
 * .then(t => console.log(t))
 * // { speaks: [ 'この地域出身の人物には次の人たちがいます。', 'Yamada Nana', 'Tanaka Kohei' ],
 * //  contents: [ 'この地域出身の人物', '山田菜々', '田中公平' ] }
 * @example
 * // US
 * const d = new  PrefHomeTown('en-US')
 * .getHintByPerfName('大阪府')
 * .then(t => console.log(t))
 * // { speaks:
 * //   [ 'These people\'s hometown is this prefecture.',
 * //     'Shu Yabushita',
 * //     'Ego-Wrappin\'' ],
 * //  contents: [ 'These people\'s hometown', 'Shu Yabushita', 'Ego-Wrappin\'' ] }
 */
class PrefHomeTown extends SparqlClient {
  constructor (lang = 'ja-JP') {
    super()
    this.lang = lang
  }
  buildQuery (prefName) {
    const q = `
PREFIX dcterms:<http://purl.org/dc/terms/>
PREFIX dbo: <http://dbpedia.org/ontology/>
SELECT DISTINCT ?name ?en_name
FROM <http://dbpedia.org>
WHERE {
  ?link dcterms:subject  <http://dbpedia.org/resource/Category:Prefectures_of_Japan>;
  rdfs:label '${prefName}'@ja.
  OPTIONAL {
   ?home dbo:hometown ?link;
   rdfs:label ?en_name;
   rdfs:label ?name.
   FILTER (LANG(?name)='ja' && LANG(?en_name)='en')
  }
}
`
    this.setQuery(q)
  }
  async getHintByPerfName (prefName) {
    this.buildQuery(prefName)
    const data = await this.get()
    const items = shuffle(data)
    if (!items || items.length < 1) return {}
    items.splice(2)
    let speaks = this.lang === 'ja-JP' ? [
      'この地域をホームタウンにする人物には、次の人たちがいます。'
    ] : [
      "These people's hometown is this prefecture."
    ]
    let contents = this.lang === 'ja-JP' ? [
      'この地域をホームタウンにする人物'
    ] : [
      "These people's hometown"
    ]
    items.forEach(item => {
      const spokenName = this.lang === 'ja-JP' ? reverseEnName(item.en_name.value, item.name.value) : item.en_name.value
      speaks.push(spokenName)
      contents.push(this.lang === 'ja-JP' ? item.name.value : item.en_name.value)
    })
    return {
      speaks,
      contents
    }
  }
}

module.exports = PrefHomeTown
