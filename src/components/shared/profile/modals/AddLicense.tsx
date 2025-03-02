"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Form, FormField } from "@/components/ui/form";
import FormSelect from "@/components/FormSelect";
import { FileUploadV1, FormInput, UploadedFile } from "@/components";
import { TaxTypes } from "@/constants";
import { FormDatePicker } from "@/components/FormDate";
import authAssets from "@/lib/assets/Auth";
import {
  TLicense,
  licenseSchema,
} from "@/schema/profileSettings/licenseSchema";
import FileUploadV2 from "@/components/FileUpload/FileUploadV2";
import profile from "@/lib/assets/profile";
import { stateData } from "@/constants/profileSettings";
import { LicensesType } from "@/services/queries/licenses/types";
import { useLicencePatch, useLicencePost } from "@/services/queries/licenses";
import { formatDateToDDMMYYYY } from "@/utils";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  oldData?: LicensesType;
}

export function AddLicense({ open, setOpen, oldData }: IProps) {
  const form = useForm<TLicense>({
    resolver: zodResolver(licenseSchema),
  });

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = form;
  const close = () => {
    reset();
    setOpen(false);
  };
  const { mutate, isPending } = useLicencePost(close);
  const { updateMutate, updateIsPending } = useLicencePatch(close);

  const isFileUploaded = watch("certificate");

  const onSubmit = (values: TLicense) => {
    if (oldData) {
      updateMutate({
        data: {
          ...values,
          issue_date: formatDateToDDMMYYYY(values.issue_date),
          expiry_date: formatDateToDDMMYYYY(values.expiry_date),
          // license_url: "",
        },
      });
    } else {
      mutate({
        data: {
          ...values,
          issue_date: formatDateToDDMMYYYY(values.issue_date),
          expiry_date: formatDateToDDMMYYYY(values.expiry_date),
          // license_url: "",
        },
      });
    }
  };
  useEffect(() => {
    if (oldData) {
      setValue("state", oldData.state);
      // setValue("license_link", oldData.license_link);
      setValue("license_number", oldData.license_number);
      setValue("license_url", oldData.license_url);
      setValue("issue_date", new Date(oldData.issue_date));
      setValue("expiry_date", new Date(oldData.expiry_date));
    }
  }, [oldData]);
  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetContent className="sm:max-w-[501px] overflow-y-auto ">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold pb-6 ">
            {oldData ? "Edit" : "Add"} License
          </SheetTitle>
        </SheetHeader>
        <div className="grid gap-4">
          <Form {...form}>
            <form
              className=" "
              onSubmit={handleSubmit(onSubmit, (err) => {
                console.log("error is", err);
              })}
            >
              <FormField
                control={control}
                name="state"
                render={({ field }) => (
                  <FormSelect
                    label="State"
                    error={errors.state}
                    placeholder="Select One"
                    containerClass="mb-6 "
                    className=""
                    selectData={stateData}
                    {...field}
                  />
                )}
              />
              <FormField
                control={control}
                name="license_title"
                render={({ field }) => (
                  <FormSelect
                    label="License"
                    error={errors.license_title}
                    placeholder="Select One"
                    containerClass="mb-6"
                    className=""
                    selectData={TaxTypes}
                    {...field}
                  />
                )}
              />
              <FormField
                control={control}
                name="license_number"
                render={({ field }) => (
                  <FormInput
                    label="License Number"
                    error={errors.license_number}
                    placeholder="License Number"
                    containerClass="mb-6"
                    {...field}
                  />
                )}
              />
              <FormField
                control={control}
                name="license_url"
                render={({ field }) => (
                  <FormInput
                    label="License Link"
                    error={errors.license_url}
                    placeholder="Paste here"
                    containerClass="mb-6"
                    {...field}
                  />
                )}
              />
              <FormField
                control={control}
                name="issue_date"
                render={({ field }) => (
                  <FormDatePicker
                    label="Issue Date"
                    error={errors.issue_date}
                    placeholder="Select One"
                    containerClass="mb-6"
                    {...field}
                  />
                )}
              />
              <FormField
                control={control}
                name="expiry_date"
                render={({ field }) => (
                  <FormDatePicker
                    label="Expiry Date"
                    error={errors.expiry_date}
                    placeholder="Select One"
                    containerClass="mb-6"
                    {...field}
                  />
                )}
              />

              <div className="mt-4 mb-8">
                <div className="pt-1">
                  {isFileUploaded ? (
                    <>
                      <UploadedFile
                        deleteIcon={profile.fileDelete}
                        {...{ isResumeUploaded: isFileUploaded }}
                        onDeleteFile={() => {
                          setValue("certificate", null);
                        }}
                      />
                      <div className="mt-4">
                        <FormField
                          control={control}
                          name="certificate"
                          render={({ field }) => (
                            <FileUploadV2
                              setFile={(e) => {
                                console.log("set file");
                                field.onChange(e);
                              }}
                              buttonText="Upload your License"
                              error={errors?.certificate}
                              accept={[
                                "application/pdf",
                                "application/msword",
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                              ]}
                            />
                          )}
                        />
                      </div>
                    </>
                  ) : (
                    <FormField
                      control={control}
                      name="certificate"
                      render={({ field }) => (
                        <FileUploadV1
                          containerClass="mb-3"
                          borderColor="#4640DE"
                          uploadIcon={authAssets.UploadIcon}
                          setFile={(e) => {
                            field.onChange(e);
                          }}
                          accept={{
                            "application/pdf": [".pdf"],
                            "application/msword": [".doc"],
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                              [".docx"],
                          }}
                        >
                          <>
                            <Image
                              alt="upload icon"
                              src={authAssets.UploadIcon}
                              className="w-10 h-10"
                            />

                            <div className="flex items-center gap-[6px]">
                              <p className="text-base font-medium text-[#4640DE] leading-[25.6px] font-epilogue">
                                Click or replace
                              </p>
                              <p className="text-base font-medium leading-[25.6px] font-epilogue">
                                to drag and drop
                              </p>
                            </div>
                            <p className="text-base font-medium leading-[25.6px] font-epilogue">
                              SVG, PNG, JPG or GIF (max. 400 x 400px)
                            </p>
                          </>
                        </FileUploadV1>
                      )}
                    />
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <SheetClose>
                  <Button
                    label="Cancel"
                    className="w-[105px] h-[52px] border-primary-500"
                    type="button"
                    variant="neutral"
                  />
                </SheetClose>
                <Button
                  loading={updateIsPending || isPending}
                  label={oldData ? "Edit License" : "Add License"}
                  className="w-[160px] h-[52px]"
                  type="submit"
                />
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
