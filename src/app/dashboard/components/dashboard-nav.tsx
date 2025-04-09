"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, ShoppingCart, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

interface DashboardNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function DashboardNav({ activeTab, setActiveTab }: DashboardNavProps) {
  const [open, setOpen] = useState(false)

  const navItems = [
    {
      title: "Resumen",
      icon: LayoutDashboard,
      value: "overview",
    },
    {
      title: "Cotizaciones",
      icon: FileText,
      value: "quotes",
    },
    {
      title: "Pedidos",
      icon: ShoppingCart,
      value: "orders",
    },

  ]

  return (
    <>
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
      
          <div className="flex-1">
            <nav className="grid items-start px-2 py-4 text-sm font-medium">
              {navItems.map((item) => (
                <Button
                  key={item.value}
                  variant={activeTab === item.value ? "secondary" : "ghost"}
                  className={cn("justify-start gap-3 px-3", activeTab === item.value && "bg-muted")}
                  onClick={() => setActiveTab(item.value)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0">
          <div className="px-7 py-4 border-b">
            <span className="font-semibold">Mi Cuenta</span>
          </div>
          <nav className="grid gap-1 p-2 text-sm font-medium">
            {navItems.map((item) => (
              <Button
                key={item.value}
                variant={activeTab === item.value ? "secondary" : "ghost"}
                className={cn("justify-start gap-3 px-3", activeTab === item.value && "bg-muted")}
                onClick={() => {
                  setActiveTab(item.value)
                  setOpen(false)
                }}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  )
}
