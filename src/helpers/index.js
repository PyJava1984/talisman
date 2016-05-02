/**
 * Talisman helpers
 * =================
 *
 * Miscellaneous helper functions.
 */

/**
 * Function normalizing the given variable into a proper array sequence.
 *
 * @param  {mixed} target - The variable to normalize as a sequence.
 * @return {array}        - The resulting sequence.
 */
export function seq(target) {
  return typeof target === 'string' ? target.split('') : target;
}

/**
 * Function squeezing the given sequence by dropping consecutive duplicates.
 *
 * Note: the name was actually chosen to mimic Ruby's naming since I did not
 * find any equivalent in other standard libraries.
 *
 * @param  {mixed} target - The sequence to squeeze.
 * @return {array}        - The resulting sequence.
 */
export function squeeze(target) {
  const isString = typeof target === 'string',
        sequence = seq(target),
        squeezed = [];

  for (let i = 0, l = sequence.length, memo = null; i < l; i++) {
    if (sequence[i] !== memo) {
      memo = sequence[i];
      squeezed.push(memo);
    }
  }

  return isString ? squeezed.join('') : squeezed;
}

/**
 * Function creating an index of mapped letters.
 *
 * @param  {string} first  - First letters.
 * @param  {string} second - Second letters.
 * @return {object}        - The resulting index.
 */
export function translation(first, second) {
  const index = {};

  first = first.split('');
  second = second.split('');

  if (first.length !== second.length)
    throw Error('talisman/helpers#translation: given strings don\'t have the same length.');

  for (let i = 0, l = first.length; i < l; i++)
    index[first[i]] = second[i];

  return index;
}

/**
 * Function taking a length and a list of weights and aiming at
 * returning a random weighted index.
 *
 * @param {array}  weights - List of weights (must sum to 1).
 * @param {number}         - The random weighted index.
 */
export function weightedRandomIndex(weights) {
  const target = Math.random(),
        length = weights.length;

  let sum = 0;

  for (let i = 0; i < length; i++) {
    sum += weights[i];

    if (target <= sum)
      return i;
  }

  return length - 1;
}
