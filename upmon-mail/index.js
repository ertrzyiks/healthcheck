var upmonMail = require('./observe')
process.stdin.pipe(upmonMail()).pipe(process.stdout)
