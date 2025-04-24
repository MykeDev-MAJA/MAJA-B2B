'use client'

import { Breadcrumb as BreadcrumbShadcn, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { HomeIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import React from 'react'

interface BreadcrumbItemType {
  href: string
  label: string
  isLast: boolean
}

export default function Breadcrumb() {
  // Get the current path using usePathname
  const pathname = usePathname()

  // Split the path into segments and remove empty strings
  const segments = pathname.split("/").filter(Boolean)

  // Generate breadcrumb items
  const breadcrumbItems: BreadcrumbItemType[] = segments.map((segment: string, index: number) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`
    const isLast = index === segments.length - 1
    const formattedSegment = segment.charAt(0).toUpperCase() + segment.slice(1)

    return {
      href,
      label: formattedSegment,
      isLast,
    }
  })

  return (
    <BreadcrumbShadcn className="mt-8 ml-13 font-semibold text-sm">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">
              <HomeIcon className="h-4 w-4 text-black" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {breadcrumbItems.map((item: BreadcrumbItemType, index: number) => (
          <React.Fragment key={item.href}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbShadcn>
  )
}
