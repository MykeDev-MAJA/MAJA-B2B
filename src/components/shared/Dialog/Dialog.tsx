import {
  Dialog as DialogPrimitive,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode } from "react"

interface DialogProps {
  children: ReactNode
  trigger: ReactNode
  title?: string
  className?: string
}

export function Dialog({ children, trigger, title = "Dialog", className }: DialogProps) {
  return (
    <DialogPrimitive>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className={className} title={title}>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </DialogPrimitive>
  )
}
