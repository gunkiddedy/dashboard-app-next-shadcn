"use client";

import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

import { FieldError } from "react-hook-form";

import cx from "classnames";

interface IProps {
  setFile: Dispatch<SetStateAction<File | null>>;
  alignment?: "horizontal" | "vertical";
  buttonText?: string;
  error?: FieldError;
  allowedTypes: Array<string>;
}

const FileUpload = ({
  setFile,
  alignment = "horizontal",
  buttonText = "Upload Logo",
  error,
}: IProps) => {
  const [image, setImage] = useState<string>("/media/images/user.png");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === "string") {
          // console.log("reader", reader);
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div
      className={cx("flex items-center gap-[20px]", {
        "flex-col": alignment === "vertical",
      })}
    >
      <div className="">
        <img
          src={image}
          alt="image preview"
          className="w-[96px] h-[96px] rounded-[100%] object-cover "
        />
      </div>
      {!!error && (
        <span className="text-sm text-danger-100">{error.message}</span>
      )}
      <div className="flex items-center">
        <label
          htmlFor="file-upload"
          className="border-[1px] border-primary-50 w-[183px] h-[36px] flex items-center justify-center cursor-pointer bg-transparent rounded-[4px] "
        >
          <p className="text-[15px] font-bold text-primary-50 ">{buttonText}</p>
        </label>
        <input
          id="file-upload"
          className="hidden"
          type="file"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default FileUpload;
