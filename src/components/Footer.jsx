import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = _ => {
    return (
        <div className='contFooter'>
            <div className='FooterInfo'>
                <Link>Sobre Nosotros</Link>
                <Link>Terminos y Condiciones</Link>
                <Link>Contacto</Link>
            </div>
            <div>
                © Derechos Reservados
            </div>
        </div>
    )
}
