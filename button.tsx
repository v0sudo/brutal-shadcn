import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex hover:cursor-pointer items-center justify-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-wider transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none border-4 border-black focus-visible:outline-4 focus-visible:outline-black focus-visible:outline-offset-2 aria-invalid:border-red-600 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px]",
  {
    variants: {
      variant: {
        default:
          "bg-pink-300 text-white hover:bg-pink-300/90 active:bg-pink-300/80 text-black",
        destructive:
          "bg-red-600 text-white border-red-800 hover:bg-red-700 active:bg-red-800 hover:shadow-[6px_6px_0px_0px_rgba(127,29,29,1)] active:shadow-[4px_4px_0px_0px_rgba(127,29,29,1)]",
        outline:
          "bg-transparent text-black border-black hover:bg-pink-300 hover:text-black active:bg-gray-100 active:text-black",
        secondary:
          "bg-pink-300 text-black border-black hover:bg-pink-300 hover:text-white active:bg-gray-100 active:text-black",
        ghost:
          "bg-transparent text-black border-transparent hover:bg-pink-300 hover:border-black hover:text-black active:bg-gray-100 active:text-black",
        link: "bg-transparent text-black border-transparent hover:underline hover:shadow-none active:shadow-none",
      },
      size: {
        default: "h-12 px-6 py-3 has-[>svg]:px-5",
        sm: "h-10 gap-1.5 px-4 has-[>svg]:px-3 border-2 text-xs",
        lg: "h-14 px-8 has-[>svg]:px-6 border-[6px] text-base",
        icon: "size-12 border-4",
        "icon-sm": "size-10 border-2",
        "icon-lg": "size-14 border-[6px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
