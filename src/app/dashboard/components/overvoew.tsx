"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Ene",
    cotizaciones: 3,
    pedidos: 2,
  },
  {
    name: "Feb",
    cotizaciones: 2,
    pedidos: 1,
  },
  {
    name: "Mar",
    cotizaciones: 4,
    pedidos: 3,
  },
  {
    name: "Abr",
    cotizaciones: 3,
    pedidos: 2,
  },
  {
    name: "May",
    cotizaciones: 5,
    pedidos: 3,
  },
  {
    name: "Jun",
    cotizaciones: 4,
    pedidos: 2,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="cotizaciones" fill="#adfa1d" radius={[4, 4, 0, 0]} name="Cotizaciones" />
        <Bar dataKey="pedidos" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Pedidos" />
      </BarChart>
    </ResponsiveContainer>
  )
}
