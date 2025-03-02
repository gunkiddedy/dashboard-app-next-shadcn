import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Mail } from "../svgs";
import Image from "next/image";
import dashboard from "@/lib/assets/dashboard";
import Link from "next/link";

export function MessagesPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="h-full flex items-center justify-center w-[40px]"
        >
          <Mail />
        </button>
      </PopoverTrigger>
      <PopoverContent asChild align="end" className="p-0 rounded-[0px]">
        <div className="app_dashboard_header__ctt__profile__popover messages flex flex-col">
          <div className="app_dashboard_header__ctt__profile__popover__item">
            <p className="app_dashboard_header__ctt__profile__popover__item__text title">
              Messages
            </p>
          </div>

          <div className="app_dashboard_header__ctt__message__item unread flex items-center gap-3 py-3 px-4">
            <div className="app_dashboard_header__ctt__message__item__avi">
              <Image src={dashboard.avi} alt="avi" />
            </div>

            <div className="flex-1">
              <div className="flex items-center">
                <p className="app_dashboard_header__ctt__message__item__title">
                  Moore Iron -
                </p>
                <p className="app_dashboard_header__ctt__message__item__tag">
                  #12277899
                </p>
              </div>

              <p className="app_dashboard_header__ctt__message__item__message line-clamp-1">
                I would love to considered for project where for project where
              </p>

              <p className="app_dashboard_header__ctt__message__item__time line-clamp-1">
                Today
              </p>
            </div>
          </div>

          <div className="app_dashboard_header__ctt__message__item flex items-center gap-3 py-3 px-4">
            <div className="app_dashboard_header__ctt__message__item__avi">
              <Image src={dashboard.avi} alt="avi" />
            </div>

            <div className="flex-1">
              <div className="flex items-center">
                <p className="app_dashboard_header__ctt__message__item__title">
                  Moore Iron -
                </p>
                <p className="app_dashboard_header__ctt__message__item__tag">
                  #12277899
                </p>
              </div>

              <p className="app_dashboard_header__ctt__message__item__message line-clamp-1">
                I would love to considered for project where for project where
              </p>

              <p className="app_dashboard_header__ctt__message__item__time line-clamp-1">
                Today
              </p>
            </div>
          </div>

          <div className="app_dashboard_header__ctt__message__item flex items-center gap-3 py-3 px-4">
            <div className="app_dashboard_header__ctt__message__item__avi">
              <Image src={dashboard.avi} alt="avi" />
            </div>

            <div className="flex-1">
              <div className="flex items-center">
                <p className="app_dashboard_header__ctt__message__item__title">
                  Moore Iron -
                </p>
                <p className="app_dashboard_header__ctt__message__item__tag">
                  #12277899
                </p>
              </div>

              <p className="app_dashboard_header__ctt__message__item__message line-clamp-1">
                I would love to considered for project where for project where
              </p>

              <p className="app_dashboard_header__ctt__message__item__time line-clamp-1">
                Today
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center py-3">
            <Link
              href="#"
              className="app_dashboard_header__ctt__message__action"
            >
              View all messages
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
