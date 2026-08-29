"use client";

import { AuthDialog } from "@/components/auth-dialog";
import { AuthMobileDrawer } from "@/components/auth-mobile-drawer";

const page = () => {
  return (
    <div className="flex items-center justify-end p-2.5">
      <div className="flex items-center gap-2.5">
        <AuthDialog>Log in</AuthDialog>
        <AuthDialog variant={"outline"}>Sign up</AuthDialog>
      </div>
      <AuthMobileDrawer />
    </div>
  );
};

export default page;
