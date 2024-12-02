import { MovementType } from 'app/modules/movements/domain/movement-type'
import { ValidDate } from 'app/modules/shared/domain/value_objects/valid-date'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'

export class Movement {
  constructor(
    readonly type: MovementType,
    readonly date: ValidDate,
    readonly userID: ValidInteger,
    readonly id ?: ValidInteger,
  )
  {}
}
