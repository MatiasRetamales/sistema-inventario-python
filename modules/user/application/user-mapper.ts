import { MovementResponse } from 'app/modules/movements/domain/movement-response'
import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidIntegerException } from 'app/modules/shared/domain/exceptions/invalid-integer-exception'
import { InvalidStringException } from 'app/modules/shared/domain/exceptions/invalid-string-exception'
import { ValidBool } from 'app/modules/shared/domain/value_objects/valid-bool'
import { ValidDate } from 'app/modules/shared/domain/value_objects/valid-date'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'
import {
  dateFromUTC,
  dateToUTC
} from 'app/modules/shared/utils/parse-date'
import { wrapType } from 'app/modules/shared/utils/wrap-type'
import { UserResponse } from 'app/modules/user/domain/user-response'

export function userToJson( user: UserResponse ): Record<string, any> {
  return {
    id        : user.id.value,
    name      : user.name.value,
    surname   : user.surname.value,
    address   : user.address.map( address => address.value ),
    username  : user.username.value,
    status    : user.status.value,
    created_at: dateToUTC( user.createdAt.value ),
    updated_at: dateToUTC( user.updatedAt.value )
  }
}

export function userFromJson( json: Record<string, any> ): UserResponse | Errors {
  const errors: BaseException[] = []

  const id = wrapType<ValidInteger, InvalidIntegerException>(
    () => ValidInteger.from( json.id ) )

  if ( id instanceof BaseException ) {
    errors.push( id )
  }

  const name = wrapType<ValidString, InvalidStringException>(
    () => ValidString.from( json.name ) )

  if ( name instanceof BaseException ) {
    errors.push( name )
  }

  const surname = wrapType<ValidString, InvalidStringException>(
    () => ValidString.from( json.surname ) )

  if ( surname instanceof BaseException ) {
    errors.push( surname )
  }

  const address : ValidString[] = []

  if ( json.address instanceof Array ) {
    for ( const value of json.address ) {
      const addressValue = wrapType<ValidString, InvalidStringException>(
        () => ValidString.from( value ) )

      if ( addressValue instanceof BaseException ) {
        errors.push( addressValue )
      } else {
        address.push( addressValue )
      }
    }
  }


  const username = wrapType<ValidString, InvalidStringException>(
    () => ValidString.from( json.username ) )

  if ( username instanceof BaseException ) {
    errors.push( username )
  }

  const status = wrapType<ValidBool, InvalidStringException>(
    () => ValidBool.from( json.status ) )

  if ( status instanceof BaseException ) {
    errors.push( status )
  }

  const createdAt = wrapType<ValidDate, InvalidStringException>(
    () => ValidDate.from( dateFromUTC(json.created_at) ) )

  if ( createdAt instanceof BaseException ) {
    errors.push( createdAt )
  }

  const updatedAt = wrapType<ValidDate, InvalidStringException>(
    () => ValidDate.from( dateFromUTC(json.updated_at) ) )

  if ( updatedAt instanceof BaseException ) {
    errors.push( updatedAt )
  }

  if ( errors.length > 0 ) {
    return new Errors( errors )
  }

  return {
    id       : id as ValidInteger,
    label    : name as ValidString,
    surname  : surname as ValidString,
    address  : address,
    username : username as ValidString,
    status   : status as ValidBool,
    createdAt: createdAt as ValidDate,
    updatedAt: updatedAt as ValidDate
  }
}
