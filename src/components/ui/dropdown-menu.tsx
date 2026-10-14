import { Menu } from "@base-ui/react/menu"
import type { MenuPopupProps, MenuPositionerProps } from "@base-ui/react/menu"
import * as React from "react"
import { cn } from "cn"

const DropdownMenu = Menu.Root

function DropdownMenuTrigger(props: React.ComponentProps<typeof Menu.Trigger>) {
  return <Menu.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

type DropdownMenuContentProps = MenuPopupProps &
  Pick<MenuPositionerProps, "align" | "sideOffset">

function DropdownMenuContent({
  align = "end",
  sideOffset = 4,
  className,
  ...props
}: DropdownMenuContentProps) {
  return (
    <Menu.Portal>
      <Menu.Positioner
        align={align}
        sideOffset={sideOffset}
        className="z-50"
      >
        <Menu.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "max-h-(--available-height) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none",
            "data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95",
            className
          )}
          {...props}
        />
      </Menu.Positioner>
    </Menu.Portal>
  )
}

function DropdownMenuItem(props: React.ComponentProps<typeof Menu.Item>) {
  return (
    <Menu.Item
      data-slot="dropdown-menu-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none",
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
      )}
      {...props}
    />
  )
}

function DropdownMenuLabel(props: React.ComponentProps<typeof Menu.GroupLabel>) {
  return (
    <Menu.Group>
      <Menu.GroupLabel
        data-slot="dropdown-menu-label"
        className={cn("px-2 py-1.5 text-sm font-semibold", props.className)}
        {...props}
      />
    </Menu.Group>
  )
}

function DropdownMenuSeparator(
  props: React.ComponentProps<typeof Menu.Separator>
) {
  return (
    <Menu.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", props.className)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
}
