import { Alert } from 'app/modules/alert/domain/alert'
import { AlertResponse } from 'app/modules/alert/domain/alert-response'
import { productFromJson } from 'app/modules/product/application/product-mapper'
import { Product } from 'app/modules/product/domain/product'
import { ProductResponse } from 'app/modules/product/domain/product-response'
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
import { wrapType } from 'app/modules/shared/utils/wrap-type'

export function alertToJson( alert: AlertResponse ): Record<string, any> {
  return {
    id                  : alert.id.value,
    product_id          : alert.product.id.value,
    quantity_stock_alert: alert.quantityStockAlert.value,
    send_notification   : alert.sendNotification.value,
    send_email          : alert.sendEmail.value
  }
}

export function alertFromJson( json: Record<string, any> ): AlertResponse | Errors {
  const errors: BaseException[] = []

  const id = wrapType<UUID, InvalidUUIDException>( () => UUID.from( json.id ) )

  if ( id instanceof BaseException ) {
    errors.push( id )
  }

  const product = productFromJson( json.product )

  if ( product instanceof Errors ) {
    errors.push( ...product.values )
  }

  const quantityStockAlert = wrapType<ValidInteger, InvalidIntegerException>(
    () => ValidInteger.from( json.quantity_stock_alert ) )

  if ( quantityStockAlert instanceof BaseException ) {
    errors.push( quantityStockAlert )
  }

  const sendNotification = wrapType<ValidBool, InvalidBooleanException>(
    () => ValidBool.from( json.send_notification ) )

  if ( sendNotification instanceof BaseException ) {
    errors.push( sendNotification )
  }

  const sendEmail = wrapType<ValidBool, InvalidBooleanException>(
    () => ValidBool.from( json.send_email ) )

  if ( sendEmail instanceof BaseException ) {
    errors.push( sendEmail )
  }

  if ( errors.length > 0 ) {
    return new Errors( errors )
  }

  return {
    id                : id as UUID,
    product           : product as ProductResponse,
    quantityStockAlert: quantityStockAlert as ValidInteger,
    sendNotification  : sendNotification as ValidBool,
    sendEmail         : sendEmail as ValidBool
  }
}
