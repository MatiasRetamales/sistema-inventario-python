import { BaseException } from 'app/modules/shared/domain/exceptions/base-exception'

export class EmailException extends BaseException {
  constructor() {
    super()
    this.name = 'EmailException'
  }
}
