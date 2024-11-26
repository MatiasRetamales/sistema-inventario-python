import { UUID } from 'app/modules/shared/domain/value_objects/uuid'
import { ValidBool } from 'app/modules/shared/domain/value_objects/valid-bool'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'

export class Alert {
  constructor(
    readonly id: UUID,
    readonly product: UUID,
    readonly quantityStockAlert: ValidInteger,
    readonly sendNotification: ValidBool,
    readonly sendEmail: ValidBool,
  ) {}
}
