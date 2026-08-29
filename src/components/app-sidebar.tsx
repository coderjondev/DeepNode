"use client";

import { useState } from "react";
import SidebarToggle from "./sidebar-toggle";
import Link from "next/link";
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
  SidebarMenuAction,
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
  Plug,
  ChevronRight,
} from "@/icons/icons";
import { Kbd } from "./ui/kbd";

export function AppSidebar() {
  const [chatsOpen, setChatsOpen] = useState<boolean>(true);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const { state } = useSidebar();
  const t = useTranslations("sidebar");
  const locale = useLocale();

  const isRtl = ["ar"].includes(locale);

  const sidebarItem = [
    {
      id: 1,
      icon: <SquarePen className="size-4.5!" />,
      href: "/",
      name: t("newChat"),
    },
    {
      id: 2,
      icon: <Images className="size-4.5!" />,
      href: "/images",
      name: t("images"),
    },
    {
      id: 3,
      icon: <LibraryBig className="size-4.5!" />,
      href: "/library",
      name: t("library"),
    },
    {
      id: 4,
      icon: <Plug className="size-4.5!" />,
      href: "/plug",
      name: t("plug"),
    },
  ];

  return (
    <Sidebar collapsible="icon" side={isRtl ? "right" : "left"}>
      <SidebarHeader
        className={`flex-row items-center justify-between ${state === "expanded" && "pl-5"}`}
      >
        {state === "expanded" && <Link href={"/"}>KK3</Link>}
        <div className="flex items-center gap-2">
          {state === "expanded" && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    aria-label={t("search")}
                    className={"cursor-pointer"}
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
          <SidebarToggle className={"cursor-w-resize"} />
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent className="flex flex-col min-h-0 overflow-hidden">
        <SidebarGroup className="shrink-0 flex flex-col gap-1">
          <SidebarMenu>
            {sidebarItem.map((item) => {
              const { id, icon, name, href } = item;
              return (
                <SidebarMenuItem key={id}>
                  <Link href={href}>
                    <SidebarMenuButton
                      tooltip={{
                        children: name,
                        side: isRtl ? "left" : "right",
                      }}
                      className="rounded-lg px-2.5 h-8 cursor-pointer"
                    >
                      <span className={`${id === 4 ? "rotate-45" : ""}`}>
                        {icon}
                      </span>
                      {state === "expanded" && name}
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        {state === "expanded" && (
          <SidebarGroup className="relative overflow-y-auto scrollbar-hidden">
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="sticky -top-2 z-20 bg-sidebar">
                  <SidebarMenuButton
                    onClick={() => setChatsOpen((prev) => !prev)}
                    className="text-gray-300 cursor-pointer transition-colors duration-300 ease-in-out"
                    aria-expanded={chatsOpen}
                  >
                    History
                  </SidebarMenuButton>

                  <SidebarMenuAction
                    onClick={() => setChatsOpen((prev) => !prev)}
                    className={`transition-transform duration-200 ${
                      chatsOpen ? "rotate-90" : ""
                    } cursor-pointer`}
                  >
                    <ChevronRight />
                  </SidebarMenuAction>
                </div>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${
                    chatsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <SidebarMenuSub>
                      {Array.from({ length: 50 }).map((_, index) => {
                        const isSelected = selectedChat === index;
                        return (
                          <SidebarMenuSubItem key={index} className="relative">
                            <span className="absolute -left-4.5 top-1/2 z-10 flex h-3.75 w-3.75 -translate-y-1/2 items-center justify-center rounded-full bg-background text-[10px] text-muted-foreground">
                              {index + 1}
                            </span>

                            <SidebarMenuSubButton
                              isActive={isSelected}
                              onClick={() => setSelectedChat(index)}
                            >
                              onClick
                            </SidebarMenuSubButton>
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
      <Separator />
      <SidebarFooter>
        <AppPopover />
      </SidebarFooter>
    </Sidebar>
  );
}
