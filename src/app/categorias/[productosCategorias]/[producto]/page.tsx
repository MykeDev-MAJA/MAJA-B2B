import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Heart, Share2, ShoppingCart } from "lucide-react"
import { Metadata } from "next/types"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import QuantitySelector from "@/components/shared/ProductLanding/quantity-selector"

// Función para convertir el slug a nombre de producto
function slugToProductName(slug: string): string {
  // Primero decodificamos la URL para manejar caracteres especiales como ®
  const decodedSlug = decodeURIComponent(slug)

  // Luego reemplazamos los guiones por espacios
  return decodedSlug.replace(/-/g, " ")
}

// Tamaños disponibles
const sizes = ["ECH", "CH", "M", "G", "EG", "EEG"]

// Colores disponibles
const colors = [
  { name: "Azul", value: "azul", hex: "#1e40af" },
  { name: "Negro", value: "negro", hex: "#171717" },
  { name: "Rojo", value: "rojo", hex: "#b91c1c" },
  { name: "Verde", value: "verde", hex: "#15803d" },
]

export async function generateMetadata(props: {
  params: Promise<{ producto: string; productosCategorias: string }>
}): Promise<Metadata> {
  const params = await props.params
  const productName = slugToProductName(params.producto)
  
  return {
    title: `${productName} | Categoría: ${params.productosCategorias}`,
    description: `Encuentra ${productName} en nuestra tienda online. Calidad garantizada.`,
    openGraph: {
      images: [
        {
          url: `https://b2b-maja-corp.netlify.app/images/Producto/azul.webp`,
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
  // const searchParams = await props.searchParams

  // Si no hay producto, mostrar 404
  if (!params.producto) {
    notFound();
  }

  // Convertir el slug a nombre de producto
  const productName = slugToProductName(params.producto);

  // Precio de ejemplo
  const price = 1529.15

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
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs font-medium">
                En stock
              </Badge>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Añadir a favoritos</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Compartir producto</span>
                </Button>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{productName}</h1>
            <p className="text-xl sm:text-2xl font-semibold text-primary">
              {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(price)}
            </p>
            <p className="text-sm text-muted-foreground">SKU: C-CO1-14</p>
          </div>

          <div className="prose prose-sm max-w-none">
            <p>
              Prenda de alta calidad diseñada para ofrecer comodidad y estilo. Fabricada con materiales premium que
              garantizan durabilidad y un ajuste perfecto para cualquier ocasión.
            </p>
          </div>

          {/* Selector de colores */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Color</h3>
              <span className="text-sm text-muted-foreground">Azul</span>
            </div>
            <RadioGroup defaultValue="azul" className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <div key={color.value} className="flex items-center">
                  <RadioGroupItem value={color.value} id={`color-${color.value}`} className="peer sr-only" />
                  <Label
                    htmlFor={`color-${color.value}`}
                    className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-muted 
                              ring-offset-background peer-data-[state=checked]:border-primary"
                  >
                    <span
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Selector de tallas */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Talla</h3>
              <Button variant="link" className="p-0 h-auto text-sm">
                Guía de bordado
              </Button>
            </div>
            <RadioGroup defaultValue="M" className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <div key={size} className="flex items-center">
                  <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                  <Label
                    htmlFor={`size-${size}`}
                    className="flex h-10 w-14 cursor-pointer items-center justify-center rounded-md border border-muted bg-background 
                              text-sm font-medium ring-offset-background transition-colors hover:bg-muted/50
                              peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Selector de cantidad y botones de acción */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Cantidad</h3>
            </div>
            <QuantitySelector />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Button size="lg" className="w-full">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Agregar a cotización
              </Button>
              <Button size="lg" variant="outline" className="w-full">
                Contactar a un asesor
              </Button>
            </div>
          </div>

          {/* Información adicional */}
          <div className="border-t pt-6 mt-2">
            <Tabs defaultValue="descripcion">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="descripcion">Descripción</TabsTrigger>
                <TabsTrigger value="caracteristicas">Características</TabsTrigger>
                <TabsTrigger value="envio">Envío</TabsTrigger>
              </TabsList>
              <TabsContent value="descripcion" className="pt-4">
                <div className="prose prose-sm max-w-none">
                  <p>
                    Este producto está diseñado con los más altos estándares de calidad para garantizar durabilidad y
                    comodidad. Ideal para uso diario y ocasiones especiales.
                  </p>
                  <p>
                    La tela de alta calidad proporciona una sensación suave al tacto mientras mantiene su forma incluso
                    después de múltiples lavados.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="caracteristicas" className="pt-4">
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Material: 100% algodón premium</li>
                  <li>Diseño ergonómico para mayor comodidad</li>
                  <li>Disponible en múltiples colores</li>
                  <li>Lavable a máquina</li>
                  <li>Fabricado en México</li>
                </ul>
              </TabsContent>
              <TabsContent value="envio" className="pt-4">
                <div className="prose prose-sm max-w-none">
                  <p>Envío disponible a todo México. Los tiempos de entrega varían según la ubicación:</p>
                  <ul>
                    <li>Ciudad de México: 1-2 días hábiles</li>
                    <li>Resto del país: 3-5 días hábiles</li>
                  </ul>
                  <p>
                    Para consultas sobre envíos internacionales, por favor contacte a nuestro equipo de atención al
                    cliente.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Productos relacionados - se podría implementar en un componente separado */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src="/images/Producto/azul.webp"
                  width={300}
                  height={300}
                  alt="Producto relacionado"
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium truncate">Producto relacionado {item}</h3>
                <p className="text-sm text-muted-foreground">$499.99</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

  
