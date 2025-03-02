"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { SVGProps, useState } from "react";

interface Tab {
  value: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactElement<SVGProps<SVGSVGElement>>;
}

interface MyTabsProps {
  tabs: Tab[];
  defaultValue: string;
  className?: string;
  onValueChange?: (value: string) => void; // New prop for handling value changes
}

export function MyTabs({
  tabs,
  defaultValue,
  className = "",
  onValueChange,
}: MyTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleValueChange = (value: string) => {
    setActiveTab(value);
    if (onValueChange) {
      onValueChange(value); // Call the passed event handler
    }
  };

  return (
    <Tabs
      defaultValue={defaultValue}
      className={`w-full ${className}`}
      onValueChange={handleValueChange} // Use the new handler
    >
      <TabsList className="w-full flex items-center justify-between space-x-0 bg-background rounded-none border-b border-grey-light pb-3 px-0 ml-0">
        {tabs.map((tab, idx) => (
          <TabsTrigger
            key={tab.value}
            className="text-base px-3 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-primary-from data-[state=active]:font-medium data-[state=active]:border-b-[2px] pb-[6px]"
            value={tab.value}
          >
            <div className="flex items-center space-x-2 pb-0">
              <span
                id={idx.toString()}
                className={`w-10 h-10 rounded-[5px] flex items-center justify-center transition-colors ${
                  activeTab === tab.value
                    ? "bg-[#7152F30D]" // Active state color
                    : "bg-transparent" // Inactive state color
                }`}
              >
                {tab.icon &&
                  React.cloneElement(tab.icon, {
                    fill: activeTab === tab.value ? "#5d30be" : "#131313",
                  })}
              </span>
              <span>{tab.label}</span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-5">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
