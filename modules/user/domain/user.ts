import { ValidBool } from 'app/modules/shared/domain/value_objects/valid-bool'
import { ValidDate } from 'app/modules/shared/domain/value_objects/valid-date'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'

export class User{
  constructor(
    readonly name: ValidString,
    readonly surname: ValidString,
    readonly address: ValidString[],
    readonly username: ValidString,
    readonly status: ValidBool,
    readonly createdAt?: ValidDate,
    readonly updatedAt?: ValidDate,
    readonly id ?: ValidInteger,
  ) {}
}
