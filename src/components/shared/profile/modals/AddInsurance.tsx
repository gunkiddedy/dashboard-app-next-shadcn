"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Button from "@/components/Button";
import { Form, FormField } from "@/components/ui/form";
import FormSelect from "@/components/FormSelect";
import { FileUploadV1, FormInput, UploadedFile } from "@/components";
import { InsuranceProviders, TaxTypes } from "@/constants";
import { FormDatePicker } from "@/components/FormDate";
import authAssets from "@/lib/assets/Auth";
import {
  TInsurance,
  insuranceSchema,
} from "@/schema/profileSettings/InsuranceSchema";
import FileUploadV2 from "@/components/FileUpload/FileUploadV2";
import profile from "@/lib/assets/profile";
import {
  useInsurancePatch,
  useInsurancePost,
} from "@/services/queries/insurance";
import { InsuranceType } from "@/services/queries/insurance/types";
import { formatDateToDDMMYYYY } from "@/utils";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  oldData?: InsuranceType;
}

export function AddInsurance({ open, setOpen, oldData }: IProps) {
  const form = useForm<TInsurance>({
    resolver: zodResolver(insuranceSchema),
  });

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = form;

  const close = () => {
    reset();
    setOpen(false);
  };
  const { mutate, isPending } = useInsurancePost(close);
  const { updateIsPending, updateMutate } = useInsurancePatch(
    close,
    oldData?.insurance_id,
  );

  const isFileUploaded = watch("insurance_url");

  const onSubmit = (values: TInsurance) => {
    if (oldData) {
      updateMutate({
        data: {
          ...values,
          issue_date: formatDateToDDMMYYYY(values.issue_date),
          expiry_date: formatDateToDDMMYYYY(values.expiry_date),
          insurance_url: "",
        },
      });
    } else {
      mutate({
        data: {
          ...values,
          issue_date: formatDateToDDMMYYYY(values.issue_date),
          expiry_date: formatDateToDDMMYYYY(values.expiry_date),
          insurance_url: "",
        },
      });
    }
  };
  useEffect(() => {
    if (oldData) {
      setValue("insurance_type", oldData.insurance_type);
      setValue("provider", oldData.provider);
      setValue("coverage_amount", oldData.coverage_amount);
      setValue("issue_date", new Date(oldData.issue_date));
      setValue("expiry_date", new Date(oldData.expiry_date));
    }
  }, [oldData]);
  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetContent className="sm:max-w-[501px] overflow-y-auto ">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold pb-6 ">
            {oldData ? "Edit" : "Add"} Insurance
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
                name="insurance_type"
                render={({ field }) => (
                  <FormSelect
                    label="Type"
                    error={errors.insurance_type}
                    placeholder="Select One"
                    containerClass="mb-6 "
                    className=""
                    selectData={TaxTypes}
                    {...field}
                  />
                )}
              />
              <FormField
                control={control}
                name="provider"
                render={({ field }) => (
                  <FormSelect
                    label="Provider"
                    error={errors.provider}
                    placeholder="Select One"
                    containerClass="mb-6"
                    className=""
                    selectData={InsuranceProviders}
                    {...field}
                  />
                )}
              />
              <FormField
                control={control}
                name="policy_number"
                render={({ field }) => (
                  <FormInput
                    label="Policy Number"
                    error={errors.policy_number}
                    placeholder="Policy Number"
                    containerClass="mb-6"
                    {...field}
                  />
                )}
              />
              <FormField
                control={control}
                name="coverage_amount"
                render={({ field }) => (
                  <FormInput
                    label="Coverage Amount"
                    error={errors.coverage_amount}
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
                          setValue("insurance_url", null);
                        }}
                      />
                      <div className="mt-4">
                        <FormField
                          control={control}
                          name="insurance_url"
                          render={({ field }) => (
                            <FileUploadV2
                              setFile={(e) => {
                                console.log("set file");
                                field.onChange(e);
                              }}
                              buttonText="Upload your Insurance"
                              error={errors?.insurance_url}
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
                      name="insurance_url"
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
                  loading={isPending || updateIsPending}
                  label={oldData ? "Edit Insurance" : "Add Insurance"}
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
