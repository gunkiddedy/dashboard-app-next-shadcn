"use client";
import React, { useEffect } from "react";
import Image from "next/image";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Button, UploadedFile } from "@/components";
import { formSchema } from "@/schema/profile/onboardingProfiling";
import { formatDate } from "@/utils";

type TForm = z.infer<typeof formSchema>;

interface IProps {
  form: UseFormReturn<TForm>;
  prevPage: () => void;
  onSubmit: () => void;
  isPending?: boolean;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isDirty: boolean;
}

// TODO: Ask, do we have license to store people's card details
const Form6 = (props: IProps) => {
  const {
    form: {
      // control,
      trigger,
      watch,
    },
    isDirty,
    // prevPage,
    onSubmit,
    isPending,
    setCurrentStep,
  } = props;

  const onNextClick = async () => {
    const isValid = await trigger(["yourBio"]);
    if (!isValid) {
      return;
    }
    // check for errors
    onSubmit();
  };
  const {
    firstName,
    lastName,
    state,
    country,
    yourBio,
    yourSkills,
    resume,
    picture,
  } = watch();

  // TODO: turn this to a hook
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        const confirmationMessage =
          "You have unsaved changes, are you sure you want to leave?";
        e.returnValue = confirmationMessage; // Legacy method for cross-browser support
        return confirmationMessage; // Standard method
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  const handleFileConversionToImage = (file: File) => {
    if (file) {
      const url = URL.createObjectURL(file);
      return url;
    }
    return "";
  };

  return (
    <>
      <div className="mb-6">
        <div className="text-center">
          <p className="Profiling-form-title">Submit your profile</p>
        </div>
      </div>
      <div className="mb-6 flex flex-col gap-9">
        <div className="flex gap-4">
          {/* <div className="w-[96px] h-[96px] rounded-full border bg-slate-500"></div> */}
          <Image
            alt=""
            className="w-[96px] h-[96px] rounded-full border"
            src={handleFileConversionToImage(picture as File)}
            width={50}
            height={50}
          />
          <div className="flex flex-col">
            <h5 className="text-base font-semibold leading-[20px] text-black">
              {firstName} {lastName}
            </h5>
            <p className="text-grey-500 text-xs font-normal leading-[19.2px]">
              {state}, {country}
            </p>
            <p className="text-grey-500 text-xs font-normal leading-[19.2px]">
              {formatDate(new Date(), false, true)} Local Time
            </p>
            <Button
              className="border border-neutral-950 py-[6px] px-3 rounded"
              variant="tertiary"
              label="Edit"
              size="sm"
              type="button"
              onClick={() => {
                setCurrentStep(2);
              }}
            />
          </div>
        </div>
        <div className="ssn">
          <SectionTitle
            actionText="Edit"
            title="SSN"
            actionFn={() => {
              setCurrentStep(1);
            }}
          />
          <p className="text-secondary-150 text-sm font-medium leading-[22.4px]">
            288290021
          </p>
        </div>
        <div className="bio">
          <SectionTitle
            actionText="Edit"
            title="My Bio"
            actionFn={() => {
              setCurrentStep(5);
            }}
          />
          <p className="text-secondary-150 text-sm font-medium leading-[22.4px]">
            {yourBio}
          </p>
        </div>

        <div className="skills">
          <SectionTitle
            actionText="Edit"
            title="Your Skills"
            actionFn={() => {
              setCurrentStep(4);
            }}
          />
          <div className="flex flex-wrap">
            {yourSkills?.map((skill) => (
              <p
                key={skill.id}
                className="bg-primary-600 px-3 py-1 text-primary-50 text-sm font-normal leading-[22.4px] gap-[8px]"
              >
                {skill.name}
              </p>
            ))}
          </div>
        </div>

        <div className="resume">
          <SectionTitle
            actionText="Replace"
            title="My Resume"
            actionFn={() => {
              setCurrentStep(3);
            }}
          />
          <UploadedFile isResumeUploaded={resume} />
        </div>
      </div>

      <div className="flex gap-10">
        {/* <Button
          disabled={false}
          type="button"
          onClick={prevPage}
          variant="neutral"
          label="Back"
          className="w-full"
        /> */}
        <Button
          disabled={isPending}
          type="button"
          label="Submit Profile"
          className="w-full"
          onClick={onNextClick}
          loading={isPending}
        />
      </div>
    </>
  );
};

export default Form6;

// TODO: Move to it's own file
interface ISectionTitleProps {
  title: string;
  actionText: string;
  actionFn?: () => void;
}
const SectionTitle = (props: ISectionTitleProps) => {
  const { title, actionText, actionFn = () => {} } = props;
  return (
    <div className="flex justify-between mb-2 border-b border-neutral-900">
      <h5 className="text-base font-semibold leading-[25.6px] text-black">
        {title}
      </h5>
      <p
        role="button"
        className="text-primary-50 font-semibold text-xs leading-[19.2px]"
        onClick={actionFn}
      >
        {actionText}
      </p>
    </div>
  );
};
