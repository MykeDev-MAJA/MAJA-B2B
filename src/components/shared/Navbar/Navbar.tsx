
import { FiUser } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link"
import Cart from "./Cart";
const Navbar = () => {
  
  return (
    <nav className="sticky top-0 z-50 flex h-15 items-center justify-between p-4 border-b px-8 bg-white">
      <div className="flex-shrink-0">
        <Link href="/">
        <Image
          src="/images/maja_corp_logo.svg"
          alt="MAJA Corp Logo"
          width={100}
          height={20.9}
          
        />
        </Link>
      
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 cursor-pointer">
          <FiUser className="h-6 w-6 text-gray-700" />
          <div className="flex flex-col text-sm">
            {/* <span className="hidden sm:block">Nombre de usuario</span> */}
            
            <span className="hidden sm:block">Iniciar Sesión</span>
          </div>
        </div>
        <Cart />

      </div>
    </nav>
  );
};

export default Navbar;
