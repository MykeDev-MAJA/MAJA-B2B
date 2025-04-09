"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

interface RecentOrdersProps {
  fullList?: boolean
}

export function RecentOrders({ fullList = false }: RecentOrdersProps) {
  const orders = [
    {
      id: "ORD-001",
      product: "Grupo premier",
      date: "2023-12-15",
      status: "En proceso",
      total: "$300,000",
    },
    {
      id: "ORD-002",
      product: "Coppel",
      date: "2023-11-20",
      status: "Entregado",
      total: "$200,000",
    },
    {
      id: "ORD-003",
      product: "NISSAN",
      date: "2023-10-05",
      status: "Entregado",
      total: "$1,000,000",
    },
    {
      id: "ORD-004",
      product: "Panama",
      date: "2023-09-12",
      status: "Entregado",
      total: "$17,000",
    },
    {
      id: "ORD-005",
      product: "PEMEX",
      date: "2023-08-28",
      status: "Entregado",
      total: "$1,000,000",
    },
  ]

  const displayOrders = fullList ? orders : orders.slice(0, 3)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pedido</TableHead>
          <TableHead className="hidden md:table-cell">Fecha</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Total</TableHead>
          {fullList && <TableHead className="text-right">Acciones</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayOrders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">
              <div>{order.id}</div>
              <div className="text-xs text-muted-foreground md:hidden">{order.date}</div>
              <div className="text-xs text-muted-foreground truncate max-w-[150px]">{order.product}</div>
            </TableCell>
            <TableCell className="hidden md:table-cell">{order.date}</TableCell>
            <TableCell>
              <Badge variant={order.status === "Entregado" ? "outline" : "secondary"}>{order.status}</Badge>
            </TableCell>
            <TableCell className="text-right">{order.total}</TableCell>
            {fullList && (
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Ver detalles</span>
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
