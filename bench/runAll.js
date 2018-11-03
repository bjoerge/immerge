const suites = [
  './equal-results',
  './small-objects',
  './larger-objects',
]

let pending = suites.slice()
const runNext = () => {
  const [nextSuite, ...remaining] = pending
  if (!nextSuite) {
    console.log()
    console.log('all done')
    return
  }
  pending = remaining
  console.log('Running %s', nextSuite)
  require(nextSuite)()
    .on('cycle', event => {
      console.log(String(event.target))
    })
    .on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').map('name'))
    })
    .on('complete', () => {
      console.log('Completed %s', nextSuite)
      console.log()
      runNext()
    })
    .run({ async: true })
}

runNext()
