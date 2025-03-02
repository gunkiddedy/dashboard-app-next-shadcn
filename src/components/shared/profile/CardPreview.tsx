import profile from "@/lib/assets/profile";
import { maskString } from "@/utils";
import Image from "next/image";
import React from "react";

interface IProps {
  cardNo: string;
  back: () => void;
}

const CardPreview = ({ cardNo, back }: IProps) => {
  return (
    <div className="flex items-center justify-between border border-neutral-400 rounded-[10px] p-5">
      <div className="flex items-center gap-3">
        <div className="w-14 h-9  px-[10px] py-[6px]  border border-neutral-400 rounded-[10px]">
          <Image src={profile.mastercard} alt="mastercard logo" />
        </div>
        <div>
          <p>{maskString(cardNo, 0, 11)}</p>
        </div>
      </div>
      <button className="w-14 h-11" onClick={back}>
        <Image src={profile.editBtn} alt="Edit Button svg" />
      </button>
    </div>
  );
};

export default CardPreview;
