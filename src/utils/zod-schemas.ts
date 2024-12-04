import { z } from 'zod'

export const passwordSchema =   z.string({
  message: 'Ingrese contraseña'
})
                          .min( 8,{
                            message: 'Contraseña debe tener al menos 8 caracteres'
                          } )
                          .regex( RegExp( /^(?=.*[a-z]).*$/ ),
                            {
                              message: 'Contraseña debe tener al menos una letra minúscula'
                            } )
                          .regex( RegExp( /^(?=.*[A-Z]).*$/ ),
                            {
                              message: 'Contraseña debe tener al menos una letra mayúscula'
                            } )
                          .regex( RegExp( /^(?=.*\d).*$/ ),
                            {
                              message: 'Contraseña debe tener al menos un número'
                            } )
                          .regex( RegExp( /^(?=.*[$@!?&]).*$/ ),
                            {
                              message: 'Contraseña debe tener al menos un caracter especial'
                            } )
