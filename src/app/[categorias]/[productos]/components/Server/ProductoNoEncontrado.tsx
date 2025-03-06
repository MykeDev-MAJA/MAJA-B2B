import Link from "next/link"
import { PackageX } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function ProductNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <Card className="w-full max-w-md border-muted/40">
        <CardHeader className="flex flex-col items-center gap-2 pt-10">
          <div className="rounded-full bg-muted p-4">
            <PackageX className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-center mt-4">¡Vaya! Este producto no está disponible</h1>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            El producto que estás buscando no existe, ha sido eliminado o se ha movido a otra ubicación. Te invitamos a
            explorar nuestro catálogo para encontrar productos similares.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center pb-10">
          <Button asChild variant="outline">
            <Link href="/products">Ver catálogo</Link>
          </Button>
          <Button asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

