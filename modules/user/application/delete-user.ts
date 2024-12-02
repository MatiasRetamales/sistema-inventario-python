import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidUUIDException } from 'app/modules/shared/domain/exceptions/invalid-uuid-exception'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import {
  wrapType,
  wrapTypeErrors
} from 'app/modules/shared/utils/wrap-type'
import { UserRepository } from 'app/modules/user/domain/user-repository'

export async function deleteUser( repo: UserRepository,
  currentId: number ): Promise<boolean | Errors> {
  const id = wrapType<ValidInteger, InvalidUUIDException>(
    () => ValidInteger.from( currentId ) )

  if ( id instanceof BaseException ) {
    return new Errors( [ id ] )
  }

  return await wrapTypeErrors( async () => await repo.delete( id as ValidInteger ) )
}
