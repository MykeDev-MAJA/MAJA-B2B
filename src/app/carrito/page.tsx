'use client'
import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Send } from 'lucide-react';
import useCartStore from '@/contexts/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,

} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner';
import jsPDF from 'jspdf';

function CartPage() {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    getTotalPrice,
    getTotalItems,
    clearCart
  } = useCartStore();
  const router = useRouter();

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    rfc: ''
  });
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    rfc: ''
  });
  const [editingQuantity, setEditingQuantity] = useState<{ id: number | string; value: string } | null>(null);

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

  const handleQuantityChange = (id: number | string, value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      updateQuantity(id, numValue);
    }
    setEditingQuantity(null);
  };

  const handleQuantityBlur = () => {
    if (editingQuantity) {
      handleQuantityChange(editingQuantity.id, editingQuantity.value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && editingQuantity) {
      handleQuantityChange(editingQuantity.id, editingQuantity.value);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {
      fullName: '',
      email: '',
      phone: '',
      rfc: ''
    };
    let isValid = true;

    // Validate fullName
    if (!formData.fullName.trim()) {
      errors.fullName = 'El nombre es requerido';
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'El correo es requerido';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Ingrese un correo válido';
      isValid = false;
    }

    // Validate phone
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es requerido';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Ingrese un teléfono válido (10 dígitos)';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleQuoteSubmit = () => {
    if (!validateForm()) {
      return;
    }

    // Create PDF with A4 dimensions
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Set default font
    doc.setFont('helvetica');
    
    // Add company header with modern styling
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('Cotización', 20, 20);
    
    // Add customer information section with clean layout
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text('Información del Cliente', 20, 45);
    
    // Add subtle separator line
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 48, 190, 48);
    
    // Customer details with improved typography
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Nombre:', 20, 60);
    doc.text('Email:', 20, 70);
    doc.text('Teléfono:', 20, 80);
    doc.text('RFC:', 20, 90);
    
    // Customer values in bold
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(formData.fullName, 60, 60);
    doc.text(formData.email, 60, 70);
    doc.text(formData.phone, 60, 80);
    doc.text(formData.rfc || 'N/A', 60, 90);

    // Add date with subtle styling
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    const currentDate = new Date().toLocaleDateString('es-MX');
    doc.text(`Fecha: ${currentDate}`, 20, 100);

    // Products section header
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Productos', 20, 120);
    
    // Add subtle separator line
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 123, 190, 123);
    
    // Table header with modern styling
    let y = 140;
    doc.setFillColor(245, 245, 245);
    doc.rect(20, y, 170, 10, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Descripción', 25, y + 7);
    doc.text('SKU', 80, y + 7);
    doc.text('Color', 100, y + 7);
    doc.text('Cantidad', 130, y + 7);
    doc.text('Precio Unit.', 150, y + 7);
    doc.text('Subtotal', 170, y + 7);

    // Add items with alternating row colors
    y += 15;
    items.forEach((item, index) => {
      // Check if we need a new page
      if (y > 250) {
        doc.addPage();
        y = 20;
      }

      // Alternate row colors for better readability
      if (index % 2 === 0) {
        doc.setFillColor(250, 250, 250);
      } else {
        doc.setFillColor(255, 255, 255);
      }
      doc.rect(20, y, 170, 10, 'F');

      // Item details
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.text(item.name.replace(/\s+[^\s/]+\s*\//, ' /'), 25, y + 7);
      doc.text(item.SKU, 80, y + 7);
      doc.text(item.color, 100, y + 7);
      doc.text(item.quantity.toString(), 130, y + 7);
      doc.text(new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(item.price), 150, y + 7);
      doc.text(new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(item.price * item.quantity), 170, y + 7);
      
      y += 15;
    });

    // Summary section with modern styling
    y += 10;
    doc.setFillColor(245, 245, 245);
    doc.rect(20, y, 170, 55, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Resumen', 25, y + 10);
    
    // Summary details
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Subtotal:', 25, y + 25);
    doc.text(new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(subtotal), 160, y + 25);
    
    if (currentDiscount > 0) {
      doc.setTextColor(0, 150, 0);
      doc.text(`Descuento (${(currentDiscount * 100)}%):`, 25, y + 35);
      doc.text(`-${new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(subtotal * currentDiscount)}`, 160, y + 35);
    }
    
    // Total with emphasis
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Total:', 25, y + 45);
    doc.text(new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(discountedTotal), 160, y + 45);

    // Footer with company information
    const pageCount = doc.internal.pages.length;
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text('© 2025 MAJASPORTSWEAR. Todos los derechos reservados.', 20, 285);
    }

    // Save the PDF
    doc.save(`cotizacion_${formData.fullName.replace(/\s+/g, '_')}_${currentDate.replace(/\//g, '-')}.pdf`);

    // Handle quote submission
    console.log('Quote Request:', {
      customerInfo: formData,
      cartDetails: {
        items: items.map(item => ({
          name: item.name,
          SKU: item.SKU,
          color: item.color,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.price * item.quantity
        }))
      }
    });
    
    setIsQuoteModalOpen(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      rfc: ''
    });
    setFormErrors({
      fullName: '',
      email: '',
      phone: '',
      rfc: ''
    });

    toast.success('Cotización enviada correctamente');
    router.push('/');
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
                  <div key={item.id + item.color} className='border-b last:border-b-0'>
                     <div  className="p-4 flex items-center gap-4  hover:bg-gray-50 transition-colors">
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
                      <h3 className="font-medium text-sm md:text-base text-gray-800">
                        {item.name.replace(/\s+[^\s/]+\s*\//, ' /')}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500">SKU: {item.SKU}</p>
                      <p className="text-xs md:text-sm text-gray-500">Color: {item.color}</p> 
                    </div>



                    
              
                    <div className='hidden md:flex items-center gap-4'>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        {editingQuantity?.id === item.id ? (
                          <input
                            type="number"
                            min="1"
                            value={editingQuantity.value}
                            onChange={(e) => setEditingQuantity({ id: item.id, value: e.target.value })}
                            onBlur={handleQuantityBlur}
                            onKeyPress={handleKeyPress}
                            className="w-12 text-center border rounded-md py-1 px-0 appearance-none"
                            style={{
                              MozAppearance: 'textfield',
                            }}
                            autoFocus
                          />
                        ) : (
                          <span 
                            className="w-12 text-center cursor-pointer hover:bg-gray-100 rounded py-1 inline-block"
                            onClick={() => setEditingQuantity({ id: item.id, value: item.quantity.toString() })}
                          >
                            {item.quantity}
                          </span>
                        )}
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-right min-w-[100pfx]">
                   
                      <div className="text-sm text-gray-500">
                        {new Intl.NumberFormat('es-MX', {
                          style: 'currency',
                          currency: 'MXN'
                        }).format(item.price)}
                      </div>
                      <div className="font-medium min-w-[120px] text-right">
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
                  </div>



{/* ESTA SECCION SOLO SE MUESTRA EN CELULAR */}
                  <div className='flex items-center md:hidden gap-1 justify-between px-3 pb-2 '>
                  <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      {editingQuantity?.id === item.id ? (
                        <input
                          type="number"
                          min="1"
                          value={editingQuantity.value}
                          onChange={(e) => setEditingQuantity({ id: item.id, value: e.target.value })}
                          onBlur={handleQuantityBlur}
                          onKeyPress={handleKeyPress}
                          className="w-12 text-center border rounded-md py-1 px-0 appearance-none"
                          style={{
                            MozAppearance: 'textfield',
                          }}
                          autoFocus
                        />
                      ) : (
                        <span 
                          className="w-12 text-center cursor-pointer hover:bg-gray-100 rounded py-1 inline-block"
                          onClick={() => setEditingQuantity({ id: item.id, value: item.quantity.toString() })}
                        >
                          {item.quantity}
                        </span>
                      )}
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-right min-w-[120px] flex items-center justify-end">
                      <div className="font-medium min-w-[120px] text-right">
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
                  </div>
               





                ))}
              </div>
            )}
          </div>

          {/* RESUMEN DEL CARRITO */}
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
                    <p className="text-xs text-gray-600 mt-2">
                      Agrega {nextThreshold.target - totalItems} {nextThreshold.target - totalItems === 1 ? 'artículo' : 'artículos'} más para obtener un <br /> 
                      <span className='font-bold'>{nextThreshold.discount}% de descuento</span>
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className={currentDiscount > 0 ? 'line-through' : ''}>
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
      <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
      <DialogContent className="max-w-md p-0 overflow-hidden border shadow-lg rounded-lg" title="Solicitar Cotización">
        <DialogHeader className="px-6 py-5 border-b bg-card">
          <DialogTitle className="text-xl font-semibold">Solicitar Cotización</DialogTitle>
          <DialogDescription className="mt-1.5 text-sm text-muted-foreground">
            Complete el formulario para recibir una cotización personalizada.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-5 space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">
                Nombre Completo <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleFormChange}
                className={`h-10 transition-all focus-visible:ring-1 ${formErrors.fullName ? 'border-red-500' : ''}`}
                required
              />
              {formErrors.fullName && (
                <p className="text-xs text-red-500">{formErrors.fullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Correo Electrónico <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleFormChange}
                className={`h-10 transition-all focus-visible:ring-1 ${formErrors.email ? 'border-red-500' : ''}`}
                required
              />
              {formErrors.email && (
                <p className="text-xs text-red-500">{formErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Teléfono <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleFormChange}
                className={`h-10 transition-all focus-visible:ring-1 ${formErrors.phone ? 'border-red-500' : ''}`}
                required
              />
              {formErrors.phone && (
                <p className="text-xs text-red-500">{formErrors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rfc" className="text-sm font-medium">
                RFC
              </Label>
              <Input
                id="rfc"
                name="rfc"
                value={formData.rfc}
                onChange={handleFormChange}
                className="h-10 transition-all focus-visible:ring-1"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t bg-muted/30 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsQuoteModalOpen(false)} className="h-10 px-4 transition-colors">
            Cancelar
          </Button>
          <Button onClick={handleQuoteSubmit} className="h-10 px-4 bg-primary hover:bg-primary/90 transition-colors">
            Enviar Cotización
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    </div>
  );
}

export default CartPage;