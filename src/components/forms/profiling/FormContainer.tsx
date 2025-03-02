"use client";

import React, { useState, Suspense } from "react";

import cx from "classnames";

import { StepsContainer } from "@/components/forms/profiling";
import { EmailWithIcon, RenderIf } from "@/components/shared";
import { Button } from "@/components";
import { useSearchParams } from "next/navigation";

type PageType = "welcomePage" | "formStepsPage";
const ProfilingForm = () => {
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<PageType>(
    (searchParams.get("activePage") as PageType) || "welcomePage",
  );
  const email = searchParams.get("email");
  const name = searchParams.get("name");

  return (
    <>
      <RenderIf condition={currentPage === "welcomePage"}>
        <div className={cx("w-11/12 md:w-4/12 mx-auto text-center")}>
          <EmailWithIcon userEmail={`${email}`} />
          <div className="text-center">
            <p className="Profiling-form-title mt-6 mb-6">
              Hey {name}, Welcome to WorkRobin
            </p>
            <h5 className="Profiling-form-subtitle mb-9">
              Getting ready for your next offer? Let’s get your profile up to
              date. It only takes 5-6 minutes and you can edit it late. We’ll
              save as you go.
            </h5>
          </div>
          <Button
            label="Get Started"
            className="w-full"
            onClick={() => {
              setCurrentPage("formStepsPage");
            }}
          />
        </div>
      </RenderIf>
      <RenderIf condition={currentPage === "formStepsPage"}>
        <StepsContainer />
      </RenderIf>
    </>
  );
};

const ProfilingFormWrapper = () => {
  return (
    <Suspense>
      <ProfilingForm />
    </Suspense>
  );
};

export default ProfilingFormWrapper;
