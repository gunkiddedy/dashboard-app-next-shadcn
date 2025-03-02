"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { profilePopoverData } from "@/utils/static";
import { LogOut } from "../svgs";
import { logout } from "@/lib/auth";
import routes from "@/lib/routes";

export function ProfilePopover() {
  const navigate = useRouter();
  const handleLogout = async () => {
    try {
      await logout();
      navigate.push(routes.auth.login.path);
    } catch (error) {}
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button">
          <div className="app_dashboard_header__ctt__profile">
            <h3 className="app_dashboard_header__ctt__profile__text">CO</h3>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent asChild align="end" className="p-0 rounded-[0px]">
        <div className="app_dashboard_header__ctt__profile__popover flex flex-col">
          <div className="app_dashboard_header__ctt__profile__popover__item">
            <p className="app_dashboard_header__ctt__profile__popover__item__text title">
              Account Menu
            </p>
          </div>

          {profilePopoverData.map((item) => (
            <Link href={item.route} key={item.id}>
              <div className="app_dashboard_header__ctt__profile__popover__item">
                {item.icon()}
                <p className="app_dashboard_header__ctt__profile__popover__item__text">
                  {item.label}
                </p>
              </div>
            </Link>
          ))}
          <div
            role="button"
            onClick={handleLogout}
            className="app_dashboard_header__ctt__profile__popover__item"
          >
            {LogOut()}
            <p className="app_dashboard_header__ctt__profile__popover__item__text">
              Log out
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
