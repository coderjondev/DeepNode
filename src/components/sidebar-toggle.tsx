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

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={`hidden sm:flex ${className}`}
            {...props}
          />
        }
      >
        {open ? (
          <PanelLeft className="size-4" />
        ) : (
          <PanelRight className="size-4" />
        )}
      </TooltipTrigger>

      <TooltipContent>
        {open
          ? t("sidebarTooltipTriggerClose")
          : t("sidebarTooltipTriggerOpen")}
      </TooltipContent>
    </Tooltip>
  );
};

export default SidebarToggle;
