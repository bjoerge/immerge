const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()

const { immerge } = require('../immerge')
const o1 = { a: 1 }
const o2 = { b: 2 }
const o3 = { c: 3 }

module.exports = () =>
  suite
    .add('Object.assign', () => {
      Object.assign({}, o1, o2, o3)
    })
    .add('Spread syntax', () => {
      ;({ ...o1, ...o2, ...o3 })
    })
    .add('immerge', () => {
      immerge(o1, o2, o3)
    })
