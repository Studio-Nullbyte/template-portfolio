import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  isSubmitting: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function SubmitButton({ 
  isSubmitting, 
  disabled = false, 
  className,
  children = "Send Message" 
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting || disabled}
      className={cn(
        "w-full bg-primary text-primary-foreground hover:bg-primary/90",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-colors",
        className
      )}
    >
      {isSubmitting ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send className="h-4 w-4" />
          {children}
        </>
      )}
    </button>
  );
}
