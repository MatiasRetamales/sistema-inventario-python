import { Product } from 'app/modules/product/domain/product'
import { ProductRepository } from 'app/modules/product/domain/product-repository'
import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidBooleanException } from 'app/modules/shared/domain/exceptions/invalid-boolean-exception'
import { InvalidDateException } from 'app/modules/shared/domain/exceptions/invalid-date-exception'
import { InvalidIntegerException } from 'app/modules/shared/domain/exceptions/invalid-integer-exception'
import { InvalidUUIDException } from 'app/modules/shared/domain/exceptions/invalid-uuid-exception'
import { ValidBool } from 'app/modules/shared/domain/value_objects/valid-bool'
import { ValidDate } from 'app/modules/shared/domain/value_objects/valid-date'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'
import {
  wrapType,
  wrapTypeErrors
} from 'app/modules/shared/utils/wrap-type'

export async function createProduct( repo: ProductRepository, props: {
  name: string,
  categoryID: number,
  currentQuantity: number,
  minQuantity: number,
  maxQuantity: number,
  price: number,
  providerID: number,
  status: boolean,
  userID: number,
  expirationDate: Date
} ): Promise<boolean | Errors> {
  const errors: BaseException[] = []

  const name = wrapType<ValidString, InvalidUUIDException>(
    () => ValidString.from( props.name ) )

  if ( name instanceof BaseException ) {
    errors.push( name )
  }

  const currentQuantity = wrapType<ValidInteger, InvalidIntegerException>(
    () => ValidInteger.from( props.currentQuantity ) )

  if ( currentQuantity instanceof BaseException ) {
    errors.push( currentQuantity )
  }

  const minQuantity = wrapType<ValidInteger, InvalidIntegerException>(
    () => ValidInteger.from( props.minQuantity ) )

  if ( minQuantity instanceof BaseException ) {
    errors.push( minQuantity )
  }

  const maxQuantity = wrapType<ValidInteger, InvalidIntegerException>(
    () => ValidInteger.from( props.maxQuantity ) )

  if ( maxQuantity instanceof BaseException ) {
    errors.push( maxQuantity )
  }

  const price = wrapType<ValidInteger, InvalidIntegerException>(
    () => ValidInteger.from( props.price ) )

  if ( price instanceof BaseException ) {
    errors.push( price )
  }

  const categoryID = wrapType<ValidInteger, InvalidIntegerException>(
    () => ValidInteger.from( props.categoryID ) )

  if ( categoryID instanceof BaseException ) {
    errors.push( categoryID )
  }

  const providerID = wrapType<ValidInteger, InvalidIntegerException>(
    () => ValidInteger.from( props.providerID ) )

  if ( providerID instanceof BaseException ) {
    errors.push( providerID )
  }

  const status = wrapType<ValidBool, InvalidBooleanException>(
    () => ValidBool.from( props.status ) )

  if ( status instanceof BaseException ) {
    errors.push( status )
  }

  const userID = wrapType<ValidInteger, InvalidIntegerException>(
    () => ValidInteger.from( props.userID ) )

  if ( userID instanceof BaseException ) {
    errors.push( userID )
  }

  const expirationDate = wrapType<ValidDate, InvalidDateException>(
    () => ValidDate.from( props.expirationDate ) )

  if ( expirationDate instanceof BaseException ) {
    errors.push( expirationDate )
  }

  if ( errors.length > 0 ) {
    return new Errors( errors )
  }

  const product = new Product(
    name as ValidString,
    categoryID as ValidInteger,
    currentQuantity as ValidInteger,
    minQuantity as ValidInteger,
    maxQuantity as ValidInteger,
    price as ValidInteger,
    providerID as ValidInteger,
    status as ValidBool,
    userID as ValidInteger,
    expirationDate as ValidDate
  )

  return await wrapTypeErrors( async () => await repo.create( product ) )
}
