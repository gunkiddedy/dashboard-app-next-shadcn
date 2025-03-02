"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { Form, FormField } from "@/components/ui/form";

import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import { documentsSchema } from "@/schema/employee/documents";
import FileUpload from "@/components/FileUpload/FileUploadV1";
import authAssets from "@/lib/assets/auth";
import dashboardIcons from "@/lib/assets/dashboard";
import { CircleUploadIcon } from "@/components/shared/svgs";

const DocumentsForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof documentsSchema>>({
    resolver: zodResolver(documentsSchema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (values: z.infer<typeof documentsSchema>) => {
    setLoading(true);
    try {
      console.log("Personal Information Form", values);
    } catch (error) {
      // TODO: show toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit, (err) => {
            console.log("error is", err);
          })}
          className="flex flex-col space-y-8"
        >
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="">
              <p className="capitalize text-[#131313] text-base font-normal mb-2">
                resume
              </p>
              <FormField
                control={control}
                name="resumeFile"
                render={({ field }) => (
                  <FileUpload
                    containerClass="mb-3"
                    setFile={(e) => {
                      field.onChange(e);
                    }}
                    accept={{
                      "application/pdf": [".pdf"],
                      "application/msword": [".doc"],
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                        [".docx"],
                    }}
                    // error={errors.resume}
                  >
                    {/* this are the children from its components */}

                    {/* circle icon upload */}
                    <div className="bg-circle-upload rounded-lg bg-primary w-10 h-10 inline-flex items-center justify-center">
                      <CircleUploadIcon />
                    </div>
                    {/* body text */}
                    <p className="text-sm font-normal mt-2">
                      Drag & Drop or{" "}
                      <span className="text-primary">choose file</span> to
                      upload
                    </p>
                    {/* description */}
                    <p className="text-xs">Supported formats : Jpeg, pdf</p>
                  </FileUpload>
                )}
              />
            </div>
            <div className="">
              <p className="capitalize text-[#131313] text-base font-normal mb-2">
                Appointment Letter
              </p>
              <FormField
                control={control}
                name="appointmentLetterFile"
                render={({ field }) => (
                  <FileUpload
                    containerClass="mb-3"
                    setFile={(e) => {
                      field.onChange(e);
                    }}
                    accept={{
                      "application/pdf": [".pdf"],
                      "application/msword": [".doc"],
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                        [".docx"],
                    }}
                    // error={errors.resume}
                  >
                    {/* this are the children from its components */}

                    {/* circle icon upload */}
                    <div className="bg-circle-upload rounded-lg bg-primary w-10 h-10 inline-flex items-center justify-center">
                      <CircleUploadIcon />
                    </div>
                    {/* body text */}
                    <p className="text-sm font-normal mt-2">
                      Drag & Drop or{" "}
                      <span className="text-primary">choose file</span> to
                      upload
                    </p>
                    {/* description */}
                    <p className="text-xs">Supported formats : Jpeg, pdf</p>
                  </FileUpload>
                )}
              />
            </div>
            <div className="">
              <p className="capitalize text-[#131313] text-base font-normal mb-2">
                Salary Slips
              </p>
              <FormField
                control={control}
                name="salarySlipsFile"
                render={({ field }) => (
                  <FileUpload
                    containerClass="mb-3"
                    setFile={(e) => {
                      field.onChange(e);
                    }}
                    accept={{
                      "application/pdf": [".pdf"],
                      "application/msword": [".doc"],
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                        [".docx"],
                    }}
                    // error={errors.resume}
                  >
                    {/* this are the children from its components */}

                    {/* circle icon upload */}
                    <div className="bg-circle-upload rounded-lg bg-primary w-10 h-10 inline-flex items-center justify-center">
                      <CircleUploadIcon />
                    </div>
                    {/* body text */}
                    <p className="text-sm font-normal mt-2">
                      Drag & Drop or{" "}
                      <span className="text-primary">choose file</span> to
                      upload
                    </p>
                    {/* description */}
                    <p className="text-xs">Supported formats : Jpeg, pdf</p>
                  </FileUpload>
                )}
              />
            </div>
            <div className="">
              <p className="capitalize text-[#131313] text-base font-normal mb-2">
                Relieving Letter
              </p>
              <FormField
                control={control}
                name="relievingLetterFile"
                render={({ field }) => (
                  <FileUpload
                    containerClass="mb-3"
                    setFile={(e) => {
                      field.onChange(e);
                    }}
                    accept={{
                      "application/pdf": [".pdf"],
                      "application/msword": [".doc"],
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                        [".docx"],
                    }}
                    // error={errors.resume}
                  >
                    {/* this are the children from its components */}

                    {/* circle icon upload */}
                    <div className="bg-circle-upload rounded-lg bg-primary w-10 h-10 inline-flex items-center justify-center">
                      <CircleUploadIcon />
                    </div>
                    {/* body text */}
                    <p className="text-sm font-normal mt-2">
                      Drag & Drop or{" "}
                      <span className="text-primary">choose file</span> to
                      upload
                    </p>
                    {/* description */}
                    <p className="text-xs">Supported formats : Jpeg, pdf</p>
                  </FileUpload>
                )}
              />
            </div>
          </div>
          <div className="flex items-center justify-end flex-wrap lg:space-x-3 xl:space-y-0 space-y-3">
            <Button
              label="Cancel"
              className="w-full xl:w-[92px]"
              loading={loading}
              variant="outline"
            />
            <Button
              label="Next"
              className="w-full xl:w-[92px]"
              loading={loading}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DocumentsForm;
