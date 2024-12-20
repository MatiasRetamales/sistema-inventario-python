import { ValidBool } from 'app/modules/shared/domain/value_objects/valid-bool'
import { ValidDate } from 'app/modules/shared/domain/value_objects/valid-date'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'

export class Product{
  constructor(
    readonly name: ValidString,
    readonly categoryID: ValidInteger,
    readonly currentQuantity: ValidInteger,
    readonly minQuantity: ValidInteger,
    readonly maxQuantity: ValidInteger,
    readonly price: ValidInteger,
    readonly providerID: ValidInteger,
    readonly status : ValidBool,
    readonly userId : ValidInteger,
    readonly expirationDate: ValidDate,
    readonly createdAt?: ValidDate,
    readonly updatedAt?: ValidDate,
    readonly id ?: ValidInteger,
  ){}
}
