import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogTrigger } from "@/components/ui/dialog"

// Definición de tipos para las props
interface DialogContentCotizacionProps {
  totalItems: number;
  subtotal: number;
  discountedTotal: number;
  currentDiscount: number;
  onSubmit: (e: React.FormEvent) => void;
  email: string;
  setEmail: (email: string) => void;
}

const DialogContentCotizacion = ({ totalItems, subtotal, discountedTotal, currentDiscount, onSubmit, email, setEmail }: DialogContentCotizacionProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="rounded-lg bg-muted p-4 space-y-3">
        <h4 className="font-medium">Resumen de cotización</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total de productos</span>
            <span>{totalItems}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          
          {currentDiscount > 0 && (
            <div className="flex justify-between text-green-600 dark:text-green-500">
              <span>Descuento ({(currentDiscount * 100).toFixed(0)}%)</span>
              <span>-{formatCurrency(subtotal - discountedTotal)}</span>
            </div>
          )}
          
          <div className="flex justify-between pt-2 border-t">
            <span className="font-medium">Total</span>
            <span className="font-medium">
              {formatCurrency(discountedTotal)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <DialogTrigger asChild>
          <Button variant="outline" type="button">
            Cancelar
          </Button>
        </DialogTrigger>
        <DialogClose asChild>
          <Button 
            type="submit" 
            disabled={!/\S+@\S+\.\S+/.test(email)}
          >
            Enviar
          </Button>
        </DialogClose>
      </div>
    </form>
  )
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  }).format(amount);
};

export default DialogContentCotizacion