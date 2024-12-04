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
import { UserResponse } from 'app/modules/user/domain/user-response'

export async function findAllUsers( repo: UserRepository,
  from: number,
  limit: number
): Promise<UserResponse[] | Errors> {
  const errors: BaseException[] = []

  const fromValue = wrapType<ValidInteger, InvalidUUIDException>(
    () => ValidInteger.from( from ) )

  if ( fromValue instanceof BaseException ) {
    errors.push( fromValue )
  }

  const limitValue = wrapType<ValidInteger, InvalidUUIDException>(
    () => ValidInteger.from( limit ) )

  if ( limitValue instanceof BaseException ) {
    errors.push( limitValue )
  }

  if ( errors.length > 0 ) {
    return new Errors( errors )
  }

  return wrapTypeErrors(
    async () => await repo.findAll(
      fromValue as ValidInteger,
      limitValue as ValidInteger
    ) )
}
