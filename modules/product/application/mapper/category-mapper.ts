import { CategoryResponse } from 'app/modules/product/domain/category-response'
import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidStringException } from 'app/modules/shared/domain/exceptions/invalid-string-exception'
import { InvalidUUIDException } from 'app/modules/shared/domain/exceptions/invalid-uuid-exception'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'
import { wrapType } from 'app/modules/shared/utils/wrap-type'

export function categoryToJson( category: CategoryResponse ): Record<string, any> {
  return {
    id  : category.id.value,
    name: category.name.value
  }
}

export function categoryFromJson( json: Record<string, any> ): CategoryResponse | Errors {
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

  if ( errors.length > 0 ) {
    return new Errors( errors )
  }

  return {
    id : id as ValidInteger,
    name : name as ValidString
  }
}
