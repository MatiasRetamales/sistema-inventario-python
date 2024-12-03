import { categoryFromJson } from 'app/modules/product/application/mapper/category-mapper'
import { providerFromJson } from 'app/modules/product/application/mapper/provider-mapper'
import { CategoryResponse } from 'app/modules/product/domain/category-response'
import { ProductResponse } from 'app/modules/product/domain/product-response'
import { ProviderResponse } from 'app/modules/product/domain/provider-response'
import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidDateException } from 'app/modules/shared/domain/exceptions/invalid-date-exception'
import { InvalidIntegerException } from 'app/modules/shared/domain/exceptions/invalid-integer-exception'
import { InvalidStringException } from 'app/modules/shared/domain/exceptions/invalid-string-exception'
import { ValidBool } from 'app/modules/shared/domain/value_objects/valid-bool'
import { ValidDate } from 'app/modules/shared/domain/value_objects/valid-date'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'
import {
  dateFromUTC,
  dateToUTC
} from 'app/modules/shared/utils/parse-date'
import { wrapType } from 'app/modules/shared/utils/wrap-type'
import { userFromJson } from 'app/modules/user/application/user-mapper'
import { UserResponse } from 'app/modules/user/domain/user-response'

export function productToJson( product: ProductResponse ): Record<string, any> {
  return {
    id             : product.id.value,
    name           : product.name.value,
    quantity       : product.currentQuantity.value,
    max_quantity   : product.maxQuantity.value,
    min_quantity   : product.minQuantity.value,
    price          : product.price.value,
    category_id    : product.category.id.value,
    provider_id    : product.provider.id.value,
    status         : product.status.value,
    user_id        : product.user.id.value,
    expiration_date: dateToUTC( product.expirationDate.value ),
    created_at     : dateToUTC( product.createdAt.value ),
    updated_at     : dateToUTC( product.updatedAt.value )
  }
}

export function productFromJson( json: Record<string, any> ): ProductResponse | Errors {
  const errors: BaseException[] = []

  const id = wrapType<ValidInteger, InvalidIntegerException>(
    () => ValidInteger.from( json.id ) )

  if ( id instanceof BaseException ) {
    errors.push( id )
  }

  const name = wrapType<ValidString, InvalidStringException>(
    () => ValidString.from( json.name ) )

  if ( name instanceof BaseException ) {
    errors.push( name )
  }

  const currentQuantity = wrapType<ValidInteger, InvalidIntegerException>(
    () => ValidInteger.from( json.quantity ) )

  if ( currentQuantity instanceof BaseException ) {
    errors.push( currentQuantity )
  }

  const minQuantity = wrapType<ValidInteger, InvalidIntegerException>(
    () => ValidInteger.from( json.min_quantity ) )

  if ( minQuantity instanceof BaseException ) {
    errors.push( minQuantity )
  }

  const maxQuantity = wrapType<ValidInteger, InvalidIntegerException>(
    () => ValidInteger.from( json.max_quantity ) )

  if ( maxQuantity instanceof BaseException ) {
    errors.push( maxQuantity )
  }

  const price = wrapType<ValidInteger, InvalidIntegerException>(
    () => ValidInteger.from( json.price ) )

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

  const status = wrapType<ValidBool, InvalidStringException>(
    () => ValidBool.from( json.status ) )

  if ( status instanceof BaseException ) {
    errors.push( status )
  }

  const user = userFromJson( json.user )

  if ( user instanceof Errors ) {
    errors.push( ...user.values )
  }

  const expirationDate = wrapType<ValidDate, InvalidDateException>(
    () => ValidDate.from( dateFromUTC( json.created_at ) ) )

  if ( expirationDate instanceof BaseException ) {
    errors.push( expirationDate )
  }

  const createdAt = wrapType<ValidDate, InvalidDateException>(
    () => ValidDate.from( dateFromUTC( json.created_at ) ) )

  if ( createdAt instanceof BaseException ) {
    errors.push( createdAt )
  }

  const updatedAt = wrapType<ValidDate, InvalidDateException>(
    () => ValidDate.from( dateFromUTC( json.updated_at ) ) )

  if ( updatedAt instanceof BaseException ) {
    errors.push( updatedAt )
  }

  if ( errors.length > 0 ) {
    return new Errors( errors )
  }

  return {
    id             : id as ValidInteger,
    label          : name as ValidString,
    currentQuantity: currentQuantity as ValidInteger,
    minQuantity    : minQuantity as ValidInteger,
    maxQuantity    : maxQuantity as ValidInteger,
    price          : price as ValidInteger,
    category       : category as CategoryResponse,
    provider       : provider as ProviderResponse,
    status         : status as ValidBool,
    user           : user as UserResponse,
    expirationDate : expirationDate as ValidDate,
    createdAt      : createdAt as ValidDate,
    updatedAt      : updatedAt as ValidDate
  }
}
