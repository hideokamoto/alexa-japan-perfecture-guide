const SparqlClient = require('./client')

/**
 * @example
 * // JP
 * const c = new PrefCapital()
 * .getHintByPerfName('大阪府')
 * .then(t => console.log(t))
 * // { speaks: [ 'この都道府県の県庁所在地は次の都市です。', '大阪市' ],
 * //   contents: [ '都道府県の県庁所在地', '大阪市' ] }
 * @example
 * // US
 * const d = new PrefCapital('en-US')
 * .getHintByPerfName('大阪府')
 * .then(t => console.log(t))
 * // { speaks: [ 'This is the capital city of the prefecture.', 'Osaka' ],
 * //   contents: [ 'The capital city of the prefecture', 'Osaka' ] }
 */
class PrefCapital extends SparqlClient {
  constructor (lang = 'ja-JP') {
    super()
    this.lang = lang
  }
  buildQuery (prefName) {
    const q = `
PREFIX dcterms:<http://purl.org/dc/terms/>
PREFIX dbo: <http://dbpedia.org/ontology/>
SELECT DISTINCT ?capitalName ?enCapitalName
FROM <http://dbpedia.org>
WHERE {
  ?link dcterms:subject  <http://dbpedia.org/resource/Category:Prefectures_of_Japan>;
        dbo:capital ?capital;
        rdfs:label '${prefName}'@ja.
  ?capital rdfs:label ?capitalName;
           rdfs:label ?enCapitalName.
  FILTER (LANG(?capitalName)='ja' && LANG(?enCapitalName)='en')
}
`
    this.setQuery(q)
  }
  async getHintByPerfName (prefName) {
    this.buildQuery(prefName)
    const items = await this.get()
    if (!items || items.length < 1) return {}
    const item = items[0]
    const key = this.lang === 'ja-JP' ? 'capitalName' : 'enCapitalName'
    if (!item[key] || !item[key].value) return {}
    const name = item[key].value
    const speaks = this.lang === 'ja-JP' ? [
      `${prefName}の県庁所在地は次の都市です。`
    ] : [
      `This is the capital city of the ${prefName}. `
    ]
    speaks.push(name)
    const contents = this.lang === 'ja-JP' ? [
      `${prefName}の県庁所在地`
    ] : [
      `The capital city of the ${prefName}. `
    ]
    contents.push(name)
    return {
      speaks,
      contents
    }
  }
}

module.exports = PrefCapital
