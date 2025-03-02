import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AddInsurance } from "../modals/AddInsurance";
import { AddLicense } from "../modals/AddLicense";

const LicenseOptionsPopover = () => {
  const [isInsuranceOpen, setIsInsuranceOpen] = useState(false);
  const [isLicenseeOpen, setIsLicenseeOpen] = useState(false);
  return (
    <Popover>
      <AddInsurance open={isInsuranceOpen} setOpen={setIsInsuranceOpen} />
      <AddLicense open={isLicenseeOpen} setOpen={setIsLicenseeOpen} />
      <PopoverTrigger asChild>
        <div className="bg-primary-50 h-14 w-[100px] flex items-center justify-center rounded-md cursor-pointer">
          <p className=" text-white">Add New</p>
        </div>
      </PopoverTrigger>
      <PopoverContent
        asChild
        align="end"
        className="p-0 rounded-[12px] w-[172px]"
      >
        <div className="px-6 py-6 flex flex-col items-start gap-6 ">
          <button
            className="text-sm font-medium tet-grey-500 w-full text-left"
            onClick={() => {
              setIsInsuranceOpen(true);
            }}
          >
            New Insurance
          </button>
          <button
            className="text-sm font-medium tet-grey-500 w-full text-left"
            onClick={() => {
              setIsLicenseeOpen(true);
            }}
          >
            New License
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LicenseOptionsPopover;
