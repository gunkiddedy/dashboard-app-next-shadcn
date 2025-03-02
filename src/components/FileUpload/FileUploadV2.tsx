"use client";

import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

import cx from "classnames";

interface IProps {
  setFile: Dispatch<SetStateAction<File | null>>;
  buttonText?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  accept: string[];
}

/**
 *
 * NOTE: To be used for file upload without drag and drop features
 */

const FileUploadV2 = ({
  setFile,
  buttonText = "Upload Logo",
  accept,
  error,
}: IProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };
  return (
    <div className={cx("flex items-center gap-[20px]", {})}>
      {!!error && (
        <span className="text-sm text-danger-100">
          {error?.message as string}
        </span>
      )}
      <div className="flex items-center">
        <label
          htmlFor="file-upload"
          className="bg-grey-100  w-[183px] h-14 flex items-center justify-center cursor-pointer  rounded-xl "
        >
          <p className="text-base font-bold text-grey-600 ">{buttonText}</p>
        </label>

        <input
          id="file-upload"
          className="hidden"
          type="file"
          accept={accept.join(", ")}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default FileUploadV2;
