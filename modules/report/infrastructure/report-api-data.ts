import { Report } from 'app/modules/report/domain/report'
import { ReportRepository } from 'app/modules/report/domain/report-repository'
import { ReportResponse } from 'app/modules/report/domain/report-response'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'
import { undefined } from 'zod'

export class ReportApiData implements ReportRepository{
  async create( alert: Report ): Promise<boolean> {
    return Promise.resolve( false )
  }

  async delete( id: UUID ): Promise<boolean> {
    return Promise.resolve( false )
  }

  async findAll(): Promise<ReportResponse[]> {
    return Promise.resolve( [] )
  }

  async findById( id: UUID ): Promise<ReportResponse> {
    throw new Error( 'Method not implemented.' )
  }

  async update( alert: Report ): Promise<boolean> {
    return Promise.resolve( false )
  }

}
