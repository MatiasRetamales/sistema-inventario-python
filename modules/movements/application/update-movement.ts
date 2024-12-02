import { Movement } from 'app/modules/movements/domain/movement'
import { MovementDetail } from 'app/modules/movements/domain/movement-detail'
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
  oldMovement: MovementResponse,
  newMovement: {
    userId?: number,
    date?: Date,
    type?: MovementTypeEnum,
    details: {
      productId?: number,
      quantity?: number
    }
  } ): Promise<boolean | Errors> {
  const errors: BaseException[] = []

  const userId = wrapTypeDefault<ValidInteger, number, InvalidIntegerException>(
    oldMovement.user.id, ( value ) => ValidInteger.from( value ),
    newMovement.userId )

  if ( userId instanceof BaseException ) {
    errors.push( userId )
  }

  const date = wrapTypeDefault<ValidDate, RawDate, InvalidDateException>(
    oldMovement.date, ( value ) => ValidDate.from( value ), newMovement.date )

  if ( date instanceof BaseException ) {
    errors.push( date )
  }

  const quantity = wrapTypeDefault<ValidInteger, number, InvalidIntegerException>(
    oldMovement.details.quantity, ( value ) => ValidInteger.from( value ),
    newMovement.details.quantity )

  if ( quantity instanceof BaseException ) {
    errors.push( quantity )
  }

  const productId = wrapTypeDefault<ValidInteger, number, InvalidIntegerException>(
    oldMovement.details.product.id, ( value ) => ValidInteger.from( value ),
    newMovement.details.productId )

  if ( productId instanceof BaseException ) {
    errors.push( productId )
  }

  if ( errors.length > 0 ) {
    return new Errors( errors )
  }

  const type = newMovement.type
    ? new MovementType( newMovement.type )
    : oldMovement.type

  const movement = new Movement(
    type,
    date as ValidDate,
    userId as ValidInteger
  )

  const detail = new MovementDetail(
    productId as ValidInteger,
    quantity as ValidInteger
  )

  return await wrapTypeErrors(
    async () => await repo.update( movement, detail ) )
}
