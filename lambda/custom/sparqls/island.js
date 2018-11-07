const SparqlClient = require('./client')

/**
 * @example
 * // JP
 * const c = new Island()
 * .getHintByPerfName('大阪府')
 * .then(t => console.log(t))
 * // { speaks: [ 'この都道府県は本州にあります。' ],
 * //   contents: [ '都道府県のある島', '本州' ] }
 * @example
 * // US
 * const d = new Island('en-US')
 * .getHintByPerfName('大阪府')
 * .then(t => console.log(t))
 * // { speaks: [ 'The prefecture is in Honshu island.' ],
 * //   contents: [ 'The prefecture is in Honshu island.' ] }
 */
class Island extends SparqlClient {
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
        dbp:island ?island;
        rdfs:label '${prefName}'@ja.
  ?island rdfs:label ?name;
          rdfs:label ?en_name.
  FILTER (LANG(?name)='ja' && LANG(?en_name)='en')
}
`
    this.setQuery(q)
  }
  async getHintByPerfName (prefName) {
    this.buildQuery(prefName)
    const items = await this.get()
    if (!items || items.length < 1) return {}
    const item = items[0]
    const key = this.lang === 'ja-JP' ? 'name' : 'en_name'
    if (!item[key] || !item[key].value) return {}
    const islandName = item[key].value
    const speaks = this.lang === 'ja-JP' ? [
      `${prefName}は${islandName}にあります。`
    ] : [
      `The ${prefName} prefecture is in ${islandName} island.`
    ]
    const contents = this.lang === 'ja-JP' ? [
      '都道府県のある島',
      `${islandName}`
    ] : [
      `The prefecture is in ${islandName} island.`
    ]
    return {
      speaks,
      contents
    }
  }
}

module.exports = Island
