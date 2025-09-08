'use client'
import useCartStore from '@/contexts/useCartStore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FiShoppingCart } from 'react-icons/fi'

export default function Cart() {
    const [isClient, setIsClient] = useState(false)
    const totalItems = useCartStore(state => state.getTotalItems())
    
    // Esperar a que el componente se monte en el cliente
    useEffect(() => {
        setIsClient(true)
    }, [])
    
    // No renderizar nada hasta que estemos en el cliente
    if (!isClient) {
        return null
    }

    return (
        <Link 
            href="/carrito" 
            aria-label={`Ver carrito de compras${totalItems > 0 ? `, ${totalItems} ${totalItems === 1 ? 'artículo' : 'artículos'}` : ''}`}
            className="relative inline-flex items-center rounded-md p-2"
        >
            <FiShoppingCart className="h-6 w-6 text-gray-700" aria-hidden="true" />
            {totalItems > 0 && (
                <span 
                    className="absolute -top-[4px] -right-[4px] bg-red-500 text-white text-xs rounded-full h-5 w-auto min-w-5 flex items-center p-1 justify-center"
                    role="status"
                    aria-live="polite"
                >
                    {totalItems}
                </span>
            )}
        </Link>
    )
}

