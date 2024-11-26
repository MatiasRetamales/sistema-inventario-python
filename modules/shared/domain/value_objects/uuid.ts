import { InvalidUUIDException } from 'app/modules/shared/domain/exceptions/invalid-uuid-exception'
import { z } from 'zod'

export class UUID {
  readonly value: string

  private constructor( value: string ) {
    this.value = value
  }

  /**
   * Create a UUID instance
   * @throws {InvalidUUIDException} - if string is not a valid UUID
   */
  static from( value: string ): UUID {
    const result = z.string()
                    .uuid()
                    .safeParse( value )
    if ( result.success === false ) {
      throw new InvalidUUIDException()
    }
    return new UUID( result.data )
  }
}
