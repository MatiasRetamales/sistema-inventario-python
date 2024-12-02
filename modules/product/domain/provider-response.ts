import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'

export interface ProviderResponse {
  id : ValidInteger,
  name: ValidString,
  contact: ValidString,
  phone: ValidString,
  email: ValidString,
  address: ValidString[],
}
