import { MovementDetailResponse } from 'app/modules/movements/domain/movement-detail-response'
import { MovementType } from 'app/modules/movements/domain/movement-type'
import { ValidDate } from 'app/modules/shared/domain/value_objects/valid-date'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { UserResponse } from 'app/modules/user/domain/user-response'

export interface MovementResponse {
  id: ValidInteger,
  type: MovementType
  date: ValidDate,
  user: UserResponse,
  details: MovementDetailResponse
}
