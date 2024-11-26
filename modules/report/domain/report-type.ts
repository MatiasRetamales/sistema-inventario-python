import { InvalidReportTypeException } from 'app/modules/report/domain/exception/invalid-report-type-exception'
import { z } from 'zod'

const reportTypes = [ 'movement', 'product' ] as const
const ReportEnumScheme  = z.enum( reportTypes )
export type ReportEnum = z.infer<typeof ReportEnumScheme>

export class ReportType {

  readonly value: ReportEnum

  constructor( value: ReportEnum ) {
    this.value = value
  }

  static from( value: string ): ReportType {
    const result = ReportEnumScheme.safeParse( value )
    if ( result.success === false ) {
      throw new InvalidReportTypeException()
    }
    return {
      value: result.data
    }
  }
}


