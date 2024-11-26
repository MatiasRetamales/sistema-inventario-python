import { InvalidReportTypeException } from 'app/modules/report/domain/exception/invalid-report-type-exception'
import { Report } from 'app/modules/report/domain/report'
import { ReportResponse } from 'app/modules/report/domain/report-response'
import {
  ReportType
} from 'app/modules/report/domain/report-type'
import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'
import { InvalidDateException } from 'app/modules/shared/domain/exceptions/invalid-date-exception'
import { InvalidUUIDException } from 'app/modules/shared/domain/exceptions/invalid-uuid-exception'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'
import { ValidDate } from 'app/modules/shared/domain/value_objects/valid-date'
import {
  dateFromUTC,
  dateToUTC
} from 'app/modules/shared/utils/parse-date'
import { wrapType } from 'app/modules/shared/utils/wrap-type'

export function reportToJson(report: ReportResponse): Record<string, any>{
  return{
    id: report.id.value,
    type : report.type.value,
    created_at: dateToUTC(report.createdAt.value),
    start_date: dateToUTC(report.startDate.value),
    end_date: dateToUTC(report.endDate.value),
  }
}

export function reportFromJson(json: Record<string, any>): Report | Errors{
  const errors: BaseException[] = []

  const id = wrapType<UUID, InvalidUUIDException>(() => UUID.from(json.id))

  if( id instanceof BaseException){
    errors.push(id)
  }

  const type = wrapType<ReportType, InvalidReportTypeException>(() => ReportType.from(json.type))

  if( type instanceof BaseException){
    errors.push(type)
  }

  const createdAt = wrapType<ValidDate, InvalidDateException>(() => ValidDate.from(dateFromUTC(json.created_at)))

  if( createdAt instanceof BaseException){
    errors.push(createdAt)
  }

  const startDate = wrapType<ValidDate, InvalidDateException>(() => ValidDate.from(dateFromUTC(json.start_date)))

  if( startDate instanceof BaseException){
    errors.push(startDate)
  }

  const endDate = wrapType<ValidDate, InvalidDateException>(() => ValidDate.from(dateFromUTC(json.end_date)))

  if( endDate instanceof BaseException){
    errors.push(endDate)
  }

  if( errors.length > 0){
    return new Errors(errors)
  }

  return new Report(
    id as UUID,
    type as ReportType,
    createdAt as ValidDate,
    startDate as ValidDate,
    endDate as ValidDate
  )
}
