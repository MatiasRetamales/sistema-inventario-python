import { Product } from 'app/modules/product/domain/product'
import { ProductRepository } from 'app/modules/product/domain/product-repository'
import { ProductResponse } from 'app/modules/product/domain/product-response'
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
import {
  wrapTypeDefault,
  wrapTypeErrors
} from 'app/modules/shared/utils/wrap-type'

export async function  updateProduct(repo: ProductRepository, oldProduct : ProductResponse, newProduct:{
  name ?: string,
  quantity ?: number,
  price ?: number,
  categoryID ?: string,
  providerID ?: string,
}) : Promise<boolean | Errors>{
  const errors: BaseException[] = []

  const name = wrapTypeDefault<ValidString, string, InvalidStringException>(
    oldProduct.name, ( value ) => ValidString.from( value ),
    newProduct.name )

  if ( name instanceof BaseException ) {
    errors.push( name )
  }

  const quantity = wrapTypeDefault<ValidInteger, number, InvalidIntegerException>(
    oldProduct.quantity, ( value ) => ValidInteger.from( value ),
    newProduct.quantity )

  if ( quantity instanceof BaseException ) {
    errors.push( quantity )
  }

  const price = wrapTypeDefault<ValidInteger, number, InvalidIntegerException>(
    oldProduct.price, ( value ) => ValidInteger.from( value ),
    newProduct.price )

  if ( price instanceof BaseException ) {
    errors.push( price )
  }

  const categoryId = wrapTypeDefault<UUID, string, InvalidUUIDException>(
    oldProduct.category.id, ( value ) => UUID.from( value ),
    newProduct.categoryID )

  if ( categoryId instanceof BaseException ) {
    errors.push( categoryId )
  }

  const providerId = wrapTypeDefault<UUID, string, InvalidUUIDException>(
    oldProduct.provider.id, ( value ) => UUID.from( value ),
    newProduct.providerID )

  if ( providerId instanceof BaseException ) {
    errors.push( providerId )
  }

  if ( errors.length > 0 ) {
    return new Errors( errors )
  }

  const product = new Product(
    oldProduct.id,
    name as ValidString,
    quantity as ValidInteger,
    price as ValidInteger,
    categoryId as UUID,
    providerId as UUID
  )


  return await wrapTypeErrors( async () => await repo.update( product ) )
}
