import { Category } from 'app/modules/product/domain/category'
import { Provider } from 'app/modules/product/domain/provider'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'

export interface ProductResponse {
  id: UUID,
  name: ValidString,
  quantity: ValidInteger,
  price: ValidInteger,
  category: Category,
  provider: Provider,
}
