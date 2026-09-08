"use client";

import { Check, ChevronRight, Globe } from "@/icons/icons";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { languages } from "@/data/language.data";

const LanguageMenu = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const changeLanguage = (nextLocale: string) => {
    router.replace(
      // @ts-expect-error -- pathname
      { pathname, params },
      { locale: nextLocale },
    );
  };

  const currentLanguage = languages.find((lang) => lang.id === locale);

  const isRtl = ["ar"].includes(locale);

  const t = useTranslations("");

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            className="w-full cursor-pointer justify-between py-4.5 text-sidebar-foreground rounded-full transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <p className="flex items-center gap-1">
              <Globe className="size-4" />

              {t("sidebar.sidebarFooter.language")}
            </p>

            <span className="flexitems-centergap-1text-muted-foreground">
              {currentLanguage?.flag}
              {currentLanguage?.nativeName}

              <ChevronRight
                className={`
                  size-4
                  transition-transform
                  ${isRtl ? "rotate-180" : ""}
                `}
              />
            </span>
          </Button>
        }
      />

      <PopoverContent
        side={isRtl ? "left" : "right"}
        className={`absolute ${isRtl ? "right-5" : "left-5"} -bottom-10 max-h-70 w-50 gap-1 overflow-y-auto rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-lg`}
      >
        {languages.map((lang) => {
          const isActive = lang.id === locale;

          return (
            <Button
              key={lang.id}
              variant="ghost"
              data-active={isActive}
              className="h-9 w-full cursor-pointer justify-between rounded-full text-popover-foreground hover:bg-accent hover:text-accent-foreground"
              onClick={() => changeLanguage(lang.id)}
            >
              <p className="flex items-center gap-2">
                <span className="text-base leading-none">{lang.flag}</span>

                {lang.nativeName}
              </p>

              {isActive && <Check className="size-4 text-primary" />}
            </Button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export default LanguageMenu;
