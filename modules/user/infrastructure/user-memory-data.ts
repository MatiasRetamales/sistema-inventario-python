import { Password } from 'app/modules/shared/domain/value_objects/password'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'
import { User } from 'app/modules/user/domain/user'
import { UserRepository } from 'app/modules/user/domain/user-repository'
import { UserResponse } from 'app/modules/user/domain/user-response'

export class UserMemoryData implements UserRepository {
  async login( username: ValidString,
    password: ValidString ): Promise<boolean> {
    return Promise.resolve( false )
  }

  async logout( username: ValidString ): Promise<boolean> {
    return Promise.resolve( false )
  }


  async create( user: User ): Promise<boolean> {
    return Promise.resolve( false )
  }

  async delete( id: ValidInteger ): Promise<boolean> {
    return Promise.resolve( false )
  }

  async findAll(): Promise<UserResponse[]> {
    return Promise.resolve( [] )
  }

  async findById( id: ValidInteger ): Promise<UserResponse> {
    throw new Error( 'Method not implemented.' )
  }

  async update( user: User ): Promise<boolean> {
    return Promise.resolve( false )
  }

}
