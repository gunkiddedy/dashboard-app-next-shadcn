import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import profile from "@/lib/assets/profile";
import {
  useLanguageDelete,
  useLanguageReadOne,
} from "@/services/queries/language";
import { useState } from "react";
import { AddLanguage } from "../modals/AddLanguage";

interface IProps {
  id: string;
}

const LanguagePopover = ({ id }: IProps) => {
  const [popOpen, setPopOpen] = useState(false);
  const close = () => {
    setPopOpen(false);
  };
  const { mutate } = useLanguageDelete(close);
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useLanguageReadOne(id);
  return (
    <Popover open={popOpen} onOpenChange={setPopOpen}>
      <PopoverTrigger asChild>
        <button type="button">
          <Image src={profile.threeDots} alt="three dots icon" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        asChild
        align="end"
        className="p-0 rounded-[12px] w-[172px]"
      >
        <div className="px-2 py-4 flex flex-col items-start gap-3 ">
          <AddLanguage open={isOpen} setOpen={setIsOpen} oldData={data} />
          <button
            className="text-sm font-medium tet-grey-500 w-full text-left hover:bg-gray-200 p-2 rounded-md"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Update
          </button>

          <button
            className="text-sm font-medium tet-grey-500 w-full text-left hover:bg-gray-200 p-2 rounded-md"
            onClick={() => {
              mutate(id);
            }}
          >
            Delete
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguagePopover;
