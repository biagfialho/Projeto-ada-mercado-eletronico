import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* =========================================================
   Root com controle mobile
========================================================= */

const NavigationMenu = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      {/* Botão hambúrguer — só no mobile */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden p-2"
        aria-label="Abrir menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* MENU DESKTOP */}
      <NavigationMenuPrimitive.Root
        className={cn(
          "relative z-10 hidden md:flex max-w-max flex-1 items-center justify-center",
          className
        )}
      >
        {children}
        <NavigationMenuViewport />
      </NavigationMenuPrimitive.Root>

      {/* MENU MOBILE (OVERLAY) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <div className="relative h-full w-4/5 max-w-xs bg-background p-4 shadow-lg">
            <button
              onClick={() => setMobileOpen(false)}
              className="mb-4 flex items-center gap-2 text-sm"
            >
              <X className="h-4 w-4" />
              Fechar
            </button>

            <NavigationMenuPrimitive.Root className="flex flex-col">
              <NavigationMenuList className="flex-col space-y-2">
                {children}
              </NavigationMenuList>
            </NavigationMenuPrimitive.Root>
          </div>
        </div>
      )}
    </>
  );
};

/* =========================================================
   List
========================================================= */

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName =
  NavigationMenuPrimitive.List.displayName;

/* =========================================================
   Item
========================================================= */

const NavigationMenuItem = NavigationMenuPrimitive.Item;

/* =========================================================
   Trigger
========================================================= */

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 items-center justify-between rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/50"
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), class
