"use client";

import { CardSummary } from "@/components/shared/dashboard/card";
import dashboardIcons from "@/lib/assets/dashboard";
import Image from "next/image";
import React from "react";
import { StatusBadgeLeftIcon } from "@/components/shared/dashboard/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const arrowRoundedLittleIcon = () => (
  <Image
    src={dashboardIcons.arrowRoundedLittleIcon}
    alt="arrow Rounded Little Icon"
    style={{ width: "9px", height: "auto" }}
  />
);

const badgeIconStatus = (status: string) => {
  return (
    <StatusBadgeLeftIcon
      status={status}
      leftIcon={dashboardIcons.arrowRoundedLittleIcon}
    />
  );
};

interface ISelectItemProps {
  id: string;
  value: string;
}

interface SelectItemProps {
  label: string;
  placeholder?: String;
  items: ISelectItemProps[];
}

const SelectItemComp = ({ label, items, placeholder }: SelectItemProps) => {
  return (
    <Select>
      <SelectTrigger className="min-w-24 max-w-max px-2 rounded-[10px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white border border-[#A2A1A81A]">
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default function SettingsPage() {
  return (
    <>
      <div className="flex items-center space-x-2 mb-6">
        <div className="text-xl text-secondary">Setting</div>
      </div>

      {/* Card QUICK SUMMARY */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <CardSummary
          title="Total CTC"
          description="Update: July 16, 2023"
          count1={456876653}
          countDescription1={"12% are in the office"}
          countDescription1Icon={arrowRoundedLittleIcon()}
          icon={dashboardIcons.employeesBlueIcon}
          classCard="lg:w-[32%] w-full"
        />
        <CardSummary
          title="Mode of Work"
          description="Update: July 16, 2023"
          count1={0}
          countDescription1={"Remote"}
          count2={0}
          countDescription2={"Office"}
          icon={dashboardIcons.attendanceBlueIcon}
          classCard="lg:w-[32%] w-full"
        />
        <CardSummary
          title="Status"
          description="Update: July 16, 2023"
          count1={0}
          count2={badgeIconStatus("on-time")}
          icon={dashboardIcons.leavesBlueIcon}
          classCard="lg:w-[32%] w-full"
        />
      </div>

      {/* setting list */}
      <div className="div mt-12">
        <Card className="w-full 2xl:max-w-full bg-background border border-grey-light rounded-[8px] pt-5">
          <CardContent>
            <ul role="list">
              {/* Appearance */}
              <li className="flex items-center justify-between py-4 first:pt-0 last:pb-0 border-b border-b-[#A2A1A81A] last:border-none">
                <div className="py-2">
                  <p className="text-base text-[#16151C] font-semibold">
                    Appearance
                  </p>
                  <p className="text-base text-[#A2A1A8] font-light">
                    Customize how your theme looks on your device
                  </p>
                </div>
                <SelectItemComp
                  label=""
                  placeholder="light"
                  items={[
                    {
                      id: "1",
                      value: "light",
                    },
                    {
                      id: "2",
                      value: "dark",
                    },
                  ]}
                />
              </li>
              {/* Language */}
              <li className="flex items-center justify-between py-4 first:pt-0 last:pb-0 border-b border-b-[#A2A1A81A] last:border-none">
                <div className="py-2">
                  <p className="text-base text-[#16151C] font-semibold">
                    Language
                  </p>
                  <p className="text-base text-[#A2A1A8] font-light">
                    Select your language
                  </p>
                </div>
                <SelectItemComp
                  label=""
                  placeholder="English"
                  items={[
                    {
                      id: "1",
                      value: "English",
                    },
                    {
                      id: "2",
                      value: "Indonesian",
                    },
                  ]}
                />
              </li>
              {/* Two-factor Authentication Switch Comp*/}
              <li className="flex items-center justify-between py-4 first:pt-0 last:pb-0 border-b border-b-[#A2A1A81A] last:border-none">
                <div className="py-2">
                  <p className="text-base text-[#16151C] font-semibold">
                    Two-factor Authentication
                  </p>
                  <p className="text-base text-[#A2A1A8] font-light">
                    Keep your account secure by enabling 2FA via mail
                  </p>
                </div>
                <Switch className="bg-[#34C759] w-[51px] h-[31px]" id="TFA" />
              </li>
              {/* Mobile Push Notifications Comp*/}
              <li className="flex items-center justify-between py-4 first:pt-0 last:pb-0 border-b border-b-[#A2A1A81A] last:border-none">
                <div className="py-2">
                  <p className="text-base text-[#16151C] font-semibold">
                    Mobile Push Notifications
                  </p>
                  <p className="text-base text-[#A2A1A8] font-light">
                    Receive push notification
                  </p>
                </div>
                <Switch className="bg-[#34C759] w-[51px] h-[31px]" id="TFA" />
              </li>
              {/* Desktop Notification Switch Comp*/}
              <li className="flex items-center justify-between py-4 first:pt-0 last:pb-0 border-b border-b-[#A2A1A81A] last:border-none">
                <div className="py-2">
                  <p className="text-base text-[#16151C] font-semibold">
                    Desktop Notification
                  </p>
                  <p className="text-base text-[#A2A1A8] font-light">
                    Receive push notification in desktop
                  </p>
                </div>
                <Switch className="bg-[#34C759] w-[51px] h-[31px]" id="TFA" />
              </li>
              {/* Email Notifications Switch Comp*/}
              <li className="flex items-center justify-between py-4 first:pt-0 last:pb-0 border-b border-b-[#A2A1A81A] last:border-none">
                <div className="py-2">
                  <p className="text-base text-[#16151C] font-semibold">
                    Email Notifications
                  </p>
                  <p className="text-base text-[#A2A1A8] font-light">
                    Receive email notification
                  </p>
                </div>
                <Switch className="bg-[#34C759] w-[51px] h-[31px]" id="TFA" />
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// export default settingsPage;
