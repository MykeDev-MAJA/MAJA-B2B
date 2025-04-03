'use client';
import Image from 'next/image';
import Link from 'next/link';

// Definimos las categorías disponibles con sus imágenes
interface Categoria {
  id: string;
  nombre: string;
  imagen: string;
}

const CategoriasComponent = () => {
  // Categorías hardcodeadas ya que son fijas
  const categorias: Categoria[] = [
    {
      id: 'hombres',
      nombre: 'Hombres',
      imagen: '/images/Categorias/hombres.jpg'
    },
    {
      id: 'mujeres',
      nombre: 'Mujeres',
      imagen: '/images/Categorias/mujeres.jpg' 
    },
   

  ];

  return (
    <div className=" flex flex-col items-center py-8 px-8 ">
      <h1 className="text-4xl font-normal mb-8">Categorías</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-[100%]">
        {categorias.map((categoria, index) => (
          <Link 
            href={`/categorias/${categoria.id}`} 
            key={categoria.id}
            className={`transition-transform hover:scale-105 ${
              index === 0 ? 'md:col-start-2' : 'md:col-start-3'
            }`}
          >
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden relative">
              <div className="relative h-94 w-auto">
                <Image 
                  src={categoria.imagen} 
                  alt={`Categoría de productos para ${categoria.nombre.toLowerCase()}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
             
              <h2
        className="absolute bottom-5 left-0 px-4 py-2 text-white text-2xl font-normal 
                     bg-black rounded-tr-sm rounded-br-sm shadow-2xl"
      >
        {categoria.nombre}
      </h2>             
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriasComponent;