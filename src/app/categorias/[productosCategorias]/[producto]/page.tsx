import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight} from "lucide-react"
import { Metadata } from "next/types"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import ProductDetails from "./components/ProductDetails"

// Función para convertir el slug a nombre de producto
function slugToProductName(slug: string): string {
  // Decodificar la URL para manejar caracteres especiales como ®
  const decodedSlug = decodeURIComponent(slug)

  // Luego reemplazamos los guiones por espacios
  return decodedSlug.replace(/-/g, " ")
}

// Tamaños disponibles
// const sizes = ["ECH", "CH", "M", "G", "EG", "EEG"]

// Colores disponibles
// const colors = [
  // { name: "Azul", value: "azul", hex: "#1e40af" },
  // { name: "Negro", value: "negro", hex: "#171717" },
  // { name: "Rojo", value: "rojo", hex: "#b91c1c" },
  // { name: "Verde", value: "verde", hex: "#15803d" },
// ]

// Agregar el array de productos relacionados
const productosRelacionados = ["Azul.webp", "Rojo.webp", "verde.jpg", "Jeep_verde.jpg"]

export async function generateMetadata(props: {
  params: Promise<{ producto: string; productosCategorias: string }>
}): Promise<Metadata> {
  const params = await props.params
  const productName = slugToProductName(params.producto)
  
  return {
    title: `${productName} | Categoría: ${params.productosCategorias}`,
    description: `Encuentra ${productName} en nuestra tienda online. Calidad garantizada.`,
    openGraph: {
      title: `${productName} | Maja Corp`,
      description: `Encuentra ${productName} en nuestra tienda online. Producto de alta calidad en la categoría ${params.productosCategorias}. Envíos a todo México.`,
      type: "website",
      locale: 'es_MX',
      siteName: 'Maja Corp',
      images: [
        {
          url: `https://b2b-maja-corp.netlify.app/images/Producto/azul.webp`,
          width: 800,
          height: 800,
          alt: `${productName} - Vista principal`,
        },
      ],
    },
  }
}

export default async function Page(props: {
  params: Promise<{ producto: string; productosCategorias: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await props.params
  
  // Si no hay producto, mostrar 404
  if (!params.producto) {
    notFound();
  }

  // Convertir el slug a nombre de producto
  const productName = slugToProductName(params.producto);

  // Precio de ejemplo
  const price = 1529.15

  // SKU del producto
  const sku = "C-CO1-14"

  // Ahora podemos usar params.productosCategorias de forma segura
  const categoria = params.productosCategorias;

  return (
    <div className="container mx-auto py-6 px-4 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          Inicio
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/categorias" className="hover:text-primary transition-colors">
          Productos
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href={`/categorias/${categoria}`} className="hover:text-primary transition-colors">
          {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium truncate">
          {productName}
        </span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Galería de imágenes */}
        <div className="space-y-4">
          <Tabs defaultValue="azul" className="w-full">
            <div className="aspect-square rounded-xl border overflow-hidden bg-background mb-4">
              <TabsContent value="azul" className="h-full mt-0">
                <Image
                  src="/images/Producto/azul.webp"
                  alt={`${productName} - Azul`}
                  width={800}
                  height={800}
                  className="object-contain w-full h-full"
                  priority
                />
              </TabsContent>
              <TabsContent value="negro" className="h-full mt-0">
                <Image
                  src="/images/Producto/masProducto/C-CO10-9-camisa-manga-larga-outdoor-equipo-verde-oscuro-maja-sportswear-02-scaled.webp"
                  alt={`${productName}`}
                  width={800}
                  height={800}
                  className="object-contain w-full h-full"
                />
              </TabsContent>
              <TabsContent value="rojo" className="h-full mt-0">
                <Image
                  src="/images/Producto/masProducto/C-CO10-9-camisa-manga-larga-outdoor-equipo-verde-oscuro-maja-sportswear-03-scaled.webp"
                  alt={`${productName} - Rojo`}
                  width={800}
                  height={800}
                  className="object-contain w-full h-full"
                />
              </TabsContent>
              <TabsContent value="verde" className="h-full mt-0">
                <Image
                  src="/images/Producto/masProducto/C-CO10-9-camisa-manga-larga-outdoor-equipo-verde-oscuro-maja-sportswear-04-scaled.webp"
                  alt={`${productName} - Verde`}
                  width={800}
                  height={800}
                  className="object-contain w-full h-full"
                />
              </TabsContent>
            </div>
            <TabsList className="grid grid-cols-4 h-24 bg-transparent">
              <TabsTrigger
                value="azul"
                className="p-0 data-[state=active]:border-2 data-[state=active]:border-primary rounded-md overflow-hidden"
              >
                <div className="w-full h-full p-1">
                  <div className="relative rounded-md overflow-hidden">
                    <Image
                      src="/images/Producto/azul.webp"
                      alt="Azul thumbnail"
                      height={100}
                      width={100}
                      className="object-contain"
                    />
                  </div>
                </div>
              </TabsTrigger>
              
              <TabsTrigger
                value="negro"
                className="p-0 data-[state=active]:border-2 data-[state=active]:border-primary rounded-md overflow-hidden"
              >
                <div className="w-full h-full p-1">
                  <div className="relative rounded-md overflow-hidden">
                    <Image
                  src="/images/Producto/masProducto/C-CO10-9-camisa-manga-larga-outdoor-equipo-verde-oscuro-maja-sportswear-02-scaled.webp"
                  alt="Negro thumbnail"
                      height={100}
                      width={100}
                      className="object-contain"
                    />
                  </div>
                </div>
              </TabsTrigger>
              
              <TabsTrigger
                value="rojo"
                className="p-0 data-[state=active]:border-2 data-[state=active]:border-primary rounded-md overflow-hidden"
              >
                <div className="w-full h-full p-1">
                  <div className="relative rounded-md overflow-hidden">
                    <Image
                  src="/images/Producto/masProducto/C-CO10-9-camisa-manga-larga-outdoor-equipo-verde-oscuro-maja-sportswear-03-scaled.webp"
                  alt="Rojo thumbnail"
                      height={100}
                      width={100}
                      className="object-contain"
                    />
                  </div>
                </div>
              </TabsTrigger>
              
              <TabsTrigger
                value="verde"
                className="p-0 data-[state=active]:border-2 data-[state=active]:border-primary rounded-md overflow-hidden"
              >
                <div className="w-full h-full p-1">
                  <div className="relative rounded-md overflow-hidden">
                    <Image
                  src="/images/Producto/masProducto/C-CO10-9-camisa-manga-larga-outdoor-equipo-verde-oscuro-maja-sportswear-04-scaled.webp"
                  alt="Verde thumbnail"
                      height={100}
                      width={100}
                      className="object-contain"
                    />
                  </div>
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Detalles del producto */}
        <ProductDetails 
          productName={productName}
          price={price}
          sku={sku}
        />
      </div>

      {/* Productos relacionados - se podría implementar en un componente separado */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productosRelacionados.map((producto) => (
            <Card key={producto} className="overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src={`/images/Producto/${producto}`}
                  width={300}
                  height={300}
                  alt={`Producto relacionado - ${producto}`}
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium truncate">Producto {producto}</h3>
                <p className="text-sm text-muted-foreground">$499.99</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

  
