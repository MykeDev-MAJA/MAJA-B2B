import React from 'react'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'

export const Footer = () => {
  return (
    <div className='bg-[#1F1F21] text-white py-8'>
      <div className='container mx-auto px-4'>
        <img 
          src="https://majasportswear.com/wp-content/uploads/2024/09/maja_footer_logo_d.svg" 
          alt="Maja Sportswear Logo" 
          className="w-32 h-auto mb-4 mx-auto"
        />
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='space-y-2 text-left'>
            <h4 className='text-lg font-semibold'>Dirección</h4>
            <p className='text-gray-400'>
              Alfonso Zaragoza Maytorena 1980 Int.507
              Desarrollo Urbano Tres Ríos
              Culiacán, Sinaloa México
            </p>
            <h4 className='text-lg font-semibold'>Contacto atención al cliente</h4>
            <p className='text-gray-400 text-center'>
              Atención via Whatsapp: 667 426 7327
            </p>
            <p className='text-gray-400 text-center'>
              Atención al cliente: 667 690 3738 ext. 130
            </p>
          </div>
          <div className='space-y-2 text-left'>
            <h4 className='text-lg font-semibold'>Horario atención al cliente</h4>
            <p className='text-gray-400 text-center'>
              <span className='font-medium text-gray-200'>Lunes a viernes </span> <br />
              9:00 hrs – 16:00 hrs
            </p>
            <p className='text-gray-400 text-center'>
              <span className='font-medium text-gray-200'>Sábado </span> <br />
              10:00 hrs – 13:00 hrs
            </p>
          </div>
          <div className='space-y-2 text-left'>
            <h4 className='text-lg font-semibold'>Correo</h4>
            <p className='text-gray-400'>
              <span className='font-medium text-gray-200'>Información en general: </span> <br />
              info@majasportswear.com
            </p>
            <p className='text-gray-400'>
              <span className='font-medium text-gray-200'>Atención pedidos online: </span> <br />
              pedidos@majasportswear.com
            </p>
            <div className='flex justify-center gap-8 mt-6'>
              <FaWhatsapp className="h-6 w-6 text-white mx-2 cursor-pointer" />
              <FaFacebookF className="h-6 w-6 text-white mx-2 cursor-pointer" />
              <FaInstagram className="h-6 w-6 text-white mx-2 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
