import { Category } from 'app/modules/product/domain/category'
import { Provider } from 'app/modules/product/domain/provider'
import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidStringException } from 'app/modules/shared/domain/exceptions/invalid-string-exception'
import { InvalidUUIDException } from 'app/modules/shared/domain/exceptions/invalid-uuid-exception'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'
import { wrapType } from 'app/modules/shared/utils/wrap-type'

export function providerToJson ( provider: Provider ): Record<string, any> {
  return {
    id: provider.id,
    name: provider.name,
  }
}

export function providerFromJson (json : Record<string, any>) : Provider | Errors {
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

  return new Provider(
    id as UUID,
    name as ValidString
  )
}
