"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import {
  FileText,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
  Film,
  Check,
  ChevronDown,
  FolderOpen,
  ImageIcon,
} from "@/icons/icons";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Tab = "all" | "media" | "documents";

const tabs: {
  id: Tab;
  label: string;
  icon: typeof Film | typeof FileText | null;
}[] = [
  {
    id: "all",
    label: "All",
    icon: null,
  },
  {
    id: "media",
    label: "Media",
    icon: Film,
  },
  {
    id: "documents",
    label: "Documents",
    icon: FileText,
  },
];

const emptyContent = {
  all: {
    icon: FolderOpen,
    title: "No files yet",
    description: "Your library is empty. Upload some files to get started.",
  },

  media: {
    icon: ImageIcon,
    title: "No media yet",
    description: "Images and videos you upload will appear here.",
  },

  documents: {
    icon: FileText,
    title: "No documents yet",
    description: "Your uploaded documents will appear here.",
  },
} as const;

export default function Library() {
  const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0].id);
  const [view, setView] = useState<"grid" | "list">("list");

  const content = emptyContent[selectedTab];
  const EmptyIcon = content.icon;

  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-4xl px-4 pb-20 pt-2.5 sm:px-6 sm:pt-25">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
          className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <h1 className="text-[28px] font-medium tracking-[-0.03em]">
            Library
          </h1>

          <InputGroup className="h-10 w-full rounded-full px-1 sm:w-55">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>

            <InputGroupInput
              placeholder="Search"
              className="h-10 rounded-full pl-9 pr-3 text-[14px] text-white placeholder:text-[#999] shadow-none outline-none focus-visible:ring-0"
            />
          </InputGroup>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.08,
            duration: 0.3,
          }}
          className="mt-8 flex items-center justify-between gap-3 sm:mt-10"
        >
          <div className="min-w-0 flex-1 overflow-x-auto no-scrollbar">
            <div className="flex w-max items-center gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = selectedTab === tab.id;

                return (
                  <Button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className="relative h-10 shrink-0 cursor-pointer rounded-full bg-transparent px-4 text-sm hover:bg-white/5 sm:px-5"
                  >
                    {active && (
                      <motion.div
                        layoutId="active-tab"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                        className="absolute inset-0 rounded-full bg-primary"
                      />
                    )}

                    <span
                      className={`
                        relative z-10 flex items-center gap-2
                        ${
                          active
                            ? "text-white"
                            : "text-black dark:text-[#b5b5b5]"
                        }
                      `}
                    >
                      {Icon && <Icon size={15} strokeWidth={1.8} />}

                      {tab.label}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <Button className=" h-10 w-10 cursor-pointer rounded-full bg-white/5 hover:bg-white/10">
              <SlidersHorizontal className="size-4 text-white" />
            </Button>

            <Separator orientation="vertical" />

            <div className="flex items-center gap-1">
              <Button
                onClick={() => setView("grid")}
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors
                  ${
                    view === "grid"
                      ? "bg-primary text-white"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }
                `}
              >
                <LayoutGrid size={17} strokeWidth={1.7} />
              </Button>

              <Button
                onClick={() => setView("list")}
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors
                  ${
                    view === "list"
                      ? "bg-primary text-white"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }
                `}
              >
                <List className="size-4" />
              </Button>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:hidden">
            <Button
              size="icon"
              className="h-10 w-10 cursor-pointer rounded-full bg-white/5 hover:bg-white/10"
            >
              <SlidersHorizontal className="size-4 text-white" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button className="h-10 gap-2 rounded-full bg-white/5 px-3 text-white hover:bg-white/10 cursor-pointer" />
                }
              >
                {view === "grid" ? (
                  <LayoutGrid size={16} strokeWidth={1.7} />
                ) : (
                  <List size={16} strokeWidth={1.7} />
                )}

                <span className="text-sm">
                  {view === "grid" ? "Grid" : "List"}
                </span>

                <ChevronDown className="size-3.5 opacity-60" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem
                  onClick={() => setView("grid")}
                  className="cursor-pointer"
                >
                  <LayoutGrid className="size-4" />

                  <span>Grid</span>

                  {view === "grid" && <Check className="ml-auto size-4" />}
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setView("list")}
                  className="cursor-pointer"
                >
                  <List className="size-4" />

                  <span>List</span>

                  {view === "list" && <Check className="ml-auto size-4" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab}
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -8,
            }}
            transition={{
              duration: 0.25,
            }}
            className="mt-8 sm:mt-10"
          >
            <Empty className="min-h-90 rounded-2xl border bg-card px-5 py-12 sm:min-h-105 sm:px-20 sm:py-20">
              <EmptyHeader>
                <EmptyMedia className="rounded-lg bg-primary/5 p-2.5 text-primary">
                  <EmptyIcon className="size-5" />
                </EmptyMedia>

                <EmptyTitle>{content.title}</EmptyTitle>

                <EmptyDescription className="max-w-sm">
                  {content.description}
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
