import { InvalidDateException } from 'app/modules/shared/domain/exceptions/invalid-date-exception'
import { z } from 'zod'

export type RawDate = string | Date | number

export class ValidDate {
  readonly value: Date

  private constructor( value: Date ) {
    this.value = value
  }

  /**
   * Create a ValidDate instance
   * @throws {InvalidDateException} - if date is invalid
   */
  static from( value: RawDate ): ValidDate {

    const parsedDate = new Date( value )

    const result = z.date()
                    .safeParse( parsedDate )

    if ( !result.success ) {
      throw new InvalidDateException()
    }
    return new ValidDate( parsedDate )
  }
}
