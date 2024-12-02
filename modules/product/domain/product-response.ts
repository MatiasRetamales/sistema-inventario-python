import { CategoryResponse } from 'app/modules/product/domain/category-response'
import { ProviderResponse } from 'app/modules/product/domain/provider-response'
import { ValidBool } from 'app/modules/shared/domain/value_objects/valid-bool'
import { ValidDate } from 'app/modules/shared/domain/value_objects/valid-date'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'
import { UserResponse } from 'app/modules/user/domain/user-response'

export interface ProductResponse {
  id: ValidInteger,
  name: ValidString,
  category: CategoryResponse,
  currentQuantity: ValidInteger,
  minQuantity: ValidInteger,
  maxQuantity: ValidInteger,
  price: ValidInteger,
  provider: ProviderResponse,
  status: ValidBool,
  user: UserResponse,
  expirationDate: ValidDate,
  createdAt: ValidDate,
  updatedAt: ValidDate,
}
