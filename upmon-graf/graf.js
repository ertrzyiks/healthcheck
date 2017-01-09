var http = require('http')
var config = require('rc')('upmon', {
  graf: {
    port: process.env.PORT || 5000
  }
})
var shoe = require('shoe')
var ecstatic = require('ecstatic')(__dirname + '/../node_modules/upmon-graf/client')
var through = require('through2')
var xtend = require('xtend')

var Cache = require('./cache')

module.exports = function (opts) {
  opts = xtend(config.graf, opts)

  var cache = Cache(opts.bufferSize || 50)
  var server = http.createServer(ecstatic).listen(opts.port)
  var ts = through(function (chunk, enc, callback) {
    if (chunk.toString() === 'replay') {
      cache.onEachValue(this.push.bind(this))
    } else {
      cache.push(chunk)
      this.push(chunk)
    }
    callback()
  })

  var sock = shoe(function (stream) {
    ts.pipe(stream)
    ts.write('replay')
  })

  sock.install(server, '/sock')

  return ts
}

