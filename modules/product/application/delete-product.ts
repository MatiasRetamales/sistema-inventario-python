import { ProductRepository } from 'app/modules/product/domain/product-repository'
import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidIntegerException } from 'app/modules/shared/domain/exceptions/invalid-integer-exception'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import {
  wrapType,
  wrapTypeErrors
} from 'app/modules/shared/utils/wrap-type'

export async function deleteProduct( repo: ProductRepository,
  currentId: number ): Promise<boolean | Errors> {
  const id = wrapType<ValidInteger, InvalidIntegerException>(
    () => ValidInteger.from( currentId ) )

  if ( id instanceof BaseException ) {
    return new Errors( [ id ] )
  }

  return await wrapTypeErrors( async () => await repo.delete( id as ValidInteger ) )
}
