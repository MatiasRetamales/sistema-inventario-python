import { BaseException } from 'app/modules/shared/domain/exceptions/base-exception'

export class InvalidIntegerException extends BaseException {
  constructor() {
    super()
    this.name = 'InvalidIntegerException'
  }
}
