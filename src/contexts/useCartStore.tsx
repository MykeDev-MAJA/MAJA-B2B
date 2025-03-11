import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definir la interfaz para un item del carrito
interface CartItem {
  id: number | string;
  SKU: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Definir la interfaz para el estado del carrito
interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number | string) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemById: (id: number | string) => CartItem | undefined;
}

// Crear el store con persistencia
const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item: CartItem) =>
        set((state) => {
          // Comprobar si el item ya existe
          const existingItem = state.items.find((i) => i.id === item.id);
          
          if (existingItem) {
            // Si existe, actualizar la cantidad
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          
          // Si no existe, añadir nuevo item
          return { items: [...state.items, item] };
        }),
        
      removeItem: (id: number | string) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
        
      updateQuantity: (id: number | string, quantity: number) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
        
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      
      getItemById: (id: number | string) => {
        return get().items.find((item) => item.id === id);
      },
    }),
    {
      name: 'cart-storage', // nombre para el almacenamiento
    }
  )
);

export default useCartStore;