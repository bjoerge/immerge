const Benchmark = require('benchmark')
const suite = new Benchmark.Suite()

const { immerge } = require('../immerge')
const fixture = require('./fixtures/document')

// All of these returns a document that shallow equals the target
module.exports = () =>
  suite
    .add('Object.assign', () => {
      Object.assign({}, ...fixture.members)
    })
    .add('Object spread', () => {
      ;({ ...fixture.members[0], ...fixture.members[1], ...fixture.members[2] })
    })
    .add('immerge', () => {
      immerge(...fixture.members)
    })
