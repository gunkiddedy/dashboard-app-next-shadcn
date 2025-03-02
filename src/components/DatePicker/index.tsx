"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dashboardIcons from "@/lib/assets/dashboard";
import Image from "next/image";

const CalendarIcon = () => (
  <Image
    src={dashboardIcons.calendarIcon}
    alt={`calendar Icon`}
    style={{ width: "16px", height: "auto", marginRight: "4px" }}
  />
);

export function DatePicker({ placeholder = "Select a date" }) {
  const [date, setDate] = React.useState<Date | null>(null);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[168px] h-11 rounded-full flex items-center justify-between",
            !date && "text-secondary",
          )}
        >
          <div className="flex items-center space-x-1">
            <CalendarIcon />
            {date ? (
              format(date, "PP")
            ) : (
              <span className="text-sm">{placeholder}</span>
            )}
          </div>
          <Image
            src={dashboardIcons.arrowDownIcon}
            alt={`arrow Down Icon`}
            className="w-4 h-auto"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 border border-grey-light"
        align="start"
      >
        <Calendar
          className="bg-background rounded-[8px]"
          mode="single"
          selected={date}
          onSelect={setDate}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export function DatePickerWithPresets() {
  const [date, setDate] = React.useState<Date | null>(null);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        <Select
          onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
