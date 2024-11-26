import { Alert } from 'app/modules/alert/domain/alert'
import { AlertRepository } from 'app/modules/alert/domain/alert-repository'
import { AlertResponse } from 'app/modules/alert/domain/alert-response'
import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidBooleanException } from 'app/modules/shared/domain/exceptions/invalid-boolean-exception'
import { InvalidIntegerException } from 'app/modules/shared/domain/exceptions/invalid-integer-exception'
import { InvalidUUIDException } from 'app/modules/shared/domain/exceptions/invalid-uuid-exception'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'
import { ValidBool } from 'app/modules/shared/domain/value_objects/valid-bool'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import {
  wrapTypeDefault,
  wrapTypeErrors
} from 'app/modules/shared/utils/wrap-type'

export async function updateAlert( repo: AlertRepository,
  oldAlert: AlertResponse,
  newAlert: {
    productId?: string,
    quantityStockAlert?: number,
    sendNotification?: boolean,
    sendEmail?: boolean,
  } ): Promise<boolean | Errors> {
  const errors: BaseException[] = []

  const productId = wrapTypeDefault<UUID, string, InvalidUUIDException>(
    oldAlert.product.id, ( value ) => UUID.from( value ), newAlert.productId )

  if ( productId instanceof BaseException ) {
    errors.push( productId )
  }

  const quantityStockAlert = wrapTypeDefault<ValidInteger, number, InvalidIntegerException>(
    oldAlert.quantityStockAlert,
    ( value ) => ValidInteger.from( value ),
    newAlert.quantityStockAlert )

  if ( quantityStockAlert instanceof BaseException ) {
    errors.push( quantityStockAlert )
  }

  const sendNotification = wrapTypeDefault<ValidBool, boolean, InvalidBooleanException>(
    oldAlert.sendNotification,
    ( value ) => ValidBool.from( value ), newAlert.sendNotification )

  if ( sendNotification instanceof BaseException ) {
    errors.push( sendNotification )
  }

  const sendEmail = wrapTypeDefault<ValidBool, boolean, InvalidBooleanException>(
    oldAlert.sendEmail,
    ( value ) => ValidBool.from( value ), newAlert.sendEmail )

  if ( sendEmail instanceof BaseException ) {
    errors.push( sendEmail )
  }

  if ( errors.length > 0 ) {
    return new Errors( errors )
  }

  const alert = new Alert(
    oldAlert.id,
    productId as UUID,
    quantityStockAlert as ValidInteger,
    sendNotification as ValidBool,
    sendEmail as ValidBool
  )

  return await wrapTypeErrors( async () => await repo.update( alert ) )
}
