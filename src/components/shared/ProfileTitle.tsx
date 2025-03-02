import React from "react";

interface IProps {
  title: string;
}

const ProfileTitle = ({ title }: IProps) => {
  return (
    <div className="py-[24px]">
      <h1 className="text-[24px] font-bold text-secondary-50 ">{title}</h1>
    </div>
  );
};

export default ProfileTitle;
