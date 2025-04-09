import type React from "react"

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ children, className = "", ...props }: LabelProps) => {
  return (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    >
      {children}
    </label>
  )
}

