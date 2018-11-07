const SparqlClient = require('./client')

/**
 * @example
 * // JP
 * const c = new Poprank()
 * .getHintByPerfName('大阪府')
 * .then(t => console.log(t))
 * // { speaks: [ 'The area rank is 46.' ],
 * //   contents: [ 'The area rank is 46.' ] }
 * @example
 * // US
 * const d = new Poprank('en-US')
 * .getHintByPerfName('大阪府')
 * .then(t => console.log(t))
 * // { speaks: [ 'この都道府県の面積は、全国で46位です。'],
 * //   contents: [ '都道府県面積のランキング', '46位' ] }
 */
class Poprank extends SparqlClient {
  constructor (lang = 'ja-JP') {
    super()
    this.lang = lang
  }
  buildQuery (prefName) {
    const q = `
PREFIX dcterms:<http://purl.org/dc/terms/>
PREFIX dbo: <http://dbpedia.org/ontology/>
SELECT DISTINCT ?poprank
FROM <http://dbpedia.org>
WHERE {
  ?link dcterms:subject  <http://dbpedia.org/resource/Category:Prefectures_of_Japan>;
        dbp:poprank ?poprank;
        rdfs:label '${prefName}'@ja.
}
`
    this.setQuery(q)
  }
  async getHintByPerfName (prefName) {
    this.buildQuery(prefName)
    const items = await this.get()
    if (!items || items.length < 1) return {}
    const item = items[0]
    const key = 'poprank'
    if (!item[key] || !item[key].value) return {}
    const value = item[key].value.split('.')
    const rank = value[0]
    const speaks = this.lang === 'ja-JP' ? [
      `${prefName}の人口は、全国で${rank}位です。`
    ] : [
      `In the ${prefName} prefecture, the population rank is ${rank}.`
    ]
    const contents = this.lang === 'ja-JP' ? [
      '都道府県人口のランキング',
      `${rank}位`
    ] : [
      `The population rank is ${rank}.`
    ]
    return {
      speaks,
      contents
    }
  }
}

module.exports = Poprank
