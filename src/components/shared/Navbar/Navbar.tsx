"use client"
import { FiUser } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link"
import Cart from "./Cart";
import { AuthModal } from "@/components/shared/Dialog/Auth/auth-modal";
import { useUserStore } from "@/contexts/useUserContext";
import { useState } from "react";

const Navbar = () => {
  const user = useUserStore((state) => state.user);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <nav 
      className="sticky top-0 z-50 flex h-15 items-center justify-between p-4 border-b px-8 bg-white"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="flex-shrink-0 flex">
        <Link href="/" aria-label="Ir a la página principal">
          <Image
            src="/images/maja_corp_logo.svg"
            alt="MAJA Corp Logo"
            width={100}
            height={20.9}
            priority
          />
        </Link>

        <div className="hidden xl:flex ml-20 font-medium flex-1 gap-8">
          <div className="flex-1">HOMBRE</div>

          <div className="flex-1">MUJER</div>
        </div>




      </div>

      <Image
        className="absolute right-1/2 hidden md:block"
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
                onClick={() => setIsAuthModalOpen(true)}
              >
                <FiUser className="h-6 w-6 text-gray-700" aria-hidden="true" />
                <span className="hidden sm:block">Iniciar Sesión</span>
              </button>
            ) : (
              <div 
                className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium cursor-pointer"
                aria-label={`Avatar de ${user.name}`}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            {isAuthModalOpen && (
              <AuthModal 
                onLoginSuccess={() => setIsAuthModalOpen(false)}
                onClose={() => setIsAuthModalOpen(false)}
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
