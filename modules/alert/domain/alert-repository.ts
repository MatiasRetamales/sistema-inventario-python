import { Alert } from 'app/modules/alert/domain/alert'
import { AlertResponse } from 'app/modules/alert/domain/alert-response'
import { UUID } from 'app/modules/shared/domain/value_objects/uuid'

export abstract class AlertRepository {

  abstract create( alert: Alert ): Promise<boolean>

  abstract update( alert: Alert ): Promise<boolean>

  abstract delete( id: UUID ): Promise<boolean>

  abstract findAll(): Promise<AlertResponse[]>

  abstract findById( id: UUID ): Promise<AlertResponse>
}
