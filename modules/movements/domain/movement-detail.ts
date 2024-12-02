import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'

export class MovementDetail {
  constructor(
    readonly productID: ValidInteger,
    readonly quantity: ValidInteger,
    readonly id ?: ValidInteger,
    readonly movementID ?: ValidInteger,
  ) {}
}
