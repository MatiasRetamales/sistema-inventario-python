import { Movement } from 'app/modules/movements/domain/movement'
import { MovementRepository } from 'app/modules/movements/domain/movement-repository'
import { MovementResponse } from 'app/modules/movements/domain/movement-response'
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
import {
  RawDate,
  ValidDate
} from 'app/modules/shared/domain/value_objects/valid-date'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import {
  wrapTypeDefault,
  wrapTypeErrors
} from 'app/modules/shared/utils/wrap-type'

export async function updateMovement( repo: MovementRepository,
  oldMovement: MovementResponse, newMovement: {
    productID?: string,
    date?: Date,
    quantity?: number,
    type?: MovementTypeEnum
  } ): Promise<boolean | Errors> {
  const errors: BaseException[] = []

  const productId = wrapTypeDefault<UUID, string, InvalidUUIDException>(
    oldMovement.product.id, ( value ) => UUID.from( value ),
    newMovement.productID )

  if ( productId instanceof BaseException ) {
    errors.push( productId )
  }

  const date = wrapTypeDefault<ValidDate, RawDate, InvalidDateException>(
    oldMovement.date, ( value ) => ValidDate.from( value ), newMovement.date )

  if ( date instanceof BaseException ) {
    errors.push( date )
  }

  const quantity = wrapTypeDefault<ValidInteger, number, InvalidIntegerException>(
    oldMovement.quantity, ( value ) => ValidInteger.from( value ),
    newMovement.quantity )

  if ( quantity instanceof BaseException ) {
    errors.push( quantity )
  }

  if ( errors.length > 0 ) {
    return new Errors( errors )
  }

  const type = newMovement.type
    ? new MovementType( newMovement.type )
    : oldMovement.type

  const movement = new Movement(
    oldMovement.id,
    productId as UUID,
    date as ValidDate,
    quantity as ValidInteger,
    type
  )

  return await wrapTypeErrors( async () => await repo.update( movement ) )
}
