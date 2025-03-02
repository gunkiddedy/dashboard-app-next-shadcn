import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import routes from "@/lib/routes";

export default function Home() {
  return (
    <div className="app_survey_container">
      <div className="app_survey_container__upper">
        <div className="flex flex-col gap-8">
          <h3 className="app_survey__title">
            Welcome to Our Automotive Sales Survey!
          </h3>

          <p className="app_survey__info">
            We appreciate your time and feedback as we work to better understand
            our customers&apos; needs. This survey is designed to be quick and
            easy, with no interruptions or delays, so you can share your
            thoughts seamlessly.
          </p>

          <div className="flex gap-4">
            <Link href={routes.survey.path}>
              <Button size="sm" className="app_survey__btn bg-shark-950">
                Start survey
              </Button>
            </Link>

            <Link href={routes.dashboard.entry.path}>
              <Button
                size="md"
                className="app_survey__btn app_survey__btn--outline"
              >
                See results
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
