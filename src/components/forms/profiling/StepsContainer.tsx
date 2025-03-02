"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import cx from "classnames";

import { Form } from "@/components/ui/form";
import { formSchema } from "@/schema/profile/onboardingProfiling";
import {
  Form1,
  Form2,
  Form3,
  Form4,
  Form5,
  Form6,
} from "@/components/forms/profiling";
import { EmailWithIcon, RenderIf } from "@/components/shared";
import { useCompleteProviderSignup } from "@/services/queries/auth";

type TForm = z.infer<typeof formSchema>;

const steps = 5;
const StepsContainer = () => {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const userId = searchParams.get("userid");

  const { mutate, isPending } = useCompleteProviderSignup();

  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
  });

  const isCurrentStepBarDone = (step: number) => {
    return step <= currentStep;
  };

  const {
    handleSubmit,
    getValues,
    formState: { isDirty },
  } = form;

  const onSubmit = (values: TForm) => {
    // NO tax number in design, no house number in design
    const {
      tax: tax_option,
      taxType: tax_type,
      title,
      firstName: first_name,
      lastName: last_name,
      phone: phone_number,
      street: street_address,
      city,
      state,
      zipCode: zip_code,
      country,
      // picture: profile_photo_url,
      // resume: resume_url,
      yourSkills: skillset,
      yourBio: bio,
    } = values;
    const data = {
      user_id: userId,
      taxInformation: {
        tax_option,
        tax_type, // SSN - 9, TIN - 9 Digits [3-2-4] || EIN - 9 [2-7] * Needed for verification purpose *
        tax_id_number: "12399947885",
        title,
        first_name,
        last_name,
        phone_number,
      },
      address: {
        house_number: "10", // no house number in design
        street_address,
        city,
        state,
        zip_code,
        country,
      },
      profile: {
        profile_photo_url: "",
        resume_url: "",
        skillset: skillset.map((skill) => skill.name),
        bio,
      },
    };
    // TODO: make api call here
    mutate({ url: `/auth/providers/signup/complete`, data });
  };

  const nextPage = () => {
    if (currentStep < steps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // handle last page
      setCurrentStep(6);
    }
  };

  const prevPage = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      // can't go back
    }
  };

  const skipPages = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <>
      <div className={`grid grid-cols-5 gap-1 w-11/12 md:w-4/12 mx-auto`}>
        {new Array(steps).fill(0).map((_, idx) => (
          <div
            key={idx}
            className={cx(`border-neutral-350 border-[4px]`, {
              "border-primary-50": isCurrentStepBarDone(idx + 1),
            })}
          ></div>
        ))}
      </div>
      <div className={cx("w-11/12 md:w-4/12 mx-auto")}>
        <Form {...form}>
          <form
            className="Profiling-form w-full mx-auto pb-5 mt-0 md:mt-5 "
            onSubmit={handleSubmit(onSubmit, (err) => {
              console.log("error is", err);
            })}
          >
            <EmailWithIcon userEmail={`${email}`} />
            <RenderIf condition={currentStep === 1}>
              <Form1 {...{ form, nextPage }} />
            </RenderIf>
            <RenderIf condition={currentStep === 2}>
              <Form2 {...{ form, nextPage, prevPage }} />
            </RenderIf>
            <RenderIf condition={currentStep === 3}>
              <Form3 {...{ form, nextPage, prevPage }} />
            </RenderIf>
            <RenderIf condition={currentStep === 4}>
              <Form4 {...{ form, nextPage, prevPage, skipPages }} />
            </RenderIf>
            <RenderIf condition={currentStep === 5}>
              <Form5 {...{ form, prevPage, nextPage }} />
            </RenderIf>
            <RenderIf condition={currentStep === 6}>
              <Form6
                {...{ form, prevPage, isPending, setCurrentStep, isDirty }}
                onSubmit={() => {
                  onSubmit(getValues());
                }}
              />
            </RenderIf>
          </form>
        </Form>
      </div>
    </>
  );
};

export default StepsContainer;
