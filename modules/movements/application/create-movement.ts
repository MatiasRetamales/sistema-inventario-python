import { Movement } from 'app/modules/movements/domain/movement'
import { MovementRepository } from 'app/modules/movements/domain/movement-repository'
import {
  MovementType,
  MovementTypeEnum
} from 'app/modules/movements/domain/movement-type'
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
  wrapType,
  wrapTypeErrors
} from 'app/modules/shared/utils/wrap-type'
import { v4 as uuidv4 } from 'uuid'


export async function createMovement( repo : MovementRepository , props : {
  productID: string,
  date: Date,
  quantity: number,
  type: MovementTypeEnum
}): Promise<boolean | Errors> {
  const errors: BaseException[] = []

  const id = wrapType<UUID, InvalidUUIDException>( () => UUID.from( uuidv4() ) )

  if ( id instanceof BaseException ) {
    errors.push( id )
  }

  const productID = wrapType<UUID, InvalidUUIDException>( () => UUID.from( props.productID ) )

  if ( productID instanceof BaseException ) {
    errors.push( productID )
  }

  const date = wrapType<ValidDate, InvalidDateException>( () => ValidDate.from( props.date ) )

  if ( date instanceof BaseException ) {
    errors.push( date )
  }

  const quantity = wrapType<ValidInteger, InvalidIntegerException>( () => ValidInteger.from( props.quantity ) )

  if ( quantity instanceof BaseException ) {
    errors.push( quantity )
  }

  if ( errors.length > 0 ) {
    return new Errors( errors )
  }

  const type = new MovementType( props.type )

  const movement = new Movement(
    id as UUID,
    productID as UUID,
    date as ValidDate,
    quantity as ValidInteger,
    type
  )

  return await wrapTypeErrors( async () => await repo.create( movement ) )
}
