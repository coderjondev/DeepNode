"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";

type Props = ComponentPropsWithoutRef<typeof Button>;

const UserInfo = forwardRef<HTMLButtonElement, Props>(
  ({ className, ...props }, ref) => {
    const { state } = useSidebar();

    return (
      <Button
        ref={ref}
        variant="ghost"
        {...props}
        className={`
          h-auto
          w-full
          cursor-pointer
          justify-start
          rounded-lg
          border
          border-transparent
          px-2
          py-2

          text-sidebar-foreground

          hover:bg-sidebar-accent
          hover:text-sidebar-accent-foreground

          focus-visible:ring-2
          focus-visible:ring-sidebar-ring

          data-[state=open]:bg-sidebar-accent
          data-[state=open]:text-sidebar-accent-foreground

          ${className ?? ""}
        `}
      >
        <Image
          src="/favicon.ico"
          alt="User avatar"
          width={state === "collapsed" ? 35 : 27}
          height={state === "collapsed" ? 35 : 27}
          className="
            shrink-0
            rounded-full
            object-cover
          "
        />

        {state === "expanded" && (
          <p
            className="
              ml-2
              truncate
              font-medium
              text-sidebar-foreground
            "
          >
            Asilbek
          </p>
        )}
      </Button>
    );
  },
);

UserInfo.displayName = "UserInfo";

export default UserInfo;
