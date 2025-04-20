
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    // Basic input sanitization on change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChange) {
        // Remove any potential script tags and dangerous content
        const sanitizedValue = e.target.value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        const newEvent = {
          ...e,
          target: {
            ...e.target,
            value: sanitizedValue
          }
        };
        props.onChange(newEvent as any);
      }
    };

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        onChange={handleChange}
        {...props}
        onPaste={(e) => {
          // Sanitize pasted content
          const pastedText = e.clipboardData.getData('text');
          const sanitizedText = pastedText.replace(/<[^>]*>/g, '');
          if (props.onPaste) {
            const newEvent = {
              ...e,
              clipboardData: {
                ...e.clipboardData,
                getData: () => sanitizedText
              }
            };
            props.onPaste(newEvent as any);
          }
        }}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
