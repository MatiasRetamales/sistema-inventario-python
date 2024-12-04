import { Errors } from 'app/modules/shared/domain/exceptions/base-exception'
import { findAllUsers } from 'app/modules/user/application/find-all-users'
import { UserResponse } from 'app/modules/user/domain/user-response'
import { UserApiData } from 'app/modules/user/infrastructure/user-api-data'
import { defineStore } from 'pinia'
import {
  computed,
  ref
} from 'vue'

export const useUser = defineStore( 'user', () => {

  const user     = ref<UserResponse | undefined>( undefined )
  const log      = ref( false )
  const userList = ref<UserResponse[]>( [] )

  const getUsers = async (
    from : number,
    limit: number
  ) => {
    const repo     = new UserApiData()
    const users    = await findAllUsers( repo, from,limit )
    userList.value = users instanceof Errors ? [] : users
  }

  const login = () => {
    log.value = true
  }

  const logout = () => {
    log.value = false
  }

  return {
    user,
    login,
    logout,
    getUsers,
    userList,
    // isSignedIn: computed( () => user.value !== undefined ),
    isSignedIn: computed( () => log )
  }
} )
