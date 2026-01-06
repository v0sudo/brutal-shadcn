import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-black placeholder:text-gray-500 selection:bg-black selection:text-white bg-white border-4 border-black h-12 w-full min-w-0 px-4 py-2 text-base font-bold uppercase tracking-wider transition-all duration-200 outline-none file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-bold disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200",
        "focus-visible:outline-4 focus-visible:outline-black focus-visible:outline-offset-2 focus-visible:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
        "aria-invalid:border-red-600 aria-invalid:bg-red-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
