"use client";
import React from "react";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Button, Multiselect } from "@/components";
import { FormField } from "@/components/ui/form";
import { formSchema } from "@/schema/profile/onboardingProfiling";

type TForm2 = z.infer<typeof formSchema>;

interface IProps {
  form: UseFormReturn<TForm2>;
  nextPage: () => void;
  prevPage: () => void;
  skipPages: () => void;
}

const Form4 = (props: IProps) => {
  const {
    form: {
      control,
      formState: { errors },
      trigger,
      // getValues,
      watch,
    },
    nextPage,
    prevPage,
    // skipPages,
  } = props;

  // const isSubmittable = !!isDirty && !!isValid;

  const onNextClick = async () => {
    // check for errors
    const isValid = await trigger(["yourSkills"]);
    if (!isValid) {
      return;
    }
    // TODO: Make API call here
    nextPage();
  };

  return (
    <>
      <div className="mb-6">
        <div className="text-center">
          <p className="Profiling-form-title">What work are you here to do?</p>
          <h5 className="Profiling-form-subtitle">
            Your skills show clients what you can offer
          </h5>
        </div>
      </div>
      <div className="">
        <FormField
          control={control}
          name="yourSkills"
          render={({ field }) => (
            <Multiselect
              label="Your Skills"
              containerClass="mb-4"
              placeholder="Start typing to search for skills"
              required
              onSelect={(selectedItem: any) => {
                console.log({ selectedItem });
                // const
                // TODO: change to id
                field.onChange(selectedItem);
              }}
              selected={watch("yourSkills")}
              error={errors?.yourSkills}
            />
          )}
        />
      </div>

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
          label="Now, Pitch yourself"
          className="w-full"
        />
      </div>
    </>
  );
};

export default Form4;
