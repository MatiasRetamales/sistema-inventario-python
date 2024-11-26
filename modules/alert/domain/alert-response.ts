import { ProductResponse } from 'app/modules/product/domain/product-response'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'
import { ValidBool } from 'app/modules/shared/domain/value_objects/valid-bool'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'

export interface AlertResponse {
  id: UUID,
  product: ProductResponse,
  quantityStockAlert: ValidInteger,
  sendNotification: ValidBool,
  sendEmail: ValidBool,
}
