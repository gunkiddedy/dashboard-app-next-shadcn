import React from "react";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Button, FormTextarea } from "@/components";
import { FormField } from "@/components/ui/form";
import { formSchema } from "@/schema/profile/onboardingProfiling";

type TForm = z.infer<typeof formSchema>;

interface IProps {
  form: UseFormReturn<TForm>;
  prevPage: () => void;
  nextPage: () => void;
}

// TODO: Ask, do we have license to store people's card details
const Form5 = (props: IProps) => {
  const {
    form: {
      control,
      formState: { errors },
      trigger,
    },
    prevPage,
    nextPage,
  } = props;

  const onNextClick = async () => {
    const isValid = await trigger(["yourBio"]);
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
          <p className="Profiling-form-title">
            Tell the world about yourself with your bio
          </p>
          <h5 className="Profiling-form-subtitle">
            Help people to get to know you at a glance
          </h5>
        </div>
      </div>

      <FormField
        control={control}
        name="yourBio"
        render={({ field }) => (
          <FormTextarea
            label="Your Bio"
            error={errors.yourBio}
            placeholder="Your Bio"
            containerClass="mb-4"
            required
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
          label="Done"
          className="w-full"
          onClick={onNextClick}
        />
      </div>
    </>
  );
};

export default Form5;
