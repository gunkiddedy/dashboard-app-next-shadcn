"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { Form, FormField } from "@/components/ui/form";

import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import { FormDatePicker } from "@/components/FormDate";
import { personalInformationSchema } from "@/schema/employee/personalInformation";
import FormSelect from "@/components/FormSelect";

const PersonalInformationForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof personalInformationSchema>>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      firstName: "",
    },
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (
    values: z.infer<typeof personalInformationSchema>,
  ) => {
    setLoading(true);
    try {
      console.log("Personal Information Form", values);
    } catch (error) {
      // TODO: show toast
    } finally {
      setLoading(false);
    }
  };

  const optionsMaritalStatus = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  // State to hold the selected value
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState("");

  // Handle changes
  const handleChangeMaritalStatus = (value: string) => {
    setSelectedMaritalStatus(value);
    console.log("Selected Value:", value);
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
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormInput
                  required
                  error={errors.firstName}
                  placeholder="First Name"
                  containerClass=""
                  {...field}
                  className="w-full"
                />
              )}
            />
            <FormField
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormInput
                  required
                  error={errors.lastName}
                  placeholder="Last Name"
                  containerClass=""
                  {...field}
                  className="w-full"
                />
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormInput
                  required
                  error={errors.email}
                  placeholder="Your Email Address"
                  containerClass=""
                  {...field}
                  className="w-full"
                />
              )}
            />
            <FormField
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <FormInput
                  required
                  error={errors.phoneNumber}
                  placeholder="Phone Number"
                  containerClass=""
                  {...field}
                  className="w-full"
                />
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={control}
              name="addressCountry"
              render={({ field }) => (
                <FormSelect
                  label=""
                  error={errors.addressCountry}
                  placeholder="Address Country"
                  containerClass=""
                  selectData={optionsMaritalStatus}
                  className="w-full h-[54px] border border-neutral-400 font-extralight text-sm text-neutral-400 rounded-[8px] bg-white focus:outline-none"
                  {...field}
                />
              )}
            />
            <FormField
              control={control}
              name="addressCity"
              render={({ field }) => (
                <FormSelect
                  label=""
                  error={errors.addressCity}
                  placeholder="Address City"
                  containerClass=""
                  selectData={optionsMaritalStatus}
                  className="w-full h-[54px] border border-neutral-400 font-extralight text-sm text-neutral-400 rounded-[8px] bg-white focus:outline-none"
                  {...field}
                />
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={control}
              name="addressStreet"
              render={({ field }) => (
                <FormInput
                  required
                  error={errors.addressStreet}
                  placeholder="Address Street"
                  containerClass=""
                  {...field}
                  className="w-full"
                />
              )}
            />
            <FormField
              control={control}
              name="postalCode"
              render={({ field }) => (
                <FormInput
                  required
                  error={errors.postalCode}
                  placeholder="Address Postal Code"
                  containerClass=""
                  {...field}
                  className="w-full"
                />
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormDatePicker
                  label=""
                  error={errors.dateOfBirth}
                  placeholder="Date of Birth"
                  containerClass="space-y-0"
                  className="w-full"
                  classButton="h-[54px] border border-neutral-400 font-extralight text-sm text-neutral-400 rounded-[8px] bg-white"
                  useIcon={true}
                  {...field}
                />
              )}
            />
            <FormField
              control={control}
              name="gender"
              render={({ field }) => (
                <FormSelect
                  label=""
                  error={errors.gender}
                  placeholder="Gender"
                  containerClass=""
                  selectData={optionsMaritalStatus}
                  className="w-full h-[54px] border border-neutral-400 font-extralight text-sm text-neutral-400 rounded-[8px] bg-white focus:outline-none"
                  {...field}
                />
              )}
            />
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

export default PersonalInformationForm;
