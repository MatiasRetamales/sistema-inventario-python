import {
  BaseException,
  Errors
} from 'app/modules/shared/domain/exceptions/base-exception'

export function wrapType<T, Err extends BaseException>( returnFunction: () => T ): T | BaseException {
  try {
    return returnFunction()
  }
  catch ( e: unknown ) {
    return e as BaseException
  }
}

export async function wrapTypeAsync<T, Err extends BaseException>( returnFunction: () => Promise<T> ): Promise<T | BaseException> {
  try {
    return await returnFunction()
  }
  catch ( e: unknown ) {
    return e as BaseException
  }
}

export function wrapTypeDefault<T, R, E extends BaseException>(
  defaultValue: T,
  returnFunction: ( value: R ) => T,
  updaterValue ?: R ): T | BaseException {
  if ( updaterValue === null || updaterValue === undefined ) {
    return defaultValue
  }
  else {
    return wrapType<T, E>( () => returnFunction( updaterValue ) )
  }
}


export async function wrapTypeErrors<T, Err extends BaseException>( returnFunction: () => T ): Promise<T | Errors> {
  try {
    return await returnFunction()
  }
  catch ( e: unknown ) {
    const err = e as Err

    const errors: BaseException[] = []

    for ( const err of e as BaseException[] ) {
      errors.push( err )
    }

    return new Errors( errors )
  }
}
