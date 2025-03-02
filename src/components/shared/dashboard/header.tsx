import React from "react";
import { HelpCircle } from "../svgs";
import { ProfilePopover } from "./profile-popover";
import { NotificationPopover } from "./notification-popover";
import { BalancePopover } from "./balance-popover";
import { MessagesPopover } from "./messages-popover";

export function Header() {
  return (
    <div className="app_dashboard_header">
      <div className="app_dashboard_header__search"></div>

      <div className="app_dashboard_header__ctt flex items-center gap-2">
        <BalancePopover />

        <div className="app_dashboard_header__ctt__divider"></div>
        <button
          type="button"
          className="h-full flex items-center justify-center w-[40px]"
        >
          <HelpCircle />
        </button>

        <MessagesPopover />
        <NotificationPopover />
        <ProfilePopover />
      </div>
    </div>
  );
}
