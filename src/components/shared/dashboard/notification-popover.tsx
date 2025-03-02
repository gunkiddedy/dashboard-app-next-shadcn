import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Alert } from "../svgs";
import Image from "next/image";
import dashboard from "@/lib/assets/dashboard";
import Link from "next/link";
import { RenderIf } from "..";

export function NotificationPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="h-full flex items-center justify-center w-[40px]"
        >
          <Alert />
        </button>
      </PopoverTrigger>
      <PopoverContent asChild align="end" className="p-0 rounded-[0px]">
        <div className="app_dashboard_header__ctt__profile__popover messages flex flex-col">
          <div className="app_dashboard_header__ctt__profile__popover__item flex justify-between items-center">
            <p className="app_dashboard_header__ctt__profile__popover__item__text title">
              Notification
            </p>

            <RenderIf condition={true}>
              <button className="app_dashboard_header__ctt__notification__btn">
                Mark as read
              </button>
            </RenderIf>
          </div>

          <RenderIf condition={false}>
            <div className="flex justify-center items-center app_dashboard_header__ctt__notification__empty">
              <Image src={dashboard.bellIcon} alt="empty" />
            </div>
            <div className="px-4 pt-2 pb-5">
              <p className="text-center app_dashboard_header__ctt__notification__empty_text">
                No Notification
              </p>
              <p className="text-center app_dashboard_header__ctt__notification__empty__details">
                You are all caught up
              </p>
            </div>
          </RenderIf>

          <RenderIf condition={true}>
            <div className="app_dashboard_header__ctt__message__item flex items-center gap-3 py-3 px-4">
              <div className="app_dashboard_header__ctt__message__item__avi">
                <Image src={dashboard.bellIcon} alt="bell icon" />
              </div>

              <div className="flex-1">
                <div className="flex items-center">
                  <p className="app_dashboard_header__ctt__message__item__title flex-1 line-clamp-1">
                    Moore Iron submitted an application
                  </p>
                  {/* <p className="app_dashboard_header__ctt__message__item__tag">
                  #12277899
                </p> */}
                </div>

                <p className="app_dashboard_header__ctt__message__item__time line-clamp-1">
                  2 mins ago
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center py-3">
              <Link
                href="#"
                className="app_dashboard_header__ctt__message__action"
              >
                View all notifications
              </Link>
            </div>
          </RenderIf>
        </div>
      </PopoverContent>
    </Popover>
  );
}
