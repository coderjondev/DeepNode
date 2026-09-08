"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import SidebarToggle from "./sidebar-toggle";
import { Link } from "@/i18n/navigation";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";
import { useLocale, useTranslations } from "next-intl";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { AppPopover } from "./sidebar-footer-popover";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Images,
  SquarePen,
  Search,
  LibraryBig,
  // Plug,
  ChevronRight,
  EllipsisVertical,
} from "@/icons/icons";

import { Kbd } from "./ui/kbd";

export function AppSidebar() {
  const [chatsOpen, setChatsOpen] = useState<boolean>(true);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const { state } = useSidebar();
  const t = useTranslations("sidebar");
  const locale = useLocale();
  const pathname = usePathname();

  const isRtl = ["ar"].includes(locale);

  const sidebarItem = [
    {
      id: 1,
      icon: <SquarePen />,
      href: "/",
      name: t("newChat"),
    },
    {
      id: 2,
      icon: <Images />,
      href: "/images",
      name: t("images"),
    },
    {
      id: 3,
      icon: <LibraryBig />,
      href: "/library",
      name: t("library"),
    },
    // {
    //   id: 4,
    //   icon: <Plug />,
    //   href: "/plugins",
    //   name: t("plug"),
    // },
  ];

  return (
    <Sidebar
      collapsible="icon"
      side={isRtl ? "right" : "left"}
      className="border-sidebar-border"
    >
      <SidebarHeader
        className={`flex-row items-center justify-between ${
          state === "expanded" ? "pl-5" : ""
        }`}
      >
        {state === "expanded" && (
          <Link
            href="/"
            className=" font-semibold tracking-tight text-xl text-sidebar-foreground transition-colors hover:text-sidebar-primary"
          >
            KK3
          </Link>
        )}

        <div className="flex items-center gap-2.5">
          {state === "expanded" && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={t("search")}
                    className="rounded-full cursor-pointer text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <Search className="size-4" />
                  </Button>
                }
              />

              <TooltipContent>
                <p>
                  {t("search")} <Kbd>Ctrl + K</Kbd>
                </p>
              </TooltipContent>
            </Tooltip>
          )}

          <SidebarToggle className="rounded-full cursor-w-resize" />
        </div>
      </SidebarHeader>

      <SidebarContent className="flex min-h-0 flex-col overflow-hidden">
        <SidebarGroup className="flex shrink-0 flex-col">
          <SidebarMenu className="gap-1">
            {sidebarItem.map((item) => {
              const { id, icon, name, href } = item;

              const normalizedPath =
                pathname.replace(new RegExp(`^/${locale}`), "") || "/";

              const isActive =
                href === "/"
                  ? normalizedPath === "/" && selectedChat === null
                  : normalizedPath === href ||
                    normalizedPath.startsWith(href + "/");

              return (
                <SidebarMenuItem key={id}>
                  <Link href={href} onClick={() => setSelectedChat(null)}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={{
                        children: name,
                        side: isRtl ? "left" : "right",
                      }}
                      className="h-8 px-2.5 rounded-full cursor-pointer transition-all duration-300"
                    >
                      {icon}
                      {state === "expanded" && name}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {state === "expanded" && (
          <SidebarGroup className="relative overflow-y-auto no-scrollbar">
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="sticky -top-2 z-20 bg-sidebar">
                  <SidebarMenuButton
                    onClick={() => setChatsOpen((prev) => !prev)}
                    className="h-9 px-2.5 rounded-full cursor-pointer justify-between"
                    aria-expanded={chatsOpen}
                  >
                    {t("history")}

                    <span
                      className={`cursor-pointer transition-transform duration-300
                        ${chatsOpen ? "rotate-90" : ""}
                      `}
                      aria-label={t("history-toggle")}
                    >
                      <ChevronRight className="size-4" />
                    </span>
                  </SidebarMenuButton>
                </div>

                <div
                  className={`grid transition-all duration-300
                    ${chatsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                  `}
                >
                  <div className="overflow-hidden">
                    <SidebarMenuSub>
                      {Array.from({ length: 50 }).map((_, index) => {
                        const isSelected = selectedChat === index;

                        return (
                          <SidebarMenuSubItem
                            key={index}
                            className="group/item relative"
                          >
                            <span className="absolute -left-4.5 top-1/2 z-10 flex h-3.75 w-3.75 -translate-y-1/2 items-center justify-center rounded-full bg-sidebar text-[10px]">
                              {index + 1}
                            </span>

                            <SidebarMenuSubButton
                              isActive={isSelected}
                              onClick={() => setSelectedChat(index)}
                              href={`/chat/${index}`}
                              hrefLang={locale}
                              className="h-7 w-[90%] rounded-full cursor-pointer transition-colors duration-300 text-xs!"
                            >
                              Chat {index + 1}
                            </SidebarMenuSubButton>

                            <Button
                              variant="ghost"
                              size="icon"
                              className={`absolute -right-5.5 top-0 hover:bg-accent rounded-full cursor-pointer opacity-0 transition-all duration-300 group-hover/item:opacity-100 ${isSelected ? "opacity-100" : ""}
                                `}
                              aria-label="chat actions"
                            >
                              <EllipsisVertical className="size-4" />
                            </Button>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </div>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <Separator className="bg-sidebar-border" />

      <SidebarFooter>
        <AppPopover />
      </SidebarFooter>
    </Sidebar>
  );
}
