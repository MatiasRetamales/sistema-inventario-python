import { InvalidMovementTypeException } from 'app/modules/movements/domain/exception/invalid-movement-type-exception'
import { Movement } from 'app/modules/movements/domain/movement'
import { MovementResponse } from 'app/modules/movements/domain/movement-response'
import { MovementType } from 'app/modules/movements/domain/movement-type'
import {
  productFromJson,
  productToJson
} from 'app/modules/product/application/product-mapper'
import { Product } from 'app/modules/product/domain/product'
import { ProductResponse } from 'app/modules/product/domain/product-response'
import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidDateException } from 'app/modules/shared/domain/exceptions/invalid-date-exception'
import { InvalidIntegerException } from 'app/modules/shared/domain/exceptions/invalid-integer-exception'
import { InvalidUUIDException } from 'app/modules/shared/domain/exceptions/invalid-uuid-exception'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'
import { ValidDate } from 'app/modules/shared/domain/value_objects/valid-date'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import {
  dateFromUTC,
  dateToUTC
} from 'app/modules/shared/utils/parse-date'
import { wrapType } from 'app/modules/shared/utils/wrap-type'

export function movementToJson( movement : MovementResponse) : Record<string, any>{
  return {
    id: movement.id.value,
    product_id: movement.product.id.value,
    date: dateToUTC(movement.date.value),
    quantity: movement.quantity.value,
    type: movement.type,
  }
}

export function movementFromJson(json: Record<string, any>): MovementResponse | Errors {
  const errors: BaseException[] = []

  const id = wrapType<UUID, InvalidUUIDException>( () => UUID.from( json.id ) )

  if ( id instanceof InvalidUUIDException ) {
    errors.push( id )
  }

  const product = productFromJson(json.product)

  if ( product instanceof Errors ) {
    errors.push( ...product.values )
  }

  const date = wrapType<ValidDate, InvalidDateException>( () => ValidDate.from(dateFromUTC(json.date)) )

  if ( date instanceof BaseException ) {
    errors.push( date )
  }

  const quantity = wrapType<ValidInteger, InvalidIntegerException>( () => ValidInteger.from(json.quantity) )

  if ( quantity instanceof BaseException ) {
    errors.push( quantity )
  }

  const type = wrapType<MovementType, InvalidMovementTypeException>( () => MovementType.from(json.type) )

  if ( type instanceof BaseException ) {
    errors.push( type )
  }

  if ( errors.length ) {
    return new Errors( errors )
  }

  return {
    id: id as UUID,
    product: product as ProductResponse,
    date: date as ValidDate,
    quantity: quantity as ValidInteger,
    type: type as MovementType
  }
}
