import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidIntegerException } from 'app/modules/shared/domain/exceptions/invalid-integer-exception'
import { InvalidStringException } from 'app/modules/shared/domain/exceptions/invalid-string-exception'
import { ValidBool } from 'app/modules/shared/domain/value_objects/valid-bool'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'
import {
  wrapTypeDefault,
  wrapTypeErrors
} from 'app/modules/shared/utils/wrap-type'
import { User } from 'app/modules/user/domain/user'
import { UserRepository } from 'app/modules/user/domain/user-repository'
import { UserResponse } from 'app/modules/user/domain/user-response'

export async function updateUser( repo: UserRepository,
  oldUser: UserResponse,
  newUser: {
    name?: string,
    surname?: string,
    address?: string[],
    username?: string,
    status?: boolean,
  } ): Promise<boolean | Errors> {
  const errors: BaseException[] = []

  const name = wrapTypeDefault<ValidString, string, InvalidStringException>(
    oldUser.name, ( value ) => ValidString.from( value ),
    newUser.name )

  if ( name instanceof BaseException ) {
    errors.push( name )
  }

  const surname = wrapTypeDefault<ValidString, string, InvalidStringException>(
    oldUser.surname, ( value ) => ValidString.from( value ),
    newUser.surname )

  if ( surname instanceof BaseException ) {
    errors.push( surname )
  }

  const address : ValidString[] = []

  if ( newUser.address instanceof Array ) {
    for ( const value of newUser.address ) {
      const addressValue = wrapTypeDefault<ValidString, string, InvalidStringException>(
        ValidString.from( value ), ( value ) => ValidString.from( value ),
        value )

      if ( addressValue instanceof BaseException ) {
        errors.push( addressValue )
      } else {
        address.push( addressValue )
      }
    }
  }

  const username = wrapTypeDefault<ValidString, string, InvalidStringException>(
    oldUser.username, ( value ) => ValidString.from( value ),
    newUser.username )

  if ( username instanceof BaseException ) {
    errors.push( username )
  }

  const status = wrapTypeDefault<ValidBool, boolean, InvalidIntegerException>(
    oldUser.status, ( value ) => ValidBool.from( value ),
    newUser.status )

  if ( status instanceof BaseException ) {
    errors.push( status )
  }

  if ( errors.length > 0 ) {
    return new Errors( errors )
  }

  const user = new User(
    name as ValidString,
    surname as ValidString,
    address,
    username as ValidString,
    status as ValidBool
  )

  return await wrapTypeErrors( async () => await repo.update(user) )
}
