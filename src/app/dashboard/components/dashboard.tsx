"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "./overvoew"
import { DashboardNav } from "./dashboard-nav"
import { QuotesList } from "./quotes-list"
import { RecentOrders } from "./recent-orders"
import { useUserStore } from "@/contexts/useUserContext"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const user = useUserStore((state) => state.user)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <div className="flex flex-1 items-center gap-4 md:gap-8">
          <div className="hidden md:flex">
            <h1 className="text-lg font-semibold">
              Bienvenido, {user?.name || 'Usuario'}
            </h1>
          </div>
        </div>
    
      </header>
      <div className="flex flex-1">
        <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="md:hidden">
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="quotes">Cotizaciones</TabsTrigger>
              <TabsTrigger value="orders">Pedidos</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-md font-semibold">Cotizaciones Pendientes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-green-700">+2 desde el mes pasado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-md font-semibold">Pedidos Activos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-green-700">+1 desde la semana pasada</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-md font-semibold">Total vendido</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$7,000,000</div>
                    <p className="text-xs text-green-700">+15% desde el año pasado</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Actividad Reciente</CardTitle>
                    <CardDescription>Historial de cotizaciones y pedidos</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Pedidos Recientes</CardTitle>
                    <CardDescription>Se han realizado 3 pedidos este mes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentOrders />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="quotes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Mis Cotizaciones</CardTitle>
                  <CardDescription>Gestiona todas las cotizaciones desde aquí</CardDescription>
                </CardHeader>
                <CardContent>
                  <QuotesList />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Mis Pedidos</CardTitle>
                  <CardDescription>Historial completo de pedidos</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentOrders fullList={true} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
