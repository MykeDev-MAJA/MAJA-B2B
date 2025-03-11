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
    {
      id: 'chalecos',
      nombre: 'Chalecos',
      imagen: '/images/Categorias/chalecos.jpg' 
    },
    {
      id: 'sombreros',
      nombre: 'Sombreros',
      imagen: '/images/Categorias/sombreros.jpg' 
    },

  ];

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-8 bg-gray-100 ">
      <h1 className="text-4xl font-bold mb-8">Categorías</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-[80%]">
        {categorias.map((categoria) => (
          <Link 
            href={`/categorias/${categoria.id}`} 
            key={categoria.id}
            className="transition-transform hover:scale-105"
          >
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden relative">
              <div className="relative h-94 w-auto">
                <Image 
                  src={categoria.imagen} 
                  alt={categoria.nombre}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
             
              <h2
        className="absolute bottom-5 left-5 px-4 py-2 text-white text-2xl font-semibold text- 
                     bg-white/5 backdrop-blur-md rounded-sm shadow-lg"
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