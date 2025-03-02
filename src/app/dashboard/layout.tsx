import React from "react";
import Navbar from "@/components/shared/dashboard/navbar";
import SideNav from "@/components/shared/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full overflow-y-hidden">
      <SideNav />
      <div className="flex flex-col w-full">
        <Navbar />
        <main className="flex-1 px-6 pt-10 pb-8 bg-background overflow-scroll">
          {children}
        </main>
      </div>
    </div>
  );
}
