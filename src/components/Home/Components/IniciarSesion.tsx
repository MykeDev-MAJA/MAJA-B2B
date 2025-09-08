"use client"
import { Button } from "@/components/ui/button";
import { useAuthModalStore } from "@/contexts/useAuthModalStore";

const IniciarSesion = () => {
    const { onOpen } = useAuthModalStore();

    return (
        <Button 
            onClick={onOpen}
            variant="outline" 
            className="text-md px-6 py-2 rounded-full bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors"
        >
            INICIAR SESIÓN
        </Button>
    );
};

export default IniciarSesion;
