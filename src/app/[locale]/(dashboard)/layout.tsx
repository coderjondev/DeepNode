import { ReactNode } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/app-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <SidebarProvider className="h-dvh min-h-0">
      {/* <AppSidebar /> */}

      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
