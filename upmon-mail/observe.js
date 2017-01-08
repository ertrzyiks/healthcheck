var xtend = require('xtend')
var config = require('rc')('upmon')
var ndjson = require('ndjson')
var combine = require('stream-combiner2')
var mail = require('./mail')

config.mail = config.mail || {}

module.exports = function (opts) {
  opts = opts || {}
  return combine(
    ndjson.parse(),
    mail(xtend(config.mail, opts)),
    ndjson.stringify()
  )
}
