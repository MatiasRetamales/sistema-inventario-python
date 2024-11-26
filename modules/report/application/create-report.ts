import { Report } from 'app/modules/report/domain/report'
import { ReportRepository } from 'app/modules/report/domain/report-repository'
import {
  ReportEnum,
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
  wrapType,
  wrapTypeErrors
} from 'app/modules/shared/utils/wrap-type'
import { v4 as uuidv4 } from 'uuid'

export async function createReport(repo : ReportRepository, props: {
  type: ReportEnum,
  createdAt: Date,
  startDate: Date,
  endDate: Date,
}) : Promise<boolean | Errors>{
  const errors: BaseException[] = []

  const id = wrapType<UUID, InvalidUUIDException>(() => UUID.from(uuidv4()))

  if( id instanceof BaseException){
    errors.push(id)
  }

  const createdAt = wrapType<ValidDate, InvalidDateException>(() => ValidDate.from(props.createdAt))

  if( createdAt instanceof BaseException){
    errors.push(createdAt)
  }

  const startDate = wrapType<ValidDate, InvalidDateException>(() => ValidDate.from(props.startDate))

  if( startDate instanceof BaseException){
    errors.push(startDate)
  }

  const endDate = wrapType<ValidDate, InvalidDateException>(() => ValidDate.from(props.endDate))

  if( endDate instanceof BaseException){
    errors.push(endDate)
  }

  if(errors.length > 0){
    return new Errors(errors)
  }

  const type = new ReportType(props.type)

  const report = new Report(
    id as UUID,
    type,
    createdAt as ValidDate,
    startDate as ValidDate,
    endDate as ValidDate
  )

  return await wrapTypeErrors( async () => await repo.create( report ) )
}
