import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidStringException } from 'app/modules/shared/domain/exceptions/invalid-string-exception'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'
import {
  wrapType,
  wrapTypeErrors
} from 'app/modules/shared/utils/wrap-type'
import { UserRepository } from 'app/modules/user/domain/user-repository'

export async function loginUser( repo: UserRepository,
  username: string, password: string ): Promise<boolean | Errors> {
  const errors: BaseException[] = []

  const name = wrapType<ValidString, InvalidStringException>(
    () => ValidString.from( username ) )

  if ( name instanceof BaseException ) {
    errors.push( name )
  }

  const pw = wrapType<ValidString, InvalidStringException>(
    () => ValidString.from( password ) )

  if ( pw instanceof BaseException ) {
    errors.push( pw )
  }

  if ( errors.length > 0 ) {
    return new Errors( errors )
  }

  return await wrapTypeErrors( async () => await repo.login(
    name as ValidString, pw as ValidString
  ) )
}
