"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download } from "lucide-react"

export function QuotesList() {
  const quotes = [
    {
      id: "COT-001",
      product: "Grupo premier",
      date: "2024-04-01",
      status: "Pendiente",
      total: "$300,000",
    },
    {
      id: "COT-002",
      product: "Grupo premium",
      date: "2024-03-25",
      status: "Pendiente",
      total: "$300,000",
    },
    {
      id: "COT-003",
      product: "Grupo premium plus",
      date: "2024-03-15",
      status: "Pendiente",
      total: "$300,000",
    },
    {
      id: "COT-004",
      product: "NISSAN",
      date: "2024-03-10",
      status: "Expirada",
      total: "$1,200",
    },
    {
      id: "COT-005",
      product: "Grupo Premier",
      date: "2024-03-05",
      status: "Expirada",
      total: "$130,000",
    },
    {
      id: "COT-006",
      product: "Panama",
      date: "2024-02-28",
      status: "Convertida",
      total: "$17,000",
    },
    {
      id: "COT-007",
      product: "PEMEX",
      date: "2024-02-20",
      status: "Convertida",
      total: "$1,000,000",
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cotización</TableHead>
          <TableHead className="hidden md:table-cell">Fecha</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quotes.map((quote) => (
          <TableRow key={quote.id}>
            <TableCell className="font-medium">
              <div>{quote.id}</div>
              <div className="text-xs text-muted-foreground md:hidden">{quote.date}</div>
              <div className="text-xs text-muted-foreground truncate max-w-[150px]">{quote.product}</div>
            </TableCell>
            <TableCell className="hidden md:table-cell">{quote.date}</TableCell>
            <TableCell>
              <Badge
                variant={
                  quote.status === "Pendiente" ? "secondary" : quote.status === "Expirada" ? "destructive" : "outline"
                }
              >
                {quote.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">{quote.total}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-1">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Ver cotización</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Descargar PDF</span>
                </Button>
               
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
