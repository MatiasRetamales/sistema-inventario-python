import { UserResponse } from 'app/modules/user/domain/user-response'
import { defineStore } from 'pinia'
import {
  computed,
  ref
} from 'vue'

export const useUser = defineStore( 'user', () => {

  const user = ref<UserResponse | undefined>( undefined )
  const log = ref(false)

  const login = ()=>{
    log.value = true
  }

  return {
    user,
    login,
    // isSignedIn: computed( () => user.value !== undefined ),
    isSignedIn: computed( () => log ),
  }
} )
