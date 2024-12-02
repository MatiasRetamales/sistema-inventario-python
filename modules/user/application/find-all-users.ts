import { Errors } from 'app/modules/shared/domain/exceptions/base-exception'
import { wrapTypeErrors } from 'app/modules/shared/utils/wrap-type'
import { UserRepository } from 'app/modules/user/domain/user-repository'
import { UserResponse } from 'app/modules/user/domain/user-response'

export async function findAllUsers(repo : UserRepository): Promise<UserResponse[] | Errors> {
  return wrapTypeErrors( async () => await repo.findAll())
}
