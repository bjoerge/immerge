import { immerge } from '../immerge'

test('copies properties from source to target', () => {
  expect(immerge({ foo: 'bar' }, { baz: 'qux' })).toEqual({
    foo: 'bar',
    baz: 'qux',
  })
})

test('does not mutate target', () => {
  const target = { foo: 'bar' }
  expect(target).not.toBe(immerge(target, { baz: 'qux' }))
  expect(target).toEqual({
    foo: 'bar',
  })
})

test('returns the source object if target is empty', () => {
  const source = { foo: 'bar' }
  const res = immerge({}, source)
  expect(res).toBe(source)
})

test('returns the target object if source is empty', () => {
  const target = { foo: 'bar' }
  const res = immerge(target, {})
  expect(res).toBe(target)
})

test('returns target if both are empty', () => {
  const target = {}
  const source = {}
  expect(immerge(target, source)).toBe(target)
})

test('returns target object if source and target is shallow equal', () => {
  const target = { foo: 'bar' }
  const source = { foo: 'bar' }
  const res = immerge(target, source)
  expect(res).toBe(target)
})

test('undefined/null as target', () => {
  expect(() => immerge(undefined, { foo: 'bar' })).toThrow(
    'Target must be an object',
  )
  expect(() => immerge(null, { foo: 'bar' })).toThrow('Target must be an object')
})

test('non-objects as target', () => {
  // @ts-ignore
  expect(() => immerge('foo', { foo: 'bar' })).toThrow('Target must be an object')
  // @ts-ignore
  expect(() => immerge(11, { foo: 'bar' })).toThrow('Target must be an object')
})

test('null/undefined as source', () => {
  const target = { foo: 'bar' }
  expect(immerge(target, null)).toEqual(target)
  expect(immerge(target, undefined)).toEqual(target)
})

test('non-objects as source', () => {
  const target = { foo: 'bar' }
  // @ts-ignore
  expect(immerge(target, 'foo')).toEqual({
    '0': 'f',
    '1': 'o',
    '2': 'o',
    foo: 'bar',
  })
  // @ts-ignore
  expect(immerge(target, 22)).toEqual(target)
})

test('arrays keeps object identity of first non-empty', () => {
  const target = [1, 2, 3]
  expect(immerge(target, [1, 2, 3])).toBe(target)
  expect(immerge(target, { 0: 1, 1: 2, 2: 3 })).toBe(target)
})

test('arrays: returns array if first parameter is array', () => {
  const empty = []
  expect(immerge(empty, [1, 2, 3])).toEqual([1, 2, 3])
  expect(immerge([], { 0: 1, 1: 2, 2: 3 })).toEqual([1, 2, 3])
  expect(immerge(empty, {})).toEqual([])
  expect(immerge(empty, {})).toBe(empty)
  expect(empty).toEqual([])
})

test('arrays: returns array if first parameter is empty and second is not', () => {
  expect(immerge({}, [1, 2])).toEqual({0: 1, 1: 2})
})

test('mergeAll: returns the only non-empty object', () => {
  const nonempty = { foo: 'bar' }
  const objects = [{}, {}, nonempty, {}]
  expect(immerge({}, ...objects)).toBe(nonempty)
  expect(immerge(nonempty, nonempty, nonempty)).toBe(nonempty)
  expect(immerge(nonempty, ...objects)).toBe(nonempty)
})
