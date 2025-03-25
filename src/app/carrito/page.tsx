'use client'
import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Send } from 'lucide-react';
import useCartStore from '@/contexts/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
function CartPage() {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    getTotalPrice,
    getTotalItems,
    clearCart
  } = useCartStore();

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  // Calculate totals using context methods
  const totalItems = getTotalItems();
  const subtotal = getTotalPrice();

  // Calculate discount based on quantity
  const getDiscount = (items: number) => {
    if (items >= 500) return 0.35;
    if (items >= 200) return 0.30;
    if (items >= 100) return 0.25;
    if (items >= 50) return 0.20;
    if (items >= 15) return 0.15;
    return 0;
  };

  const currentDiscount = getDiscount(totalItems);
  const discountedTotal = subtotal * (1 - currentDiscount);

  // Get next discount threshold
  const getNextDiscountThreshold = (items: number) => {
    if (items < 15) return { target: 15, discount: 15 };
    if (items < 50) return { target: 50, discount: 20 };
    if (items < 100) return { target: 100, discount: 25 };
    if (items < 200) return { target: 200, discount: 30 };
    if (items < 500) return { target: 500, discount: 35 };
    return null;
  };

  const nextThreshold = getNextDiscountThreshold(totalItems);

  // Calculate progress to next discount
  const calculateProgress = () => {
    if (!nextThreshold) return 100;
    const progress = (totalItems / nextThreshold.target) * 100;
    return Math.min(progress, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
     <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product List */}
          <div className="flex-grow">
            {items.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Tu carrito está vacío</p>
                <Link href="/">
                  <button  className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                    Continuar Comprando
                  </button>
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm">
                {items.map((item) => (
                  <div key={item.id + item.color} className="p-4 flex items-center gap-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                    <Link href={`/categorias/hombres/${item.name.split('/')[0].trim().replace(/\s+/g, '-')}`}>
                    <Image
                      width={80}
                      height={80}
                      
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-auto h-20 object-fit rounded-lg"
                    />
                    </Link>
                 
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">SKU: {item.SKU}</p>
                      <p className="text-sm text-gray-500">Color: {item.color}</p> 
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <div className="font-medium">
                        {new Intl.NumberFormat('es-MX', {
                          style: 'currency',
                          currency: 'MXN'
                        }).format(item.price)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Intl.NumberFormat('es-MX', {
                          style: 'currency',
                          currency: 'MXN'
                        }).format(item.price * item.quantity)}
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {items?.length > 0 && (
            <div className="lg:w-80">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <div className='flex justify-between items-center mb-4'>
                  <h2 className="text-lg font-semibold">Resumen</h2>
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-6 w-6 text-gray-600" />
                      <span className="text-sm font-medium">{totalItems} {totalItems === 1 ? 'producto' : 'productos'}</span>
                  </div>
                </div>
  
                {/* Progress to next discount */}
                {nextThreshold && (
                  <div className="mb-4">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${calculateProgress()}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Agrega {nextThreshold.target - totalItems} {nextThreshold.target - totalItems === 1 ? 'artículo' : 'artículos'} más para obtener un <br /> 
                      <span className='font-bold'>{nextThreshold.discount}% de descuento</span>
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>
                      {new Intl.NumberFormat('es-MX', {
                        style: 'currency',
                        currency: 'MXN'
                      }).format(subtotal)}
                    </span>
                  </div>
                  {currentDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Descuento ({(currentDiscount * 100)}%)</span>
                      <span>
                        -{new Intl.NumberFormat('es-MX', {
                          style: 'currency',
                          currency: 'MXN'
                        }).format(subtotal * currentDiscount)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                    <span>Total</span>
                    <span>
                      {new Intl.NumberFormat('es-MX', {
                        style: 'currency',
                        currency: 'MXN'
                      }).format(discountedTotal)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={clearCart}
                  className="w-full mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Vaciar Carrito
                </button>

                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="w-full mt-3 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Solicitar Cotización
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Quote Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Solicitar Cotización</h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico"
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsQuoteModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Manejar solicitud de cotización
                  setIsQuoteModalOpen(false);
                  setEmail('');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Enviar Cotización
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;