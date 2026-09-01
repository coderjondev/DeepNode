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
      {/* USER TRIGGER */}
      <PopoverTrigger
        className={`
          cursor-pointer
          justify-start
          border-none
          bg-transparent
          text-sidebar-foreground
          hover:bg-sidebar-accent
          hover:text-sidebar-accent-foreground

          ${state === "collapsed" ? "rounded-full p-0" : "h-12"}
        `}
        render={<UserInfo />}
      />

      {/* POPOVER */}
      <PopoverContent
        side="top"
        className="
          w-66
          gap-0.5
          rounded-xl
          border-border
          bg-popover
          p-1.5
          text-popover-foreground
          shadow-lg
        "
      >
        {/* SETTINGS */}
        <Button
          variant="ghost"
          className="
            h-10
            w-full
            cursor-pointer
            justify-between
            rounded-lg
            px-2.5

            text-popover-foreground

            hover:bg-accent
            hover:text-accent-foreground
          "
        >
          <p className="flex items-center gap-2">
            <Settings className="size-4" />
            {t("settings")}
          </p>
        </Button>

        {/* LANGUAGE */}
        <LanguageMenu />

        {/* HELP */}
        <Button
          variant="ghost"
          className="
            h-10
            w-full
            cursor-pointer
            justify-between
            rounded-lg
            px-2.5

            text-popover-foreground

            hover:bg-accent
            hover:text-accent-foreground
          "
        >
          <p className="flex items-center gap-2">
            <HelpCircle className="size-4" />
            {t("help")}
          </p>

          <ChevronRight className="size-4 text-muted-foreground" />
        </Button>

        <Separator className="my-1 bg-border" />

        {/* UPGRADE */}
        <Link
          href="/pricing"
          className="
            flex
            h-10
            items-center
            justify-between
            rounded-lg
            px-2.5

            text-popover-foreground

            transition-colors

            hover:bg-accent
            hover:text-accent-foreground

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-ring
          "
        >
          <p className="flex items-center gap-2">
            <CircleFadingArrowUp className="size-4 text-primary" />
            {t("upgradePlan")}
          </p>

          <ArrowUpRight className="size-4 text-muted-foreground" />
        </Link>

        {/* LOG OUT */}
        <Button
          variant="ghost"
          className="
            h-10
            w-full
            cursor-pointer
            justify-between
            rounded-lg
            px-2.5

            text-popover-foreground

            hover:bg-accent
            hover:text-accent-foreground
          "
        >
          <p className="flex items-center gap-2">
            <LogOut className="size-4" />
            {t("logOut")}
          </p>
        </Button>
      </PopoverContent>
    </Popover>
  );
}
