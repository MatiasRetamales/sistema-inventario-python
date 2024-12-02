import { Password } from 'app/modules/shared/domain/value_objects/password'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'
import { User } from 'app/modules/user/domain/user'
import { UserResponse } from 'app/modules/user/domain/user-response'

export abstract class UserRepository {

  abstract login( username: ValidString,
    password: ValidString ): Promise<boolean>

  abstract logout( username: ValidString ): Promise<boolean>

  abstract create( user: User, password: Password ): Promise<boolean>

  abstract update( user: User ): Promise<boolean>

  abstract delete( id: ValidInteger ): Promise<boolean>

  abstract findAll(): Promise<UserResponse[]>

  abstract findById( id: ValidInteger ): Promise<UserResponse>
}
