"use client";

import { PanelLeft, PanelRight } from "@/icons/icons";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";

const SidebarToggle = ({
  className,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { open, toggleSidebar } = useSidebar();
  const t = useTranslations("sidebar");

  const label = open
    ? t("sidebarTooltipTriggerClose")
    : t("sidebarTooltipTriggerOpen");

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            {...props}
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label={label}
            className={`
              hidden
              sm:flex
              cursor-pointer
              rounded-lg

              text-sidebar-foreground

              hover:bg-sidebar-accent
              hover:text-sidebar-accent-foreground

              focus-visible:ring-2
              focus-visible:ring-sidebar-ring

              ${className ?? ""}
            `}
          />
        }
      >
        {open ? (
          <PanelLeft className="size-4" />
        ) : (
          <PanelRight className="size-4" />
        )}
      </TooltipTrigger>

      <TooltipContent
        side="bottom"
        className="
          border-border
          bg-popover
          text-popover-foreground
          shadow-md
        "
      >
        {label}
      </TooltipContent>
    </Tooltip>
  );
};

export default SidebarToggle;
