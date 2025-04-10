'use client'
import React, { useState, useTransition } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Send, User, Building2, Mail, Phone, FileText, ArrowRight } from 'lucide-react';
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
import jsPDF from 'jspdf';
import { numeroATexto } from './components/ConvertidorTexto';

const CartPage = () => {
  const [isPending, startTransition] = useTransition();
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
    rfc: '',
    companyName: ''
  });
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    rfc: '',
    companyName: ''
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
      rfc: '',
      companyName: ''
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


 const handleQuoteSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Set default font
    doc.setFont("helvetica");

    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 25, "F");

    // Luego el texto
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("Cotización", 20, 17);

    // Por último, dibujamos la imagen
    const imgUrl = "/images/Logos/MajaCorpBlanco.png";
    doc.addImage(imgUrl, "PNG", 140, 9, 50, 10);

    doc.setTextColor(50, 50, 50);
    doc.setFontSize(14);
    doc.text("Información del Cliente", 20, 40);

    doc.setDrawColor(220, 220, 220);
    doc.line(20, 43, 190, 43);

    // Customer details with improved typography
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("Nombre:", 20, 55);
    doc.text("Empresa:", 20, 65);
    doc.text("Email:", 20, 75);
    doc.text("Teléfono:", 20, 85);
    doc.text("RFC:", 20, 95);

    // Customer values in bold
    doc.setFont("helvetica", "bold");
    doc.setTextColor(50, 50, 50);
    doc.text(formData.fullName, 60, 55);
    doc.text(formData.companyName || "N/A", 60, 65);
    doc.text(formData.email, 60, 75);
    doc.text(formData.phone, 60, 85);
    doc.text(formData.rfc || "N/A", 60, 95);

    // Date with subtle styling
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    const currentDate = new Date().toLocaleDateString("es-MX");
    doc.text(`Fecha: ${currentDate}`, 20, 105);

    // Products section header
    doc.setFontSize(14);
    doc.setTextColor(50, 50, 50);
    doc.text("Productos", 20, 120);

    // Separator line
    doc.setDrawColor(220, 220, 220);
    doc.line(20, 123, 190, 123);

    // Table header with minimalist styling
    let y = 135;
    doc.setFillColor(0, 0, 0);
    doc.rect(20, y, 170, 10, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text("Descripción", 25, y + 7);
    doc.text("SKU", 80, y + 7);
    doc.text("Color", 100, y + 7);
    doc.text("Cantidad", 130, y + 7);
    doc.text("Precio Unit.", 150, y + 7);
    doc.text("Subtotal", 170, y + 7);

    // Add items with clean styling
    y += 15;
    items.forEach((item, index) => {
      // Check if we need a new page
      if (y > 250) {
        doc.addPage();
        y = 20;
      }

      // Subtle alternating row colors
      if (index % 2 === 0) {
        doc.setFillColor(248, 248, 248);
      } else {
        doc.setFillColor(255, 255, 255);
      }
      doc.rect(20, y, 170, 10, "F");

      // Item details
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(70, 70, 70);
      doc.text(item.name.replace(/\s+[^\s/]+\s*\//, " /"), 25, y + 7);
      doc.text(item.SKU, 80, y + 7);
      doc.text(item.color, 100, y + 7);
      doc.text(item.quantity.toString(), 130, y + 7);
      doc.text(new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.price), 150, y + 7);
      doc.text(
        new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(item.price * item.quantity),
        170,
        y + 7,
      );

      y += 12;
    });

    // Summary section with minimalist styling
    y += 10;

    // Check if there's enough space for the entire summary section (approximately 70mm needed)
    if (y + 70 > 270) { // 270mm is close to the bottom of the page, considering margins
      doc.addPage();
      y = 20; // Reset y to top of new page
    }

    doc.setFillColor(248, 248, 248);
    doc.rect(20, y, 170, 80, "F");

    doc.setFont("helvetica");
    doc.setFontSize(14);
    doc.setTextColor(50, 50, 50);
    doc.text("Resumen", 25, y + 10);

    // Summary details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Subtotal:", 25, y + 25);
    doc.text(new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(subtotal), 160, y + 25);

    if (currentDiscount > 0) {
      doc.setTextColor(0, 130, 0);
      doc.text(`Descuento (${currentDiscount * 100}%):`, 25, y + 35);
      doc.text(
        `-${new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(subtotal * currentDiscount)}`,
        160,
        y + 35,
      );
    }

    if (currentDiscount > 0) {
    doc.setTextColor(50, 50, 50);
    doc.text("Subtotal con descuento:", 25, y + 45);
    doc.text(
      new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(discountedTotal),
      160,
      y + 45,
    )};

    doc.text("IVA (16%):", 25, y + 55);
    doc.text(
      new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(discountedTotal * 0.16),
      160,
      y + 55,
    );

    // Total with emphasis
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Total:", 25, y + 65);
    doc.text(
      new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(discountedTotal * 1.16),
      160,
      y + 65,
    );

    // Add amount in words
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(70, 70, 70);
    doc.text(numeroATexto(discountedTotal * 1.16), 25, y + 72);

    // Add IVA note
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
   

    // Footer with company information - moved to bottom of page with more space
    const pageCount = doc.internal.pages.length;
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      // Add more space at the bottom by moving the footer up
      doc.text("© 2025 MAJASPORTSWEAR. Todos los derechos reservados.", 20, 290);
    }

    // Save the PDF
    doc.output('dataurlnewwindow'); // Abre una nueva ventana con previsualización
    doc.save(`cotizacion_${formData.fullName.replace(/\s+/g, "_")}_${currentDate.replace(/\//g, "-")}.pdf`);

    // Handle quote submission
    console.log("Quote Request:", {
      customerInfo: formData,
      cartDetails: {
        items: items.map((item) => ({
          name: item.name,
          SKU: item.SKU,
          color: item.color,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.price * item.quantity,
        })),
      },
    });

    setIsQuoteModalOpen(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      rfc: "",
      companyName: "",
    });
    setFormErrors({
      fullName: "",
      email: "",
      phone: "",
      rfc: "",
      companyName: "",
    });


    // Navigate to home
    await router.push("/");

    // Clear cart after navigation
    setTimeout(() => {
      clearCart();
    }, 100);
  };
;

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
                      onClick={() => startTransition(() => removeItem(item.id))}
                      className={`p-2 text-black hover:bg-black-40 rounded-full transition-colors ${isPending ? 'opacity-50' : ''}`}
                      disabled={isPending}
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
                      onClick={() => startTransition(() => removeItem(item.id))}
                      className={`p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors ${isPending ? 'opacity-50' : ''}`}
                      disabled={isPending}
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
                    <span>{currentDiscount > 0 ? 'Neto' : 'Subtotal'}</span>
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
                   {currentDiscount > 0 && (
                    <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>
                        {new Intl.NumberFormat('es-MX', {
                          style: 'currency',
                          currency: 'MXN'
                        }).format(subtotal - (subtotal * currentDiscount) )}
                      </span>
                  </div>)}
                  <div className="flex justify-between text-gray-600">
                    <span>IVA</span>
                    <span>
                        {new Intl.NumberFormat('es-MX', {
                          style: 'currency',
                          currency: 'MXN'
                        }).format(discountedTotal * 0.16 )}
                      </span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                    <span>Total</span>
                    <span>
                      {new Intl.NumberFormat('es-MX', {
                        style: 'currency',
                        currency: 'MXN'
                      }).format(discountedTotal * 1.16)}
                    </span>
                  </div>
                </div>

          

                <div className="flex gap-2 mt-3">
                  <Button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="flex-[3] px-4 py-2 bg-gradient-to-r from-zinc-800 to-black hover:from-zinc-600 hover:to-zinc-900 text-white rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <Send className="h-4 w-4" />
                    Solicitar Cotización
                  </Button>

                  <Button
                    onClick={clearCart}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Quote Modal */}
      <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
      <DialogContent 
        title="Solicitar Cotización"
        className="max-w-md p-0 overflow-hidden border-0 shadow-xl rounded-xl bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r "></div>

        <DialogHeader className="px-7 pt-7 pb-5">
          <DialogTitle className="text-2xl font-semibold tracking-tight text-slate-800 dark:text-slate-100">
            Solicitar Cotización
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Complete el formulario para recibir una cotización personalizada.
          </DialogDescription>
        </DialogHeader>

        <div className="px-7 py-5 space-y-6">
          <div className="space-y-5">
            <div className="space-y-2.5">
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
              >
                <User size={14} className="text-emerald-500" />
                Nombre Completo <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleFormChange}
                className={`h-11 px-4 bg-white dark:bg-slate-900 border transition-all duration-200 focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 ${
                  formErrors.fullName
                    ? "border-rose-300 dark:border-rose-800 shadow-[0_0_0_1px_rgba(225,29,72,0.2)]"
                    : "border-slate-200 dark:border-slate-800"
                }`}
                required
              />
              {formErrors.fullName && (
                <p className="text-xs font-medium text-rose-500 flex items-center gap-1.5 mt-1.5 animate-fadeIn">
                  {formErrors.fullName}
                </p>
              )}
            </div>

            <div className="space-y-2.5">
              <Label
                htmlFor="companyName"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
              >
                <Building2 size={14} className="text-emerald-500" />
                Nombre de la Empresa
              </Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleFormChange}
                className="h-11 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-200 focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
              />
            </div>

            <div className="space-y-2.5">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
              >
                <Mail size={14} className="text-emerald-500" />
                Correo Electrónico <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleFormChange}
                className={`h-11 px-4 bg-white dark:bg-slate-900 border transition-all duration-200 focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 ${
                  formErrors.email
                    ? "border-rose-300 dark:border-rose-800 shadow-[0_0_0_1px_rgba(225,29,72,0.2)]"
                    : "border-slate-200 dark:border-slate-800"
                }`}
                required
              />
              {formErrors.email && (
                <p className="text-xs font-medium text-rose-500 flex items-center gap-1.5 mt-1.5 animate-fadeIn">
                  {formErrors.email}
                </p>
              )}
            </div>

            <div className="space-y-2.5">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
              >
                <Phone size={14} className="text-emerald-500" />
                Teléfono <span className="text-rose-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleFormChange}
                className={`h-11 px-4 bg-white dark:bg-slate-900 border transition-all duration-200 focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 ${
                  formErrors.phone
                    ? "border-rose-300 dark:border-rose-800 shadow-[0_0_0_1px_rgba(225,29,72,0.2)]"
                    : "border-slate-200 dark:border-slate-800"
                }`}
                required
              />
              {formErrors.phone && (
                <p className="text-xs font-medium text-rose-500 flex items-center gap-1.5 mt-1.5 animate-fadeIn">
                  {formErrors.phone}
                </p>
              )}
            </div>

            <div className="space-y-2.5">
              <Label
                htmlFor="rfc"
                className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
              >
                <FileText size={14} className="text-emerald-500" />
                RFC
              </Label>
              <Input
                id="rfc"
                name="rfc"
                value={formData.rfc}
                onChange={handleFormChange}
                className="h-11 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-200 focus-visible:ring-1 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="px-7 py-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 flex flex-col sm:flex-row justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setIsQuoteModalOpen(false)}
            className="h-9 px-4 border border-zinc-800 hover:bg-zinc-200 transition-all duration-200 "
          >
            Cancelar
          </Button>
          <Button
            onClick={handleQuoteSubmit}
            className="h-9 px-4 bg-gradient-to-r from-zinc-800 to-black hover:from-zinc-700 hover:to-zinc-900 text-white border-0 transition-all duration-200 shadow-md hover:shadow-lg group"
          >
            Enviar Cotización
            <ArrowRight size={16} className="ml-2 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    </div>
  );
};

export default CartPage;
