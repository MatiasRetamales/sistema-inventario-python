import { Movement } from 'app/modules/movements/domain/movement'
import { MovementDetail } from 'app/modules/movements/domain/movement-detail'
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
import { ValidDate } from 'app/modules/shared/domain/value_objects/valid-date'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import {
  wrapType,
  wrapTypeErrors
} from 'app/modules/shared/utils/wrap-type'

export async function createMovement( repo : MovementRepository , props : {
  userId: number,
  date: Date,
  type: MovementTypeEnum,
  details : {
    productId : number,
    quantity: number
  }
}): Promise<boolean | Errors> {
  const errors: BaseException[] = []

  const userID = wrapType<ValidInteger, InvalidUUIDException>( () => ValidInteger.from( props.userId ) )

  if ( userID instanceof BaseException ) {
    errors.push( userID )
  }

  const date = wrapType<ValidDate, InvalidDateException>( () => ValidDate.from( props.date ) )

  if ( date instanceof BaseException ) {
    errors.push( date )
  }

  const productId = wrapType<ValidInteger, InvalidUUIDException>( () => ValidInteger.from( props.details.productId ) )

  if ( productId instanceof BaseException ) {
    errors.push( productId )
  }

  const quantity = wrapType<ValidInteger, InvalidIntegerException>( () => ValidInteger.from( props.details.quantity ) )

  if ( quantity instanceof BaseException ) {
    errors.push( quantity)
  }

  if ( errors.length > 0 ) {
    return new Errors( errors )
  }

  const type = new MovementType( props.type )

  const movement = new Movement(
    type,
    date as ValidDate,
    userID as ValidInteger,
  )

  const detail = new MovementDetail(
    productId as ValidInteger,
    quantity as ValidInteger
  )

  return await wrapTypeErrors( async () => await repo.create( movement, detail ) )
}
