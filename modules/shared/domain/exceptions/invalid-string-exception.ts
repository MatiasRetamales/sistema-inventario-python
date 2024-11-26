import { BaseException } from 'app/modules/shared/domain/exceptions/base-exception'

export class InvalidStringException extends BaseException {
  constructor() {
    super()
    this.name = 'InvalidStringException'
  }
}
