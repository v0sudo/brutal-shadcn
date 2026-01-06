"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface SelectContextValue {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SelectContext = React.createContext<SelectContextValue | undefined>(
  undefined,
);

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  error?: boolean;
  className?: string;
  children: React.ReactNode;
  id?: string;
  "aria-invalid"?: boolean | "false" | "true";
  disabled?: boolean;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      value,
      onValueChange,
      error: _error,
      className,
      children,
      id: _id,
      "aria-invalid": _ariaInvalid,
      disabled: _disabled,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    const selectRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => selectRef.current!);

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };

      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
          document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [open]);

    // Handle keyboard navigation
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (!open) return;

        if (event.key === "Escape") {
          setOpen(false);
          // Focus the trigger button after closing
          const trigger = selectRef.current?.querySelector(
            "button[aria-expanded]",
          );
          if (trigger) {
            (trigger as HTMLButtonElement).focus();
          }
        }
      };

      if (open) {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
      }
    }, [open]);

    const contextValue = React.useMemo(
      () => ({
        value,
        onValueChange: (newValue: string) => {
          onValueChange(newValue);
          setOpen(false);
        },
        open,
        setOpen,
      }),
      [value, onValueChange, open],
    );

    return (
      <SelectContext.Provider value={contextValue}>
        <div ref={selectRef} className={cn("relative", className)} {...props}>
          {children}
        </div>
      </SelectContext.Provider>
    );
  },
);
Select.displayName = "Select";

interface SelectTriggerProps extends React.ComponentProps<"button"> {
  error?: boolean;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, error, children, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    if (!context) throw new Error("SelectTrigger must be used within Select");

    const { open, setOpen } = context;

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => !props.disabled && setOpen(!open)}
        className={cn(
          "flex h-12 w-full min-w-0 items-center justify-between border-4 border-black bg-white px-4 py-2 text-base font-bold tracking-wider uppercase transition-all duration-200 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-50",
          "focus-visible:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-black",
          error ? "border-red-600 bg-red-50" : "",
          className,
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
        {...props}
      >
        <span className="truncate">{children}</span>
        <ChevronDown
          className={cn(
            "ml-2 size-5 shrink-0 text-black transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
    );
  },
);
SelectTrigger.displayName = "SelectTrigger";

type SelectContentProps = React.ComponentProps<"div">;

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    if (!context) throw new Error("SelectContent must be used within Select");

    const { open } = context;

    if (!open) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "absolute z-50 mt-1 max-h-60 w-full overflow-auto border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
          className,
        )}
        role="listbox"
        {...props}
      />
    );
  },
);
SelectContent.displayName = "SelectContent";

interface SelectOptionProps extends React.ComponentProps<"div"> {
  value: string;
}

const SelectOption = React.forwardRef<HTMLDivElement, SelectOptionProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(SelectContext);
    if (!context) throw new Error("SelectOption must be used within Select");

    const { value: selectedValue, onValueChange } = context;
    const isSelected = selectedValue === value;

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        onClick={() => onValueChange(value)}
        className={cn(
          "cursor-pointer px-4 py-3 text-base font-bold tracking-wider uppercase transition-colors duration-200",
          "hover:bg-pink-300 hover:text-black",
          isSelected && "bg-pink-300 text-black",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
SelectOption.displayName = "SelectOption";

export { Select, SelectTrigger, SelectContent, SelectOption };
