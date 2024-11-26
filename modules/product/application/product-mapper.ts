import {
  categoryFromJson,
} from 'app/modules/product/application/category-mapper'
import {
  providerFromJson,
} from 'app/modules/product/application/provider-mapper'
import { Category } from 'app/modules/product/domain/category'
import { Product } from 'app/modules/product/domain/product'
import { ProductResponse } from 'app/modules/product/domain/product-response'
import { Provider } from 'app/modules/product/domain/provider'
import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidIntegerException } from 'app/modules/shared/domain/exceptions/invalid-integer-exception'
import { InvalidStringException } from 'app/modules/shared/domain/exceptions/invalid-string-exception'
import { InvalidUUIDException } from 'app/modules/shared/domain/exceptions/invalid-uuid-exception'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'
import { wrapType } from 'app/modules/shared/utils/wrap-type'

export function productToJson( product: ProductResponse ): Record<string, any> {
  return {
    id      : product.id.value,
    name    : product.name.value,
    quantity: product.quantity.value,
    price   : product.price.value,
    category_id: product.category.id.value,
    provider_id: product.provider.id.value
  }
}

export function productFromJson( json: Record<string, any> ): ProductResponse | Errors {
  const errors: BaseException[] = []

  const id = wrapType<UUID, InvalidUUIDException>( () => UUID.from( json.id ) )

  if ( id instanceof InvalidUUIDException ) {
    errors.push( id )
  }

  const name = wrapType<ValidString, InvalidStringException>( () => ValidString.from(json.name) )

  if ( name instanceof BaseException ) {
    errors.push( name )
  }

  const quantity = wrapType<ValidInteger, InvalidIntegerException>(
    () => ValidInteger.from(json.quantity) )

  if ( quantity instanceof BaseException ) {
    errors.push( quantity )
  }

  const price = wrapType<ValidInteger, InvalidIntegerException>(
    () => ValidInteger.from(json.price) )

  if ( price instanceof BaseException ) {
    errors.push( price )
  }

  const category = categoryFromJson( json.category )

  if ( category instanceof Errors ) {
    errors.push( ...category.values )
  }

  const provider = providerFromJson( json.provider )

  if ( provider instanceof Errors ) {
    errors.push( ...provider.values )
  }

  if ( errors.length > 0 ) {
    return new Errors( errors )
  }

  return {
    id: id as UUID,
    name: name as ValidString,
    quantity: quantity as ValidInteger,
    price: price as ValidInteger,
    category: category as Category,
    provider: provider as Provider
  }
}
