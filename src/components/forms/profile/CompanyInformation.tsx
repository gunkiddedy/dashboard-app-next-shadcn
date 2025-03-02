"use client";

import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import { Button, FormInput } from "@/components";
import { companySchema } from "@/schema/profileSettings/CompanySchema";
import { useRouter } from "next/navigation";
import routes from "@/lib/routes";
import { useRequestServicePost } from "@/services/queries/register-service";

type TContact = z.infer<typeof companySchema>;

const CompanyInformationForm = () => {
  const { mutate, isPending } = useRequestServicePost();
  const router = useRouter();
  const form = useForm<TContact>({
    resolver: zodResolver(companySchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = (values: TContact) => {
    mutate({
      data: values,
    });
  };
  return (
    <div className="">
      <Form {...form}>
        <form
          className=""
          onSubmit={handleSubmit(onSubmit, (err) => {
            console.log("error is", err);
          })}
        >
          <div className="max-w-[600px]">
            <FormField
              control={control}
              name="service_company_name"
              render={({ field }) => (
                <FormInput
                  label="New Company Name"
                  error={errors.service_company_name}
                  placeholder="Enter Company Name"
                  containerClass="mb-4 flex-1"
                  className=""
                  {...field}
                />
              )}
            />
            <FormField
              control={control}
              name="service_company_admin_username"
              render={({ field }) => (
                <FormInput
                  label="New Admin Username"
                  error={errors.service_company_admin_username}
                  placeholder="Enter Username"
                  containerClass="mb-4 flex-1"
                  className=""
                  {...field}
                />
              )}
            />

            <FormField
              control={control}
              name="service_company_admin_email"
              render={({ field }) => (
                <FormInput
                  label="Admin Email"
                  error={errors.service_company_admin_email}
                  placeholder="Enter Email"
                  containerClass="mb-4"
                  className=""
                  {...field}
                />
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormInput
                  label="Re-enter Current Password"
                  error={errors.password}
                  placeholder="Enter your password"
                  containerClass="mb-8"
                  type="password"
                  className=""
                  {...field}
                />
              )}
            />
          </div>

          <div className="pt-8 border-t border-neutral-350 flex items-center gap-6">
            <Button
              label="Back"
              onClick={() => {
                router.push(routes.dashboard.profile.becomeService.faq.path);
              }}
              className=" rounded-xl w-[108px] h-14 text-primary-50 border-primary-500"
              variant="neutral"
              type="button"
            />
            <Button
              label="Update Contact Information"
              className=" rounded-xl w-[243px] h-14"
              type="submit"
              loading={isPending}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CompanyInformationForm;
