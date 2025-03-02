import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components";

export function BalancePopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button">
          <div className="app_dashboard_header__ctt__balance h-full">
            <p className="app_dashboard_header__ctt__balance__text">$ 0.00</p>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent asChild align="end" className="p-0 rounded-[0px]">
        <div className="app_dashboard_header__ctt__profile__popover balance flex flex-col">
          <div className="app_dashboard_header__ctt__profile__popover__item">
            <p className="app_dashboard_header__ctt__profile__popover__item__text title">
              Account Balance
            </p>
          </div>

          <div className="app_dashboard_header__ctt__profile__popover__item flex justify-between items-center">
            <p className="app_dashboard_header__ctt__profile__popover__item__text">
              $ 0.00
            </p>

            <Button label="Add funds" size="lg" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
