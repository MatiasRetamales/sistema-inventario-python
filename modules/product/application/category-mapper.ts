import { Category } from 'app/modules/product/domain/category'
import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidStringException } from 'app/modules/shared/domain/exceptions/invalid-string-exception'
import { InvalidUUIDException } from 'app/modules/shared/domain/exceptions/invalid-uuid-exception'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'
import { wrapType } from 'app/modules/shared/utils/wrap-type'

export function categoryToJson( category: Category ): Record<string, any> {
  return {
    id: category.id.value,
    name: category.name.value,
  }
}

export function categoryFromJson( json: Record<string, any> ): Category | Errors {
  const errors: BaseException[] = []

  const id = wrapType<UUID, InvalidUUIDException>(()=>UUID.from(json.id))

  if( id instanceof InvalidUUIDException ) {
    errors.push(id)
  }

  const name = wrapType<ValidString, InvalidStringException>(()=>ValidString.from(json.name))

  if( name instanceof BaseException ) {
    errors.push(name)
  }

  if( errors.length > 0 ) {
    return new Errors(errors)
  }

  return new Category(
    id as UUID,
    name as ValidString
  )
}
