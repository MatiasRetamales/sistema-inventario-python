import { MovementDetailResponse } from 'app/modules/movements/domain/movement-detail-response'
import { productFromJson } from 'app/modules/product/application/mapper/product-mapper'
import { ProductResponse } from 'app/modules/product/domain/product-response'
import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidIntegerException } from 'app/modules/shared/domain/exceptions/invalid-integer-exception'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { wrapType } from 'app/modules/shared/utils/wrap-type'

export function movementDetailToJson( detail : MovementDetailResponse) : Record<string, any> {
  return {
    id: detail.id.value,
    product_id : detail.product.id.value,
    quantity : detail.quantity.value,
  }
}

export function movementDetailFromJson( json : Record<string, any> ) : MovementDetailResponse | Errors {
  const errors: BaseException[] = []

  const id = wrapType<ValidInteger, InvalidIntegerException>( () => ValidInteger.from( json.id ) )

  if ( id instanceof BaseException ) {
    errors.push( id )
  }

  const product = productFromJson( json.product )

  if ( product instanceof Errors ) {
    errors.push( ...product.values )
  }

  const quantity = wrapType<ValidInteger, InvalidIntegerException>( () => ValidInteger.from( json.quantity ) )

  if ( quantity instanceof BaseException ) {
    errors.push( quantity )
  }

  if ( errors.length > 0 ) {
    return new Errors( errors )
  }

  return {
    id: id as ValidInteger,
    product: product as ProductResponse,
    quantity: quantity as ValidInteger
  }
}
