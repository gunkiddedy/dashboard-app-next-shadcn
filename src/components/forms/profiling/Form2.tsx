import React, { useMemo } from "react";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import countryList from "react-select-country-list";

import { Button, FormInput, FormSelect } from "@/components";
import { FormField } from "@/components/ui/form";
import { formSchema } from "@/schema/profile/onboardingProfiling";
import { ImgUpload } from "@/components/shared/profile";
import { Tax } from "@/constants";

type TForm2 = z.infer<typeof formSchema>;

interface IProps {
  form: UseFormReturn<TForm2>;
  nextPage: () => void;
  prevPage: () => void;
}

const Form2 = (props: IProps) => {
  const countryOptions = useMemo(() => countryList().getData(), []);

  const {
    form: {
      control,
      formState: { errors },
      trigger,
      watch,
    },
    nextPage,
    prevPage,
  } = props;

  const onNextClick = async () => {
    const isValid = await trigger([
      "picture",
      "street",
      "city",
      "zipCode",
      "state",
      "country",
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
          <p className="Profiling-form-title">Your photo and location</p>
          <h5 className="Profiling-form-subtitle">
            Getting your account more personalized
          </h5>
        </div>
      </div>

      <FormField
        control={control}
        name="picture"
        render={({ field }) => (
          <ImgUpload
            setFile={(e) => {
              field.onChange(e);
            }}
            alignment="vertical"
            buttonText="Upload new picture"
            error={errors?.picture}
            initialFile={watch("picture")}
          />
        )}
      />

      <FormField
        control={control}
        name="street"
        render={({ field }) => (
          <FormInput
            label="Street"
            error={errors.street}
            placeholder="Your Street"
            containerClass="mb-4"
            required
            {...field}
          />
        )}
      />

      <FormField
        control={control}
        name="city"
        render={({ field }) => (
          <FormInput
            label="City"
            error={errors.city}
            placeholder="Your city"
            containerClass="mb-4"
            required
            {...field}
          />
        )}
      />
      <FormField
        control={control}
        name="zipCode"
        render={({ field }) => (
          <FormInput
            label="Zip Code"
            error={errors.zipCode}
            placeholder="Enter your zip Code"
            containerClass="mb-4"
            required
            {...field}
          />
        )}
      />
      <FormField
        control={control}
        name="country"
        render={({ field }) => (
          <FormSelect
            error={errors.country}
            label="Country"
            placeholder="Select Country"
            containerClass="mb-4 col-span-2"
            className=""
            selectData={countryOptions}
            {...field}
          />
        )}
      />
      <FormField
        control={control}
        name="state"
        render={({ field }) => (
          <FormSelect
            error={errors.state}
            label="State"
            placeholder="Select State"
            containerClass="mb-4 col-span-2"
            className=""
            selectData={Tax}
            {...field}
          />
        )}
      />

      <div className="flex gap-10">
        <Button
          disabled={false}
          type="button"
          onClick={prevPage}
          variant="neutral"
          label="Back"
          className="w-full"
        />
        <Button
          disabled={false}
          type="button"
          onClick={onNextClick}
          label="Continue"
          className="w-full"
        />
      </div>
    </>
  );
};

export default Form2;
