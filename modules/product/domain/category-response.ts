import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'

export interface CategoryResponse {
  id: ValidInteger,
  name: ValidString,
}
