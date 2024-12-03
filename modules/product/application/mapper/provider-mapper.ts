import { ProviderResponse } from 'app/modules/product/domain/provider-response'
import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidStringException } from 'app/modules/shared/domain/exceptions/invalid-string-exception'
import { InvalidUUIDException } from 'app/modules/shared/domain/exceptions/invalid-uuid-exception'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'
import { wrapType } from 'app/modules/shared/utils/wrap-type'

export function providerToJson( provider: ProviderResponse ): Record<string, any> {
  return {
    id     : provider.id.value,
    name   : provider.name.value,
    contact: provider.contact.value,
    phone  : provider.phone.value,
    email  : provider.email.value,
    address: provider.address.map( ( value ) => value.value )
  }
}

export function providerFromJson( json: Record<string, any> ): ProviderResponse | Errors {
  const errors: BaseException[] = []

  const id = wrapType<ValidInteger, InvalidUUIDException>(
    () => ValidInteger.from( json.id ) )

  if ( id instanceof BaseException ) {
    errors.push( id )
  }

  const name = wrapType<ValidString, InvalidStringException>(
    () => ValidString.from( json.name ) )

  if ( name instanceof BaseException ) {
    errors.push( name )
  }

  const contact = wrapType<ValidString, InvalidStringException>(
    () => ValidString.from( json.contact ) )

  if ( contact instanceof BaseException ) {
    errors.push( contact )
  }

  const phone = wrapType<ValidString, InvalidStringException>(
    () => ValidString.from( json.phone ) )

  if ( phone instanceof BaseException ) {
    errors.push( phone )
  }

  const email = wrapType<ValidString, InvalidStringException>(
    () => ValidString.from( json.email ) )

  if ( email instanceof BaseException ) {
    errors.push( email )
  }

  const address: ValidString[] = []

  if ( json.address instanceof Array ) {
    for ( const value of json.address ) {
      const addressValue = wrapType<ValidString, InvalidStringException>(
        () => ValidString.from( value ) )

      if ( addressValue instanceof BaseException ) {
        errors.push( addressValue )
      }
      else {
        address.push( addressValue )
      }
    }
  }

  if ( errors.length > 0 ) {
    return new Errors( errors )
  }

  return {
    id     : id as ValidInteger,
    label  : name as ValidString,
    contact: contact as ValidString,
    phone  : phone as ValidString,
    email  : email as ValidString,
    address: address
  }
}
