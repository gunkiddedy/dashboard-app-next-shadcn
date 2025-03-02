"use client";

import React, { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { useForm } from "react-hook-form";
import cx from "classnames";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button, Checkbox, FormInput } from "@/components";
import FormSelect from "../../FormSelect";
import { taxSchema } from "@/schema/profileSettings/TaxInformation";
import { TaxTypes } from "@/constants/profileSettings";
import {
  useTaxInformationPost,
  useTaxInformationRead,
} from "@/services/queries/taxIInformation";
import countryList from "react-select-country-list";

type TTax = z.infer<typeof taxSchema>;

const TaxInformationForm = () => {
  const { data } = useTaxInformationRead();
  const { mutate, isPending } = useTaxInformationPost(data?.tax_information_id);
  const countryOptions = useMemo(() => countryList().getData(), []);
  const form = useForm<TTax>({
    resolver: zodResolver(taxSchema),
    defaultValues: {
      receive_1099_electronically: false,
      tax_id_type: "SSN",
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;
  // console.log(errors);

  const selectedType = watch("tax_id_type");
  const watchCertify = watch("certify");

  const onSubmit = (values: TTax) => {
    if (data?.tax_information_id) {
      mutate({
        data: {
          taxInformation: {
            address: {
              house_number: values.house_number,
              street_address: values.street_address,
              city: values.city,
              state: values.state,
              zip_code: values.zip_code,
              country: values.country,
            },
            tax_type: "",
            tax_id_type: values.tax_id_type,
            tax_id_number: values.tax_id_number,
            business_tax_id_number: values.business_tax_id_number,
            full_name: values.full_name,
            first_name: values.first_name,
            last_name: values.last_name,
            receive_1099_electronically: values.receive_1099_electronically,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (data) {
      setValue("tax_id_type", data.tax_id_type as "SSN" | "TIN");
      setValue("full_name", data.full_name);
      setValue("first_name", data.first_name);
      setValue("last_name", data.last_name);
      // setValue("tax_id_number", data.tax_id_number);
      setValue("business_tax_id_number", data.business_tax_id_number);
      setValue("street_address", data.address.street_address);
      setValue("receive_1099_electronically", data.receive_1099_electronically);
      setValue("city", data.address.city);
      setValue("state", data.address.state);
      setValue("country", data.address.country);
      setValue("zip_code", data.address.zip_code);
      setValue("house_number", data.address.house_number);
    }
  }, [data]);
  return (
    <div className="mt-8">
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
              name="tax_id_type"
              render={({ field }) => (
                <FormSelect
                  label="Select Tax Type"
                  error={errors.tax_id_type}
                  placeholder="Select one"
                  containerClass="mb-4"
                  className="rounded-none"
                  selectData={TaxTypes}
                  {...field}
                />
              )}
            />
            <div className={cx("", { hidden: selectedType !== "SSN" })}>
              <FormField
                control={control}
                name="tax_id_number"
                render={({ field }) => (
                  <FormInput
                    label="Social Security Number"
                    error={errors.tax_id_number}
                    placeholder={data?.tax_id_number || "SSN"}
                    containerClass="mb-4"
                    className="rounded-none"
                    {...field}
                  />
                )}
              />
            </div>

            <div className={cx("", { hidden: selectedType !== "TIN" })}>
              <FormField
                control={control}
                name="full_name"
                render={({ field }) => (
                  <FormInput
                    label="TIN Number"
                    error={errors.full_name}
                    placeholder="Tin Number"
                    containerClass="mb-4"
                    className="rounded-none"
                    {...field}
                  />
                )}
              />
            </div>

            <FormField
              control={control}
              name="business_tax_id_number"
              render={({ field }) => (
                <FormInput
                  label="Doing Business As - optional"
                  error={errors.business_tax_id_number}
                  placeholder="Business Tax Id Name"
                  containerClass="mb-4"
                  className="rounded-none"
                  {...field}
                />
              )}
            />
            <div className="flex items-center gap-5">
              <FormField
                control={control}
                name="first_name"
                render={({ field }) => (
                  <FormInput
                    label="First Name"
                    error={errors.first_name}
                    placeholder="Enter your first name"
                    containerClass="mb-4 flex-1"
                    className="rounded-none"
                    {...field}
                  />
                )}
              />
              <FormField
                control={control}
                name="last_name"
                render={({ field }) => (
                  <FormInput
                    label="Last Name"
                    error={errors.last_name}
                    placeholder="Enter your last name"
                    containerClass="mb-4 flex-1"
                    className="rounded-none"
                    {...field}
                  />
                )}
              />
            </div>
            <FormField
              control={control}
              name="street_address"
              render={({ field }) => (
                <FormInput
                  label="Address"
                  error={errors.street_address}
                  placeholder="Enter your address here"
                  containerClass="mb-4"
                  className="rounded-none"
                  {...field}
                />
              )}
            />

            <div className="flex gap-5 ">
              <FormField
                control={control}
                name="house_number"
                render={({ field }) => (
                  <FormInput
                    error={errors.house_number}
                    placeholder="Suite/Floor"
                    containerClass="mb-4 flex-1"
                    className="rounded-none"
                    {...field}
                  />
                )}
              />

              <FormField
                control={control}
                name="city"
                render={({ field }) => (
                  <FormInput
                    error={errors.city}
                    placeholder="City"
                    containerClass="mb-8 flex-1"
                    className="rounded-none"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex gap-5 ">
              <FormField
                control={control}
                name="state"
                render={({ field }) => (
                  <FormInput
                    error={errors.state}
                    placeholder="State"
                    containerClass="mb-4 flex-1"
                    className="rounded-none"
                    {...field}
                  />
                )}
              />

              <FormField
                control={control}
                name="zip_code"
                render={({ field }) => (
                  <FormInput
                    error={errors.zip_code}
                    placeholder="Zip code"
                    containerClass="mb-4 flex-1"
                    className="rounded-none"
                    {...field}
                  />
                )}
              />
            </div>

            <FormField
              control={control}
              name="country"
              render={({ field }) => (
                <FormSelect
                  error={errors.country}
                  placeholder="Country"
                  containerClass="mb-4"
                  className="rounded-none"
                  selectData={countryOptions}
                  {...field}
                />
              )}
            />
          </div>
          <div className="pb-4 ">
            <FormField
              control={form.control}
              name="receive_1099_electronically"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                  <FormControl>
                    <Checkbox
                      isChecked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-neutral-1000 font-medium text-sm">
                      Receive my 1099 electronically
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="pb-4 ">
            <FormField
              control={form.control}
              name="certify"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                  <FormControl>
                    <Checkbox
                      isChecked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-neutral-1000 font-medium text-sm">
                      <div>
                        <p className="text-neutral-1000 font-normal text-xs pb-1">
                          Under penalty of perjury, I certify that:
                        </p>
                        <p className="text-neutral-1000 font-normal text-xs pb-1">
                          1. The number shown on this form is my correct
                          Taxpayer Identification Number (or I am waiting for a
                          number to be issued to me) and
                        </p>
                        <p className="text-neutral-1000 font-normal text-xs pb-1">
                          2. I am not subject to backup withholding because (a)
                          I am exempt from backup withholding or (b) I have not
                          been notified by the Internal Service (IRS) that I am
                          subject ro backup
                        </p>
                        <p className="text-neutral-1000 font-normal text-xs pl-3 pb-1">
                          withholding as a result of a failure or interest or
                          dividends, or (c) the IRS has notified me that I am no
                          longer subject to backup withholding and
                        </p>
                        <p className="text-neutral-1000 font-normal text-xs pb-1">
                          3. I am a U.S. citizen or other U.S. person
                          (identified below)
                        </p>
                      </div>
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="pb-7">
            <h3 className="font-medium text-xs pt-5 pb-1">
              {" "}
              Certification Instructions
            </h3>
            <p className="text-neutral-1000 font-normal text-xs pb-1 leading-5">
              If you have notified by the IRS that you are currently subject to
              backup withholding because you have failed to report all interests
              and dividends on your tax return, then item 2 above does not
              apply. For real estate transaction, it does not apply. For
              mortgage interest paid, acquisition or abandonment of secured
              property, cancellation of debt, contributions to an individual
              retirement arrangeent (IRA), and generally, payments other than
              interest and dividends are required to sign the certification, but
              you must provide your correct TIN.
            </p>
          </div>
          <div className="pt-8 border-t border-neutral-350 flex items-center gap-6">
            <Button
              label="Cancel"
              className=" rounded-xl w-[108px] h-14 text-primary-50 border-primary-500"
              variant="neutral"
              type="button"
            />
            <Button
              label="Update Tax Information"
              loading={isPending}
              disabled={!watchCertify}
              className=" rounded-xl w-[243px] h-14"
              type="submit"
              title={
                !watchCertify
                  ? "You have to agree to the terms to continue"
                  : ""
              }
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TaxInformationForm;
