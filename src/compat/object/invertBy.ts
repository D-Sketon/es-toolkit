import { identity } from '../../function/identity.ts';
import { isNil } from '../../predicate/isNil.ts';

/**
 * Creates a new object that reverses the keys and values of the given object, similar to the invert.
 *
 * The `iteratee` function specifies how the values are reversed into keys. If no `iteratee` function is provided, the values are used as keys as-is.
 *
 * The values of the new object are arrays of keys that correspond to the value returned by the `iteratee` function.
 *
 * @param {Record<K, V>} object - The object to iterate over.
 * @param {(value: V) => string} [iteratee] - Optional. A function that generates a key based on each value in the object.
 * If not provided, the function defaults to using the value as a string.
 *
 * @returns {Record<string, K[]>} An object where the keys are generated by the iteratee, and the values
 * are arrays of property names (keys) from the input object that correspond to those keys.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 1 };
 * const result = invertBy(obj);
 * // result => { '1': ['a', 'c'], '2': ['b'] }
 *
 * @example
 * const obj = { a: 1, b: 2, c: 1 };
 * const result = invertBy(obj, value => `group${value}`);
 * // result => { 'group1': ['a', 'c'], 'group2': ['b'] }
 */
export function invertBy<K extends PropertyKey, V>(
  object: Record<K, V>,
  iteratee?: (value: V) => string
): Record<string, K[]> {
  const result = {} as Record<string, K[]>;

  if (isNil(object)) {
    return result;
  }

  if (iteratee == null) {
    iteratee = identity as (value: V) => string;
  }

  const keys = Object.keys(object);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i] as K;

    const value = object[key];
    const valueStr = iteratee(value);

    if (Array.isArray(result[valueStr])) {
      result[valueStr].push(key);
    } else {
      result[valueStr] = [key];
    }
  }

  return result;
}
