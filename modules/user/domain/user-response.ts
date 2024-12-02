import { ValidBool } from 'app/modules/shared/domain/value_objects/valid-bool'
import { ValidDate } from 'app/modules/shared/domain/value_objects/valid-date'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'

export interface UserResponse {
  id: ValidInteger,
  name: ValidString,
  surname: ValidString,
  address: ValidString[],
  username: ValidString,
  status: ValidBool,
  createdAt: ValidDate,
  updatedAt: ValidDate,
}
