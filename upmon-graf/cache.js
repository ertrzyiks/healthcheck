var Cache = function (bufferSize) {
  var buffer = []

  return {
    onEachValue: function (cb) {
      buffer.forEach(function (value) {
        cb(value)
      })
    },
    push: function (el) {
      buffer.push(el)

      if (buffer.length > bufferSize) {
        buffer.shift()
      }
    }
  }
}

module.exports = Cache
