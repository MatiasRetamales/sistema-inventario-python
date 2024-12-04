import { Errors } from 'app/modules/shared/domain/exceptions/base-exception'
import { ValidInteger } from 'app/modules/shared/domain/value_objects/valid-integer'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'
import { userFromJson } from 'app/modules/user/application/user-mapper'
import { User } from 'app/modules/user/domain/user'
import { UserRepository } from 'app/modules/user/domain/user-repository'
import { UserResponse } from 'app/modules/user/domain/user-response'
import axios, { AxiosInstance } from 'axios'

export class UserApiData implements UserRepository {
  private http: AxiosInstance

  constructor() {
    this.http = axios.create()
  }

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

  async findAll(from: ValidInteger, to : ValidInteger): Promise<UserResponse[]> {
    const url      = `${ process.env.API_HOST }:${ process.env.API_PORT }/users`
    const response = await this.http.get( url, {
      params:{
        skip: from.value,
        limit: to.value
      },
      headers: {
        'Content-Type'               : 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    } )
    if ( response.data.code !== 200 ) {
      throw new Error( 'Error fetching users' )
    }

    const users: UserResponse[] = []
    if ( response.data.data instanceof Array ) {
      for ( const r of response.data.data ) {
        const transformData = {
          id        : r.usuario_id,
          name      : r.nombre,
          surname   : r.apellido,
          address   : [r.direccion],
          username  : r.username,
          status    : r.estado,
          created_at: r.fecha_creacion,
          updated_at: r.fecha_actualizacion
        }
        const data = userFromJson( transformData )
        if ( data instanceof Errors ) {
          throw data.values
        }
        users.push( data )
      }

      return users
    }
    else {
      throw new Error( 'Error fetching users' )
    }
  }

  async findById( id: ValidInteger ): Promise<UserResponse> {
    throw new Error( 'Method not implemented.' )
  }

  async update( user: User ): Promise<boolean> {
    return Promise.resolve( false )
  }

}
