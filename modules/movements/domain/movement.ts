import { MovementType } from 'app/modules/movements/domain/movement-type'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'
import { ValidDate } from 'app/modules/shared/domain/value_objects/valid-date'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'

export class Movement {
  constructor(
    readonly id: UUID,
    readonly productID: UUID,
    readonly date: ValidDate,
    readonly quantity: ValidInteger,
    readonly type: MovementType
  )
  {}
}
