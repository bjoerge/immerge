/**
 * Immutable shallow merge of plain JS objects
 * Performs an equality check during merge and if the result of the merge object
 * ends up being shallow equal to the given target, the target is returned instead.
 *
 *  For example:
 * ```
 * const target = {foo: 'bar'}
 * target === merge(target, {foo: 'bar'}) // true
 * ```
 * This will be true because the given target would be shallowly equal to the
 * returned value.
 */

const hasOwn = Object.prototype.hasOwnProperty.call.bind(
  Object.prototype.hasOwnProperty,
)

const isEmpty = (obj: object): boolean => {
  for (const key in obj) {
    if (hasOwn(obj, key)) {
      return false
    }
  }
  return true
}

function mergeIfDifferent<T extends object, U extends object>(
  target: T,
  source: U,
): T & U {
  // note: assumes both target and source are non-empty objects
  const result: any = Array.isArray(target) ? [...target] : { ...target }
  let isDifferent = false
  for (const sourceProp in source) {
    if (hasOwn(source, sourceProp)) {
      const sourceValue = source[sourceProp]
      if (isDifferent || sourceValue !== (target as any)[sourceProp]) {
        isDifferent = true
        result[sourceProp] = sourceValue
      }
    }
  }
  return isDifferent ? result : target
}

function merge<T extends object, U extends object>(
  target: T,
  source: U,
): T & U {
  if (typeof target !== 'object' || target === null) {
    throw new TypeError('Target must be an object')
  }
  const sourceAsObject = Object(source)
  if (target === sourceAsObject) {
    return target as T & U
  }

  if (Array.isArray(target) !== Array.isArray(sourceAsObject)) {
    return mergeIfDifferent(target, sourceAsObject)
  }

  if (isEmpty(sourceAsObject)) {
    return target as T & U
  }

  if (isEmpty(target)) {
    return sourceAsObject
  }
  return mergeIfDifferent(target, sourceAsObject)
}

export function immerge<T, U>(target: T, source1: U): T & U
export function immerge<T, U, V>(target: T, source1: U, source2: V): T & U & V
export function immerge<T, U, V, W>(
  target: T,
  source1: U,
  source2: V,
  source3: W,
): T & U & V & W
export function immerge<T, U, V, W, X>(
  target: T,
  source1: U,
  source2: V,
  source3: W,
  source4: X,
): T & U & V & W & X
export function immerge<T>(target: T): T
export function immerge<R>(target: object, ...sources: any[]): R
export function immerge<R>(target: object, ...sources: any[]): R {
  return sources.reduce(merge, target)
}
