import { Alert } from 'app/modules/alert/domain/alert'
import { AlertRepository } from 'app/modules/alert/domain/alert-repository'
import { AlertResponse } from 'app/modules/alert/domain/alert-response'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'

export class AlertApiData implements AlertRepository{
  async create( alert: Alert ): Promise<boolean> {
    return Promise.resolve( false )
  }

  async delete( id: UUID ): Promise<boolean> {
    return Promise.resolve( false )
  }

  async findAll(): Promise<AlertResponse[]> {
    return Promise.resolve( [] )
  }

  async findById( id: UUID ): Promise<AlertResponse> {
    throw new Error( 'Method not implemented.' )
  }

  async update( alert: Alert ): Promise<boolean> {
    return Promise.resolve( false )
  }

}
