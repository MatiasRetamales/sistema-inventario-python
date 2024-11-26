import { Alert } from 'app/modules/alert/domain/alert'
import { AlertRepository } from 'app/modules/alert/domain/alert-repository'
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
  wrapType,
  wrapTypeErrors
} from 'app/modules/shared/utils/wrap-type'
import { v4 as uuidv4 } from 'uuid'

export async function createAlert( repo : AlertRepository, props : {
  product_id : string,
  quantityStockAlert : number
  sendNotification : boolean
  sendEmail : boolean
} ): Promise<Errors | boolean> {
  const errors: BaseException[] = []

  const id = wrapType<UUID, InvalidUUIDException>( () => UUID.from( uuidv4() ) )

  if ( id instanceof BaseException ) {
    errors.push( id )
  }

  const productId = wrapType<UUID, InvalidUUIDException>( () => UUID.from( props.product_id ) )

  if ( productId instanceof BaseException ) {
    errors.push( productId )
  }

  const quantityStockAlert = wrapType<ValidInteger, InvalidIntegerException>(()=> ValidInteger.from(props.quantityStockAlert))

  if ( quantityStockAlert instanceof BaseException ) {
    errors.push( quantityStockAlert )
  }

  const sendNotification = wrapType<ValidBool, InvalidBooleanException>(()=> ValidBool.from(props.sendNotification))

  if ( sendNotification instanceof BaseException ) {
    errors.push( sendNotification )
  }

  const sendEmail = wrapType<ValidBool, InvalidBooleanException>(()=> ValidBool.from(props.sendEmail))

  if ( sendEmail instanceof BaseException ) {
    errors.push( sendEmail )
  }

  if ( errors.values.length > 0 ) {
    return new Errors( errors )
  }

  const alert = new Alert(
    id as UUID,
    productId as UUID,
    quantityStockAlert as ValidInteger,
    sendNotification as ValidBool,
    sendEmail as ValidBool
  )

  return await wrapTypeErrors( async () => await repo.create( alert ) )
}
