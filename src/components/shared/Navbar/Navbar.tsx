"use client"
import { FiUser } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link"
import Cart from "./Cart";
import { AuthModal } from "@/components/shared/Dialog/Auth/auth-modal";
import { useUserStore } from "@/contexts/useUserContext";
import { useAuthModalStore } from "@/contexts/useAuthModalStore";
import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, LayoutDashboard, Home } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const { isOpen: isAuthModalOpen, onOpen: openAuthModal, onClose: closeAuthModal } = useAuthModalStore();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isInDashboard = pathname === '/dashboard';

  return (
    <nav 
      className="sticky max-w-screen mx-auto top-0 z-50 flex h-15 items-center justify-between p-4 border-b px-8 bg-white"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="flex-shrink-0 flex">


      <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="flex md:hidden">
          <Menu className="h-5 w-5 transition-opacity" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] border-none bg-white/95 backdrop-blur-sm sm:w-[280px]">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold">CATEGORÍAS</SheetTitle>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="h-8 w-8 rounded-full">
            </Button>
          </div>
        </SheetHeader>
        <div className="mt-8 flex flex-col space-y-1">
            {categories.map((category) => (
              <Link
              prefetch={true}
              key={category.href}
              href={category.href}
              className="group relative py-3 text-base font-light ml-4 tracking-wide text-neutral-800 transition-colors"
              onClick={() => setOpen(false)}
            >
              {category.name}
              <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-black transition-all duration-300 ease-in-out group-hover:w-full" />
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>



        <Link     
          prefetch={true}
          className="md:flex hidden"
          href="/" aria-label="Ir a la página principal">
          <Image
            src="/images/maja_corp_logo.svg"
            alt="MAJA Corp Logo"
            width={100}
            height={20.9}
            priority
          />
        </Link>

        <div className="hidden xl:flex ml-20 font-medium flex-1 gap-8">
          <Link href="/categorias/hombres" prefetch={true}>
          <div className="flex-1">HOMBRE</div>
          </Link>
          <Link href="/categorias/mujeres" prefetch={true}  >
          <div className="flex-1">MUJER</div>
          </Link>
        </div>




      </div>

      <Image
        className="absolute right-1/2 md:block"
        src="/images/Iconos/Propela_Negro.svg"
        alt="Propela"
        style={{
          transformOrigin: 'center',
          width: 'auto',
          height: '40px',
          transform: 'translate(50%)'
        }}
        width={50}
        height={50}
      />

      <div className="flex items-center md:space-x-6" role="group" aria-label="Acciones de usuario">
        <div className="flex items-center space-x-2">
          <div className="flex flex-col text-sm">
            {!user ? (
              <button 
                className="flex items-center space-x-2 cursor-pointer rounded-md p-2"
                aria-label="Abrir menú de inicio de sesión"
                onClick={openAuthModal}
              >
                <FiUser className="h-6 w-6 text-gray-700" aria-hidden="true" />
                <span className="hidden sm:block">Iniciar Sesión</span>
              </button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div 
                    className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium cursor-pointer"
                    aria-label={`Avatar de ${user.name}`}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {isInDashboard ? (
                    <Link href="/">
                      <DropdownMenuItem>
                        <Home className="mr-2 h-4 w-4" />
                        <span>Inicio</span>
                      </DropdownMenuItem>
                    </Link>
                  ) : (
                    <Link href="/dashboard">
                      <DropdownMenuItem>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Mi cuenta</span>
                      </DropdownMenuItem>
                    </Link>
                  )}
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {isAuthModalOpen && (
              <AuthModal 
                onLoginSuccess={closeAuthModal}
                onClose={closeAuthModal}
              />
            )}
          </div>
        </div>
        <Cart />
      </div>
    </nav>
  );
};

export default Navbar;


const categories = [
  { name: "Hombre", href: "/categorias/hombres" },
  { name: "Mujer", href: "/categorias/mujeres" },
]
