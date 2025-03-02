import React from "react";
import { ArrowLeft } from "../svgs";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <div className="app_dashboard_sidebar__back__btn">
      <button
        className="flex gap-3 item-center w-full"
        onClick={() => {
          router.back();
        }}
      >
        <ArrowLeft />
        <p className="app_dashboard_sidebar__back__btn__text">Back</p>
      </button>
    </div>
  );
};

export default BackButton;
