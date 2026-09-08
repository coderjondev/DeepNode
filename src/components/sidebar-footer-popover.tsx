"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";
import UserInfo from "./user-info";
import LanguageMenu from "./language-popover";
import { useSidebar } from "./ui/sidebar";
import { useTranslations } from "next-intl";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  ArrowUpRight,
  ChevronRight,
  CircleFadingArrowUp,
  HelpCircle,
  LogOut,
  Settings,
} from "@/icons/icons";

import { Link } from "@/i18n/navigation";

export function AppPopover() {
  const { state } = useSidebar();
  const t = useTranslations("sidebar.sidebarFooter");

  return (
    <Popover>
      <PopoverTrigger
        className={`rounded-full cursor-pointer justify-start border-none bg-transparent text-sidebar-foreground hover:bg-accent
          ${state === "collapsed" ? "rounded-full p-0" : "h-10"}
        `}
        render={<UserInfo />}
      />

      <PopoverContent
        side="top"
        className="w-62 gap-0.5 rounded-xl border-border bg-popover p-1.5 shadow-lg"
      >
        <Button
          variant="ghost"
          className="flex h-9 items-center justify-between rounded-full cursor-pointer text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <p className="flex items-center gap-2">
            <Settings className="size-4" />
            {t("settings")}
          </p>
        </Button>

        <LanguageMenu />

        <Button
          variant="ghost"
          className="flex h-9 items-center justify-between rounded-full cursor-pointer text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <p className="flex items-center gap-2">
            <HelpCircle className="size-4" />
            {t("help")}
          </p>

          <ChevronRight className="size-4" />
        </Button>

        <Separator className="my-1 bg-border" />

        <Link href="/pricing">
          <Button variant={"ghost"} className="flex h-9 w-full items-center justify-between rounded-full cursor-pointer text-popover-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground">
            <p className="flex items-center gap-2">
              <CircleFadingArrowUp className="size-4" />
              {t("upgradePlan")}
            </p>

            <ArrowUpRight className="size-4" />
          </Button>
        </Link>

        <Button
          variant="ghost"
          className="h-9 items-center justify-start rounded-full cursor-pointer text-popover-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-foreground"
        >
          <LogOut className="size-4" />
          {t("logOut")}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
