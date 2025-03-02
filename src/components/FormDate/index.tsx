"use client";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FieldError } from "react-hook-form";
import { RenderIf } from "../shared";
import Image from "next/image";
import dashboardIcons from "@/lib/assets/dashboard";

interface IProps {
  value: Date;
  onChange: any;
  label: string;
  error?: FieldError;
  placeholder: string;
  containerClass?: string;
  className?: string;
  classButton?: string;
  useIcon?: boolean;
}

export function FormDatePicker(props: IProps) {
  const {
    value,
    onChange,
    label,
    placeholder,
    containerClass,
    className,
    classButton,
    useIcon = false,
    error,
  } = props;
  return (
    <FormItem
      className={cn("flex flex-col", {
        [`${containerClass}`]: !!containerClass,
      })}
    >
      <FormLabel>{label}</FormLabel>
      <Popover modal>
        <PopoverTrigger asChild>
          <FormControl className={className}>
            <div className="relative">
              <Button
                variant="outline"
                className={cn(`${classButton} w-full text-left justify-start`, {
                  "text-black": value,
                })}
              >
                {value ? format(value, "PPP") : placeholder}
              </Button>
              <RenderIf condition={useIcon}>
                <Image
                  className="absolute w-5 h-5 right-2 top-1/2 -translate-y-1/2 transform cursor-pointer"
                  width={7}
                  height={7}
                  src={dashboardIcons.calendarIcon}
                  alt=""
                />
              </RenderIf>
            </div>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-[1000]" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            // disabled={(date) =>
            //   date > new Date() || date < new Date("1900-01-01")
            // }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {/* <FormMessage /> */}
      {!!error && <FormMessage className="text-xs" />}
    </FormItem>
  );
}
