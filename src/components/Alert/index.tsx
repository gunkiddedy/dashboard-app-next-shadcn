import {
  AlertDialog as ShadAlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import Image from "next/image";
import { RoundedCloseIcon } from "../shared/svgs";
import EmployeeFilterForm from "../forms/employee/EmployeeFilterForm";

interface AlertDialogProps {
  title?: string;
  description?: string;
  actionText?: string;
  icon?: string;
  classDialogContent?: string;
}

const Icon = ({ image, className }: { image: string; className: string }) => (
  <Image
    src={image}
    alt={`alert dialog Icon`}
    style={{ width: "100px", height: "auto" }}
    className={className}
  />
);

const AlertDialog = forwardRef(
  (
    {
      title = "Employee Added!",
      description = "Tobiloba Martins has been added to your employee database.",
      actionText = "View Employee Profile",
      classDialogContent = "xl:w-[436px] w-full h-auto rounded-3xl bg-[#FEFBFF] p-8",
      icon = "",
    }: AlertDialogProps,
    ref,
  ) => {
    const [open, setOpen] = useState(false);

    // Expose control methods to the parent component
    useImperativeHandle(ref, () => ({
      openDialog: () => setOpen(true),
      closeDialog: () => setOpen(false),
    }));

    return (
      <ShadAlertDialog open={open} onOpenChange={setOpen}>
        {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger> */}
        <AlertDialogContent className={classDialogContent}>
          <AlertDialogHeader className="flex items-center">
            <Icon className="mb-5" image={icon} />
            <AlertDialogTitle className="text-[32px] font-medium text-[#131313] text-center leading-none">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base font-normal text-[#8B8985] text-center px-5">
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-8">
            <AlertDialogCancel
              onClick={() => setOpen(false)}
              className="bg-primary w-full text-base font-medium text-[#fefbff] hover:text-[#fbf8fc] h-14 rounded-[10px]"
            >
              {actionText}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </ShadAlertDialog>
    );
  },
);

interface AlertDialogFilterProps {
  title?: string;
  // departmentItems?: string[];
  // typeItems?: string[];
}

const AlertDialogFilter = forwardRef(
  (
    {
      title = "Filter",
    }: // departmentItems = [],
    // typeItems = [],
    AlertDialogFilterProps,
    ref,
  ) => {
    const [open, setOpen] = useState(false);

    // Expose control methods to the parent component
    useImperativeHandle(ref, () => ({
      openDialog: () => setOpen(true),
      closeDialog: () => setOpen(false),
    }));

    return (
      <ShadAlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="xl:w-[383px] w-full p-4 rounded-3xl">
          <AlertDialogHeader>
            <div>
              <AlertDialogTitle className="flex items-center justify-between">
                {title}
                <button onClick={() => setOpen(false)}>
                  <RoundedCloseIcon />
                </button>
              </AlertDialogTitle>
              <div className="border-b border-[#EDEDED] w-full my-2" />
            </div>
            <AlertDialogDescription></AlertDialogDescription>
            <EmployeeFilterForm onCancel={() => setOpen(false)} />
          </AlertDialogHeader>
        </AlertDialogContent>
      </ShadAlertDialog>
    );
  },
);

AlertDialog.displayName = "AlertDialog";

export { AlertDialog, AlertDialogFilter };
