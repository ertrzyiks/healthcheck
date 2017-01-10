var upmonMail = require('./index')
process.stdin.pipe(upmonMail()).pipe(process.stdout)
