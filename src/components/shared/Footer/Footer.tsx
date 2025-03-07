import React from 'react'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import Image from 'next/image'
export const Footer = () => {
  return (
    <div className='bg-[#1F1F21] text-white h-fit py-12 '>
      <div className='flex flex-col  container mx-auto px-4 '>
      <Image 
              src="https://majasportswear.com/wp-content/uploads/2024/09/maja_footer_logo_d.svg" 
              alt="Maja Sportswear Logo" 
              width={128}
              height={32}
              className="w-32 h-auto mb-4 px-2"
            />
      <div className='container flex  px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 '>
          <div className='space-y-2'>
           
            <p className='text-lg font-semibold'>Dirección</p>
            <p className='text-gray-400'>
              Alfonso Zaragoza Maytorena 1980 Int.507
Desarrollo Urbano Tres Ríos
Culiacán, Sinaloa México
            </p>
            <p className='text-lg font-semibold'>Contacto atención al cliente</p>
            <p className='text-gray-400'>
            Atención via Whatsapp:
            667 426 7327
            </p>
            <p className='text-gray-400'>
            Atención al cliente:
667 690 3738  ext. 130
            </p>
          </div>
          <div id='horario' className='space-y-2 text-left mx-auto'>
           
           <p className='text-lg font-semibold'>Horario atención al cliente</p>
           <p className='text-gray-400'>
           <span className='font-medium text-gray-200'>Lunes a viernes </span> <br />
           9:00 hrs – 16:00 hrs
           </p>
           <p className='text-gray-400'>
           <span className='font-medium text-gray-200'>Sabado </span> <br />
           10:00 hrs – 13:00 hrs
           </p>

      
         </div>
         <div id='contact' className='space-y-2 text-left mx-auto'>
           <p className='text-lg font-semibold'>Correo</p>
           <p className='text-gray-400'>
           <span className='font-medium text-gray-200'>Información en general: </span> <br />
           info@majasportswear.com
           </p>
           <p className='text-gray-400'>
           <span className='font-medium text-gray-200'>Atención pedidos online: </span> <br />
           pedidos@majasportswear.com
           </p>
           <div className='flex gap-8 mt-6'>
           <FaWhatsapp className="h-6 w-6 text-white mx-2 cursor-pointer" />
           <FaFacebookF className="h-6 w-6 text-white mx-2 cursor-pointer" />
           <FaInstagram className="h-6 w-6 text-white mx-2 cursor-pointer" />
           </div>
         </div>
        </div>
        
      </div>

      </div>
   
    </div>
  )
}
