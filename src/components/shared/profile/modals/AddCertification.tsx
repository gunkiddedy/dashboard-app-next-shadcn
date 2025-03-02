"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/Button";

import { Form, FormField } from "@/components/ui/form";
import FormSelect from "@/components/FormSelect";
import { FileUploadV1, FormInput, UploadedFile } from "@/components";
import {
  TCertificate,
  certificationSchema,
} from "@/schema/profileSettings/CertificationSchema";
import { FormDatePicker } from "@/components/FormDate";
import authAssets from "@/lib/assets/Auth";
import profile from "@/lib/assets/profile";
import FileUploadV2 from "@/components/FileUpload/FileUploadV2";
import { industryData, organizationData } from "@/constants/profileSettings";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  useCertificationPatch,
  useCertificationPost,
} from "@/services/queries/certifications";
import { formatDateToDDMMYYYY } from "@/utils";
import { CertificationType } from "@/services/queries/certifications/types";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  oldData?: CertificationType;
}

export function AddCertification({ open, setOpen, oldData }: IProps) {
  const form = useForm<TCertificate>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {},
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
  const { mutate, isPending } = useCertificationPost(close);
  const { updateIsPending, updateMutate } = useCertificationPatch(
    close,
    oldData?.certificate_id,
  );

  const isFileUploaded = watch("certificate_url");

  const onSubmit = (values: TCertificate) => {
    if (oldData) {
      updateMutate({
        data: {
          ...values,
          issue_date: formatDateToDDMMYYYY(values.issue_date),
          expiry_date: formatDateToDDMMYYYY(values.expiry_date),
          certificate_url: "",
        },
      });
    } else {
      mutate({
        data: {
          ...values,
          issue_date: formatDateToDDMMYYYY(values.issue_date),
          expiry_date: formatDateToDDMMYYYY(values.expiry_date),
          certificate_url: "",
        },
      });
    }
  };
  useEffect(() => {
    if (oldData) {
      console.log(oldData.industry);
      setValue("title", oldData.title);
      setValue("industry", oldData.industry);
      setValue("organization", oldData.organization);
      setValue("verification_link", oldData.verification_link);
      setValue("issue_date", new Date(oldData.issue_date));
      setValue("expiry_date", new Date(oldData.expiry_date));
    }
  }, [oldData]);
  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetContent className="sm:max-w-[501px] overflow-y-auto ">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold pb-6 ">
            {oldData ? "Edit" : "Add"} Certification
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
                name="industry"
                render={({ field }) => (
                  <FormSelect
                    label="Industry"
                    error={errors.industry}
                    placeholder="Select your industry"
                    containerClass="mb-6 "
                    className=""
                    selectData={industryData}
                    {...field}
                  />
                )}
              />
              <FormField
                control={control}
                name="organization"
                render={({ field }) => (
                  <FormSelect
                    label="Organization"
                    error={errors.organization}
                    placeholder="Select an organization"
                    containerClass="mb-6"
                    className=""
                    selectData={organizationData}
                    {...field}
                  />
                )}
              />
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormInput
                    label="Certification Title"
                    error={errors.industry}
                    placeholder="Type your certification title"
                    containerClass="mb-6"
                    {...field}
                  />
                )}
              />
              <FormField
                control={control}
                name="verification_link"
                render={({ field }) => (
                  <FormInput
                    label="Certification Verification Link"
                    error={errors.verification_link}
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
                          setValue("certificate_url", null);
                        }}
                      />
                      <div className="mt-4">
                        <FormField
                          control={control}
                          name="certificate_url"
                          render={({ field }) => (
                            <FileUploadV2
                              setFile={(e) => {
                                field.onChange(e);
                              }}
                              buttonText="Upload your certificate"
                              error={errors?.certificate_url}
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
                      name="certificate_url"
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
                  label={oldData ? "Edit Certification" : "Add Certification"}
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
