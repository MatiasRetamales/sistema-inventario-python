import { ProductResponse } from 'app/modules/product/domain/product-response'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'

export interface MovementDetailResponse {
  id: ValidInteger,
  product: ProductResponse
  quantity: ValidInteger,
}
