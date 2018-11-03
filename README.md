# Immerge

Immutable shallow merge of plain JavaScript objects, maintaining referential equality when possible.

Using `Object.assign` or the object spread syntax to shallowly merge JavaScript objects will always return new objects with properties copied over. This breaks referential equality even if the result ends up being shallowly equal to either the given target or one of its source objects.

Immerge instead performs an equality check during merge and if the result of the merge operation ends up being shallowly equal to the given target or any of the given sources, the identical target or source value is returned instead.

## Usage
```js
import {immerge} from '@bjoerge/immerge'

immerge({ foo: 'bar' }, { bar: 'baz' }, {baz: 'qux'})
// => {foo: 'bar', bar: 'baz', baz: 'qux'}
```

Alternatively, using or CommonJS `require`:
```js
const {immerge} = require('@bjoerge/immerge')

immerge({ foo: 'bar' }, { bar: 'baz' }, {baz: 'qux'})
// => {foo: 'bar', bar: 'baz', baz: 'qux'}
```

## Examples:

```js
const target = { foo: 'bar' }
const source = { foo: 'bar' }
const result = immerge(target, source)

result === target
// => true (because the given target is shallowly equal to the result of the merge operation)
```

```js
const target = { foo: 'foo' }
const source = { foo: 'foo', bar: 'bar' }
const result = immerge(target, source)

result === source
// => true (because the given *source* is shallowly equal to the result of the merge operation)
```

```js
const target = { foo: 'notfoo', bar: 'bar' }
const source = { foo: 'foo' }
const result = immerge(target, source)

result !== source && result !== target
// => true (because neither the given source nor the given target is shallowly equal to the result 
//          of the merge operation) 
```

```js
const target = { foo: 'notfoo', bar: 'bar' }
const source1 = { foo: 'foo' }
const source2 = { foo: 'foo', bar: 'bar' }

const result = immerge(target, source1, source2)

result === source2
// => true (because source2 is shallowly equal to the result of the merge operation)
```
