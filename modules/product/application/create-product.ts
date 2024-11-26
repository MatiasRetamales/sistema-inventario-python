import { Product } from 'app/modules/product/domain/product'
import { ProductRepository } from 'app/modules/product/domain/product-repository'
import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidIntegerException } from 'app/modules/shared/domain/exceptions/invalid-integer-exception'
import { InvalidUUIDException } from 'app/modules/shared/domain/exceptions/invalid-uuid-exception'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'
import {
  wrapType,
  wrapTypeErrors
} from 'app/modules/shared/utils/wrap-type'
import { v4 as uuidv4 } from 'uuid'

export async function createProduct( repo: ProductRepository, props: {
  name: string,
  quantity: number,
  price: number,
  categoryID: string,
  providerID: string,
} ): Promise<boolean | Errors> {
  const errors: BaseException[] = []

  const id = wrapType<UUID, InvalidUUIDException>( () => UUID.from( uuidv4() ) )

  if ( id instanceof BaseException ) {
    errors.push( id )
  }

  const name = wrapType<ValidString, InvalidUUIDException>(
    () => ValidString.from( props.name ) )

  if ( name instanceof BaseException ) {
    errors.push( name )
  }

  const quantity = wrapType<ValidInteger, InvalidIntegerException>(
    () => ValidInteger.from( props.quantity ) )

  if ( quantity instanceof BaseException ) {
    errors.push( quantity )
  }

  const price = wrapType<ValidInteger, InvalidIntegerException>(
    () => ValidInteger.from( props.price ) )

  if ( price instanceof BaseException ) {
    errors.push( price )
  }

  const categoryID = wrapType<UUID, InvalidUUIDException>(
    () => UUID.from( props.categoryID ) )

  if ( categoryID instanceof BaseException ) {
    errors.push( categoryID )
  }

  const providerID = wrapType<UUID, InvalidUUIDException>(
    () => UUID.from( props.providerID ) )

  if ( providerID instanceof BaseException ) {
    errors.push( providerID )
  }

  if ( errors.length > 0 ) {
    return new Errors( errors )
  }

  const product = new Product(
    id as UUID,
    name as ValidString,
    quantity as ValidInteger,
    price as ValidInteger,
    categoryID as UUID,
    providerID as UUID
  )

  return await wrapTypeErrors( async () => await repo.create( product ) )
}
