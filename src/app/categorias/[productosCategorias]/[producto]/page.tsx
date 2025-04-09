import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight} from "lucide-react"
import { Metadata } from "next/types"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductDetails from "./components/ProductDetails"
import ProductInfo from "./components/ProductInfo"

// Función para convertir el slug a nombre de producto
const slugToProductName = (slug: string): string => {
  // Decodificar la URL para manejar caracteres especiales como ®
  const decodedSlug = decodeURIComponent(slug)

  // Luego reemplazamos los guiones por espacios
  return decodedSlug.replace(/-/g, " ")
}

// Agregar el array de productos relacionados
const productosRelacionados = ["Azul.webp", "Rojo.webp", "verde.jpg", "Jeep_verde.jpg"]

// Convert generateMetadata to an async arrow function
export const generateMetadata: (props: {
  params: Promise<{ producto: string; productosCategorias: string }>
}) => Promise<Metadata> = async (props) => {
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

// Convert the default export Page component to an async arrow function
const Page = async (props: {
  params: Promise<{ producto: string; productosCategorias: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const params = await props.params
  
  // Si no hay producto, mostrar 404
  if (!params.producto) {
    notFound();
  }

  // Convertir el slug a nombre de producto
  const productName = slugToProductName(params.producto);

  // Precio de ejemplo
  const price = 1799.00

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
<div className="space-y-4 max-w-full">
      <div className="sticky top-20">
        <Tabs defaultValue="azul" className="flex flex-col md:flex-row gap-4">
          {/* Thumbnails - vertical on desktop, horizontal on mobile */}
          <TabsList className="order-2 md:order-1 flex md:flex-col h-20 md:h-[500px] bg-transparent space-x-2 md:space-x-0 md:space-y-2 p-0 overflow-x-auto md:overflow-x-visible">
            <TabsTrigger
              value="azul"
              className="p-0 border-2 border-transparent data-[state=active]:border-primary rounded-md overflow-hidden min-w-[80px] w-20 md:w-24 flex-shrink-0"
            >
              <div className="relative w-full h-full aspect-square">
                <Image
                  src="/images/Producto/azul.webp"
                  alt="Azul thumbnail"
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="negro"
              className="p-0 border-2 border-transparent data-[state=active]:border-primary rounded-md overflow-hidden min-w-[80px] w-20 md:w-24 flex-shrink-0"
            >
              <div className="relative w-full h-full aspect-square">
                <Image
                  src="/images/Producto/masProducto/C-CO10-9-camisa-manga-larga-outdoor-equipo-verde-oscuro-maja-sportswear-02-scaled.webp"
                  alt="Negro thumbnail"
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="rojo"
              className="p-0 border-2 border-transparent data-[state=active]:border-primary rounded-md overflow-hidden min-w-[80px] w-20 md:w-24 flex-shrink-0"
            >
              <div className="relative w-full h-full aspect-square">
                <Image
                  src="/images/Producto/masProducto/C-CO10-9-camisa-manga-larga-outdoor-equipo-verde-oscuro-maja-sportswear-03-scaled.webp"
                  alt="Rojo thumbnail"
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="verde"
              className="p-0 border-2 border-transparent data-[state=active]:border-primary rounded-md overflow-hidden min-w-[80px] w-20 md:w-24 flex-shrink-0"
            >
              <div className="relative w-full h-full aspect-square">
                <Image
                  src="/images/Producto/masProducto/C-CO10-9-camisa-manga-larga-outdoor-equipo-verde-oscuro-maja-sportswear-04-scaled.webp"
                  alt="Verde thumbnail"
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Main image */}
          <div className="order-1 md:order-2 flex-1 w-full">
            <div className="w-full h-[400px] sm:h-[500px]">
              <TabsContent value="azul" className="h-full mt-0">
                <div className="relative w-full h-full">
                <Image
                    src="/images/Producto/azul.webp"
                    alt={`${productName} - Azul`}
                    fill
                    className="object-contain"
                    priority
                  />
                 
                </div>
              </TabsContent>
              <TabsContent value="negro" className="h-full mt-0">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/Producto/masProducto/C-CO10-9-camisa-manga-larga-outdoor-equipo-verde-oscuro-maja-sportswear-02-scaled.webp"
                    alt={`${productName}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-contain"
                  />
                </div>
              </TabsContent>
              <TabsContent value="rojo" className="h-full mt-0">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/Producto/masProducto/C-CO10-9-camisa-manga-larga-outdoor-equipo-verde-oscuro-maja-sportswear-03-scaled.webp"
                    alt={`${productName} - Rojo`}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-contain"
                  />
                </div>
              </TabsContent>
              <TabsContent value="verde" className="h-full mt-0">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/Producto/masProducto/C-CO10-9-camisa-manga-larga-outdoor-equipo-verde-oscuro-maja-sportswear-04-scaled.webp"
                    alt={`${productName} - Verde`}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-contain"
                  />
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>

        {/* Detalles del producto */}
        <ProductDetails 
          productName={productName}
          price={price}
          sku={sku}
        />
      </div>

      <ProductInfo />

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
                <h3 className="font-medium truncate">Producto Relacionado</h3>
                <p className="text-sm text-muted-foreground">$1,700.00</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page;

  
