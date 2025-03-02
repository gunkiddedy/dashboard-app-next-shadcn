import React from "react";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Button, FormInput, FormSelect } from "@/components";
import { FormField } from "@/components/ui/form";
import { formSchema } from "@/schema/profile/onboardingProfiling";
import { Tax, TaxTypes } from "@/constants";

type TForm1 = z.infer<typeof formSchema>;

interface IProps {
  form: UseFormReturn<TForm1>;
  nextPage: () => void;
}

const Form1 = (props: IProps) => {
  const {
    form: {
      control,
      formState: { errors },
      trigger,
    },
    nextPage,
  } = props;

  const onNextClick = async () => {
    const isValid = await trigger([
      "tax",
      "taxType",
      "title",
      "firstName",
      "lastName",
      "middleName",
      "phone",
    ]);
    if (!isValid) {
      return;
    }
    // check for errors
    nextPage();
  };

  return (
    <>
      <div className="mb-6">
        <div className="text-center">
          <p className="Profiling-form-title">Tax Information</p>
          <h5 className="Profiling-form-subtitle">
            Getting your account more personalized
          </h5>
        </div>
      </div>
      <div className="grid">
        <FormField
          control={control}
          name="tax"
          render={({ field }) => (
            <FormSelect
              label="Select Tax"
              error={errors.tax}
              placeholder="Select One"
              containerClass="mb-4"
              className=""
              selectData={Tax}
              {...field}
            />
          )}
        />
        <FormField
          control={control}
          name="taxType"
          render={({ field }) => (
            <FormSelect
              label="Select Tax Type"
              error={errors.taxType}
              placeholder="Select one"
              containerClass="mb-4"
              className=""
              selectData={TaxTypes}
              {...field}
            />
          )}
        />
      </div>
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormSelect
            label="Title"
            error={errors.taxType}
            placeholder="Select one"
            containerClass="mb-4"
            className=""
            selectData={TaxTypes}
            {...field}
          />
        )}
      />
      <FormField
        control={control}
        name="firstName"
        render={({ field }) => (
          <FormInput
            label="First name"
            error={errors.firstName}
            placeholder="First Name"
            containerClass="mb-4"
            required
            {...field}
          />
        )}
      />
      <FormField
        control={control}
        name="middleName"
        render={({ field }) => (
          <FormInput
            label="Middle Name"
            error={errors.middleName}
            placeholder="Middle Name"
            containerClass="mb-4"
            required
            {...field}
          />
        )}
      />
      <FormField
        control={control}
        name="lastName"
        render={({ field }) => (
          <FormInput
            label="Last Name"
            error={errors.lastName}
            placeholder="Last Name"
            containerClass="mb-4"
            required
            {...field}
          />
        )}
      />
      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormInput
            label="Phone Number"
            error={errors.phone}
            placeholder="01-1199929292"
            containerClass="mb-4"
            required
            {...field}
          />
        )}
      />

      <Button
        disabled={false}
        type="button"
        onClick={onNextClick}
        label="Continue"
        className="w-full"
      />
    </>
  );
};

export default Form1;
