/**
 * Definire l'istanza di `Monad` per `type TaskEither<E, A> = Task<Either<E, A>>`
 */
import * as T from 'fp-ts/Task'
import * as E from 'fp-ts/Either'
import { Monad2 } from 'fp-ts/Monad'
import { URI } from 'fp-ts/TaskEither'

const Monad: Monad2<URI> = {
  map: null as any,
  of: null as any,
  chain: null as any
}

// ------------------------------------
// tests
// ------------------------------------

import * as assert from 'assert'
import { pipe } from 'fp-ts/function'

async function test() {
  assert.deepStrictEqual(
    await pipe(
      Monad.of(1),
      Monad.map((n: number) => n * 2)
    )(),
    E.right(2)
  )
  assert.deepStrictEqual(
    await pipe(
      Monad.of(1),
      Monad.chain((n: number) =>
        n > 0 ? Monad.of(n * 2) : T.of(E.left('error'))
      )
    )(),
    E.right(2)
  )
  assert.deepStrictEqual(
    await pipe(
      Monad.of(-1),
      Monad.chain((n: number) =>
        n > 0 ? Monad.of(n * 2) : T.of(E.left('error'))
      )
    )(),
    E.left('error')
  )
}

test()
