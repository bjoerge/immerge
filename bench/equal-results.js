const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()

const { immerge } = require('../immerge')
const fixture = require('./fixtures/document.json')

const o1 = { ...fixture }
const o2 = { ...fixture }
const o3 = { ...fixture }

// All of these returns a document that shallow equals the target
module.exports = () =>
  suite
    .add('Object.assign', () => {
      Object.assign({}, o1, o2, o3)
    })
    .add('Object spread', () => {
      ;({ ...o1, ...o2, ...o3 })
    })
    .add('immerge', () => {
      immerge(o1, o2, o3)
    })
