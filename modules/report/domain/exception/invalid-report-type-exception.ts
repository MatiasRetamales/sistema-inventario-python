import { BaseException } from 'app/modules/shared/domain/exceptions/base-exception'

export class InvalidReportTypeException extends BaseException {
  constructor() {
    super()
    this.name = 'InvalidReportTypeException'
  }
}
