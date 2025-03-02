import React from "react";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Button, FileUploadV1, UploadedFile } from "@/components";
import { formSchema } from "@/schema/profile/onboardingProfiling";
import authAssets from "@/lib/assets/Auth";
import { FormField } from "@/components/ui/form";

type TForm = z.infer<typeof formSchema>;

interface IProps {
  form: UseFormReturn<TForm>;
  nextPage: () => void;
  prevPage: () => void;
}

const Form3 = (props: IProps) => {
  const {
    form: {
      control,
      // formState: { errors },
      trigger,
      setValue,
      watch,
    },
    nextPage,
    prevPage,
  } = props;

  // console.log("errors", errors);

  const isResumeUploaded = watch("resume")!;

  const onNextClick = async () => {
    const isValid = await trigger(["resume"]);
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
            How would you like tell us about yourself
          </p>
          <h5 className="Profiling-form-subtitle">
            To show you where your skills are most in demand, we need to get a
            sense of your experience, skills and desired tools
          </h5>
        </div>
      </div>
      {/* NOTE: only pdf is allowed */}
      <div className="my-[40px]">
        {/* if file has been uploaded */}

        {isResumeUploaded ? (
          <>
            <UploadedFile
              {...{ isResumeUploaded }}
              onDeleteFile={() => {
                setValue("resume", null);
              }}
            />
          </>
        ) : (
          <>
            <FormField
              control={control}
              name="resume"
              render={({ field }) => (
                <FileUploadV1
                  containerClass="mb-3"
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
                  // error={errors.resume}
                />
              )}
            />
          </>
        )}
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
          label="Upload your Resume"
          className="w-full"
        />
      </div>
    </>
  );
};

export default Form3;
