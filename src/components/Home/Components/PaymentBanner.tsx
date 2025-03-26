import React from 'react'
import Image from 'next/image'
const PaymentBanner = () => {
  return (
    <>
        <div className="flex items-center justify-evenly h-auto bg-gray-100">
            <div className="flex items-center justify-center">
                <Image style={{width: 'auto', height: '73px'}} src="/images/Logos/MercadoLibre.svg" alt="Visa" width={100} height={73} />
            </div>
            <div className="flex items-center justify-center">
                <Image  src="/images/Logos/PayPalLogo.svg" alt="Mastercard" width={100} height={100} />
            </div>
     
        </div>
    </>
  )
}

export default PaymentBanner