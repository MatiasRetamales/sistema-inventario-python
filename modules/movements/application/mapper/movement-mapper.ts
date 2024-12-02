import {
  movementDetailFromJson,
  movementDetailToJson
} from 'app/modules/movements/application/mapper/movement-detail-mapper'
import { InvalidMovementTypeException } from 'app/modules/movements/domain/exception/invalid-movement-type-exception'
import { MovementDetailResponse } from 'app/modules/movements/domain/movement-detail-response'
import { MovementResponse } from 'app/modules/movements/domain/movement-response'
import { MovementType } from 'app/modules/movements/domain/movement-type'
import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidDateException } from 'app/modules/shared/domain/exceptions/invalid-date-exception'
import { InvalidIntegerException } from 'app/modules/shared/domain/exceptions/invalid-integer-exception'
import { ValidDate } from 'app/modules/shared/domain/value_objects/valid-date'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import {
  dateFromUTC,
  dateToUTC
} from 'app/modules/shared/utils/parse-date'
import { wrapType } from 'app/modules/shared/utils/wrap-type'
import {
  userFromJson,
  userToJson
} from 'app/modules/user/application/user-mapper'
import { UserResponse } from 'app/modules/user/domain/user-response'

export function movementToJson( movement: MovementResponse ): Record<string, any> {
  return {
    id      : movement.id.value,
    type    : movement.type,
    date    : dateToUTC( movement.date.value ),
    user    : userToJson( movement.user ),
    details: movementDetailToJson( movement.details )
  }
}

export function movementFromJson( json: Record<string, any> ): MovementResponse | Errors {
  const errors: BaseException[] = []

  const id = wrapType<ValidInteger, InvalidIntegerException>(
    () => ValidInteger.from( json.id ) )

  if ( id instanceof BaseException ) {
    errors.push( id )
  }

  const type = wrapType<MovementType, InvalidMovementTypeException>(
    () => MovementType.from( json.type ) )

  if ( type instanceof BaseException ) {
    errors.push( type )
  }

  const date = wrapType<ValidDate, InvalidDateException>(
    () => ValidDate.from( dateFromUTC( json.date ) ) )

  if ( date instanceof BaseException ) {
    errors.push( date )
  }

  const user = userFromJson( json.user )

  if ( user instanceof Errors ) {
    errors.push( ...user.values )
  }

  const detail = movementDetailFromJson( json.detail )

  if ( detail instanceof Errors ) {
    errors.push( ...detail.values )
  }

  if ( errors.length ) {
    return new Errors( errors )
  }

  return {
    id     : id as ValidInteger,
    type   : type as MovementType,
    date   : date as ValidDate,
    user   : user as UserResponse,
    details: detail as MovementDetailResponse
  }
}
