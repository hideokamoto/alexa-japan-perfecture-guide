class SparqlClient {
  constructor (endpoint = 'http://dbpedia.org/sparql', SparqlHttp = require('sparql-http-client'), fetch = require('isomorphic-fetch')) {
    this.endpoint = endpoint
    SparqlHttp.fetch = fetch
    this.client = new SparqlHttp({ endpointUrl: endpoint })
  }
  setQuery (query) {
    this.query = query.replace('東京都', '東京府')
  }
  getQuery () {
    return this.query
  }
  execQuery () {
    const query = this.getQuery()
    console.log(`Query: ${query}`)
    return new Promise((resolve, reject) => {
      this.client.selectQuery(query)
        .then(res => res.text())
        .then(body => {
          console.log('Response: %j', body)
          const { results } = JSON.parse(body)
          return resolve(results)
        }).catch(err => reject(err))
    })
  }
  async get () {
    const { bindings } = await this.execQuery()
    return bindings
  }
}
module.exports = SparqlClient
