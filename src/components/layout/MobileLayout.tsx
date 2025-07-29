import { useState } from "react";
import { Outlet } from "react-router-dom";
import { BottomNavigation } from "./BottomNavigation";

export function MobileLayout() {
  return (
    <div className="mobile-container bg-background min-h-screen">
      <main className="pb-20">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
}