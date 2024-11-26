import { BaseException } from 'app/modules/shared/domain/exceptions/base-exception'

export class InvalidUUIDException extends BaseException {
  constructor() {
    super()
    this.name = 'InvalidUUIDException'
  }
}
