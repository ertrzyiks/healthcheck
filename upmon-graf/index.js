#!/usr/bin/env node
var graf = require('./graf')

process.stdin.pipe(graf()).pipe(process.stdout)
