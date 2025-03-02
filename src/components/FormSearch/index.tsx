import dashboardIcons from "@/lib/assets/dashboard";
import { FieldError } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import Image from "next/image";
import clsx from "clsx";

interface FormSearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  icon?: any;
  label?: string;
  classInput?: string;
}

const FormSearchInput = ({
  error,
  id,
  required,
  type = "text",
  label,
  icon,
  className,
  classInput = "w-full font-medium pl-12 pr-4 h-12 text-base text-grey-medium/75 border rounded-[8px] border-grey-medium/50 focus:outline-none focus:ring-1 focus:ring-primary-from",
  ...rest
}: FormSearchInputProps) => (
  <FormItem>
    {label ? (
      <FormLabel
        className={clsx(
          "text-sm font-medium leading-[1.4rem] text-secondary-100",
          {
            "text-danger-100": !!error,
          },
        )}
        htmlFor={id}
      >
        {label} {required && <span className="text-danger-50">*</span>}
      </FormLabel>
    ) : null}
    <FormControl className={className}>
      <div className="relative">
        <Input
          type="text"
          className="w-full font-medium pl-12 pr-4 h-12 text-base text-grey-medium/75 border rounded-[8px] border-grey-light focus:outline-none focus:ring-1 focus:ring-primary-from"
          placeholder="Search"
          id={id}
          {...rest}
        />
        <Image
          src={dashboardIcons.searchIcon}
          alt={`Search Icon`}
          style={{
            width: "24px",
            height: "auto",
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </div>
    </FormControl>
    {!!error && <FormMessage className="text-xs" />}
  </FormItem>
);

export { FormSearchInput };
