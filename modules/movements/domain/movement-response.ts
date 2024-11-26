import { MovementType } from 'app/modules/movements/domain/movement-type'
import { ProductResponse } from 'app/modules/product/domain/product-response'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'
import { ValidDate } from 'app/modules/shared/domain/value_objects/valid-date'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'

export interface MovementResponse {
  id: UUID,
  product: ProductResponse,
  date: ValidDate,
  quantity: ValidInteger,
  type: MovementType
}
