/**
 * Definire una istanza di `Monoid` per `Option`
 */
import { Semigroup } from 'fp-ts/Semigroup'
import * as O from 'fp-ts/Option'
import { Monoid, concatAll } from 'fp-ts/Monoid'
import * as N from 'fp-ts/number'

declare const getMonoid: <A>(S: Semigroup<A>) => Monoid<O.Option<A>>

// ------------------------------------
// tests
// ------------------------------------

import * as assert from 'assert'
import { pipe } from 'fp-ts/function'

const M = getMonoid(N.SemigroupSum)

assert.deepStrictEqual(pipe(O.none, M.concat(O.none)), O.none)
assert.deepStrictEqual(pipe(O.some(1), M.concat(O.none)), O.some(1))
assert.deepStrictEqual(pipe(O.none, M.concat(O.some(2))), O.some(2))
assert.deepStrictEqual(pipe(O.some(1), M.concat(O.some(2))), O.some(3))
assert.deepStrictEqual(pipe(O.some(1), M.concat(M.empty)), O.some(1))
assert.deepStrictEqual(pipe(M.empty, M.concat(O.some(2))), O.some(2))

assert.deepStrictEqual(
  concatAll(M)([O.some(1), O.some(2), O.none, O.some(3)]),
  O.some(6)
)
