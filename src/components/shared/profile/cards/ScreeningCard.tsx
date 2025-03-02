import Button from "@/components/Button";
import profile from "@/lib/assets/profile";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BackgroundOrder } from "../modals/BackgroundOrder";
import { DrugTestOrder } from "../modals/DrugTestOrder";

interface IProps {
  screening: {
    id: number;
    name: "Background Check" | "Drug Test";
    price: string;
    route: string;
  };
}

const ScreeningCard = (props: IProps) => {
  const {
    screening: { name, price, route },
  } = props;
  const [backgroundOpen, setBackgroundOpen] = useState(false);
  const [drugOpen, setDrugOpen] = useState(false);
  return (
    <div className="border border-neutral-650 rounded-xl p-6">
      <BackgroundOrder open={backgroundOpen} setOpen={setBackgroundOpen} />
      <DrugTestOrder open={drugOpen} setOpen={setDrugOpen} />
      <div className="flex items-center justify-between">
        <div className="w-16 h-8">
          <Image src={profile.checkr} alt="Checkr svg" />
        </div>
        <Button
          label="View status"
          variant="ghost"
          className="text-primary-50"
        />
      </div>
      <div className="flex justify-between items-center pb-6 pt-1 mb-5  border-b border-neutral-350">
        <h1 className="font-medium text-lg">{name}</h1>
        <h1 className="font-bold text-2xl">{price}</h1>
      </div>
      <div className="flex items-center justify-between">
        <Button
          label="Order Now"
          className="rounded-xl w-[120px] h-12 "
          onClick={() => {
            if (name === "Background Check") setBackgroundOpen(true);
            if (name === "Drug Test") setDrugOpen(true);
          }}
        />
        <Link href={route}>
          <Button variant="ghost" label="Learn more" />
        </Link>
      </div>
    </div>
  );
};

export default ScreeningCard;
