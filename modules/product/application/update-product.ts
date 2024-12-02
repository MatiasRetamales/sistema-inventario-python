import { Product } from 'app/modules/product/domain/product'
import { ProductRepository } from 'app/modules/product/domain/product-repository'
import { ProductResponse } from 'app/modules/product/domain/product-response'
import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidBooleanException } from 'app/modules/shared/domain/exceptions/invalid-boolean-exception'
import { InvalidDateException } from 'app/modules/shared/domain/exceptions/invalid-date-exception'
import { InvalidIntegerException } from 'app/modules/shared/domain/exceptions/invalid-integer-exception'
import { InvalidStringException } from 'app/modules/shared/domain/exceptions/invalid-string-exception'
import { InvalidUUIDException } from 'app/modules/shared/domain/exceptions/invalid-uuid-exception'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'
import { ValidBool } from 'app/modules/shared/domain/value_objects/valid-bool'
import { ValidDate } from 'app/modules/shared/domain/value_objects/valid-date'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'
import {
  wrapTypeDefault,
  wrapTypeErrors
} from 'app/modules/shared/utils/wrap-type'

export async function updateProduct( repo: ProductRepository,
  oldProduct: ProductResponse, newProduct: {
    name?: string,
    minQuantity?: number,
    maxQuantity?: number,
    price?: number,
    categoryID?: number,
    providerID?: number,
    status?: boolean,
    expirationDate?: Date
  } ): Promise<boolean | Errors> {
  const errors: BaseException[] = []

  const name = wrapTypeDefault<ValidString, string, InvalidStringException>(
    oldProduct.name, ( value ) => ValidString.from( value ),
    newProduct.name )

  if ( name instanceof BaseException ) {
    errors.push( name )
  }

  const minQuantity = wrapTypeDefault<ValidInteger, number, InvalidIntegerException>(
    oldProduct.minQuantity, ( value ) => ValidInteger.from( value ),
    newProduct.minQuantity )

  if ( minQuantity instanceof BaseException ) {
    errors.push( minQuantity )
  }

  const maxQuantity = wrapTypeDefault<ValidInteger, number, InvalidIntegerException>(
    oldProduct.maxQuantity, ( value ) => ValidInteger.from( value ),
    newProduct.maxQuantity )

  if ( maxQuantity instanceof BaseException ) {
    errors.push( maxQuantity )
  }

  const price = wrapTypeDefault<ValidInteger, number, InvalidIntegerException>(
    oldProduct.price, ( value ) => ValidInteger.from( value ),
    newProduct.price )

  if ( price instanceof BaseException ) {
    errors.push( price )
  }

  const categoryId = wrapTypeDefault<ValidInteger, number, InvalidIntegerException>(
    oldProduct.category.id, ( value ) => ValidInteger.from( value ),
    newProduct.categoryID )

  if ( categoryId instanceof BaseException ) {
    errors.push( categoryId )
  }

  const providerId = wrapTypeDefault<ValidInteger, number, InvalidIntegerException>(
    oldProduct.provider.id, ( value ) => ValidInteger.from( value ),
    newProduct.providerID )

  if ( providerId instanceof BaseException ) {
    errors.push( providerId )
  }

  const status = wrapTypeDefault<ValidBool, boolean, InvalidBooleanException>(
    oldProduct.status, ( value ) => ValidBool.from( value ),
    newProduct.status )

  if ( status instanceof BaseException ) {
    errors.push( status )
  }

  const expirationDate = wrapTypeDefault<ValidDate, Date, InvalidDateException>(
    oldProduct.expirationDate, ( value ) => ValidDate.from( value ),
    newProduct.expirationDate )

  if ( expirationDate instanceof BaseException ) {
    errors.push( expirationDate )
  }

  if ( errors.length > 0 ) {
    return new Errors( errors )
  }

  const product = new Product(
    name as ValidString,
    oldProduct.currentQuantity,
    minQuantity as ValidInteger,
    maxQuantity as ValidInteger,
    price as ValidInteger,
    categoryId as ValidInteger,
    providerId as ValidInteger,
    status as ValidBool,
    oldProduct.user.id,
    expirationDate as ValidDate,
    oldProduct.createdAt,
    oldProduct.updatedAt,
    oldProduct.id
  )


  return await wrapTypeErrors( async () => await repo.update( product ) )
}
