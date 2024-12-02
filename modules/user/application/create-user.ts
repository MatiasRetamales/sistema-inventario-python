import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidBooleanException } from 'app/modules/shared/domain/exceptions/invalid-boolean-exception'
import { InvalidStringException } from 'app/modules/shared/domain/exceptions/invalid-string-exception'
import { InvalidPasswordException } from 'app/modules/shared/domain/exceptions/password-exception'
import { Password } from 'app/modules/shared/domain/value_objects/password'
import { ValidBool } from 'app/modules/shared/domain/value_objects/valid-bool'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'
import {
  wrapType,
  wrapTypeErrors
} from 'app/modules/shared/utils/wrap-type'
import { User } from 'app/modules/user/domain/user'
import { UserRepository } from 'app/modules/user/domain/user-repository'

export async function createUser( repo: UserRepository, props: {
  password: string,
  name: string,
  surname: string,
  address: string[],
  username: string,
  status: boolean,
} ): Promise<boolean | Errors> {
  const errors: BaseException[] = []

  const name = wrapType<ValidString, InvalidStringException>(
    () => ValidString.from( props.name ) )

  if ( name instanceof BaseException ) {
    errors.push( name )
  }

  const surname = wrapType<ValidString, InvalidStringException>(
    () => ValidString.from( props.surname ) )

  if ( surname instanceof BaseException ) {
    errors.push( surname )
  }

  const address: ValidString[] = []

  for ( const value of props.address ) {
    const addressValue = wrapType<ValidString, InvalidStringException>(
      () => ValidString.from( value ) )

    if ( addressValue instanceof BaseException ) {
      errors.push( addressValue )
    }
    else {
      address.push( addressValue )
    }
  }

  const username = wrapType<ValidString, InvalidStringException>(
    () => ValidString.from( props.username ) )

  if ( username instanceof BaseException ) {
    errors.push( username )
  }

  const status = wrapType<ValidBool, InvalidBooleanException>(
    () => ValidBool.from( props.status ) )

  if ( status instanceof BaseException ) {
    errors.push( status )
  }

  const pw = await wrapTypeErrors<Password, InvalidPasswordException>(
    () => Password.from( props.password ) )

  if ( pw instanceof Errors ) {
    errors.push( ...pw.values )
  }

  if ( errors.length > 0 ) {
    return new Errors( errors )
  }

  const user = new User(
    name as ValidString,
    surname as ValidString,
    address,
    username as ValidString,
    status as ValidBool,
  )

  return await wrapTypeErrors( async () => await repo.create(
    user,
    pw as Password
  ) )
}
