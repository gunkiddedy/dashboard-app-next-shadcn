"use client";
import { Dispatch, SetStateAction, useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import FormSelect from "@/components/FormSelect";
import {
  TLanguage,
  languageSchema,
} from "@/schema/profileSettings/LanguageSchema";
import { languageData, proficiencyData } from "@/constants/profileSettings";
import { useLanguagePatch, useLanguagePost } from "@/services/queries/language";
import { LanguageType } from "@/services/queries/language/types";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  oldData?: LanguageType;
}

export function AddLanguage({ open, setOpen, oldData }: IProps) {
  const form = useForm<TLanguage>({
    resolver: zodResolver(languageSchema),
  });

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = form;
  const close = () => {
    reset();
    setOpen(false);
  };
  const { mutate, isPending } = useLanguagePost(close);
  const { updateIsPending, updateMutate } = useLanguagePatch(
    close,
    oldData?.language_id,
  );

  const onSubmit = (values: TLanguage) => {
    if (oldData) {
      updateMutate({ data: values });
    } else {
      mutate({ data: values });
    }
  };
  useEffect(() => {
    if (oldData) {
      setValue("language", oldData.language);
      setValue("proficiency", oldData.proficiency);
    }
  }, [oldData]);
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-[501px] h-[380px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold pb-6 ">
            {oldData ? "Edit" : "Add"} Language
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 overflow-y-auto min-h-[515px] max-h-[90vh]">
          <Form {...form}>
            <form
              className=" "
              onSubmit={handleSubmit(onSubmit, (err) => {
                console.log("error is", err);
              })}
            >
              <FormField
                control={control}
                name="language"
                render={({ field }) => (
                  <FormSelect
                    label="Language"
                    error={errors.language}
                    placeholder="Select One"
                    containerClass="mb-6 "
                    className=""
                    selectData={languageData}
                    {...field}
                  />
                )}
              />
              <FormField
                control={control}
                name="proficiency"
                render={({ field }) => (
                  <FormSelect
                    label="Proficiency"
                    error={errors.proficiency}
                    placeholder="Select One"
                    containerClass="mb-6"
                    className=""
                    selectData={proficiencyData}
                    {...field}
                  />
                )}
              />

              <div className="mt-6 flex justify-between">
                <DialogClose>
                  <Button
                    label="Cancel"
                    className="w-[105px] h-[52px] border-primary-500"
                    type="button"
                    variant="neutral"
                  />
                </DialogClose>
                <Button
                  loading={isPending || updateIsPending}
                  label={oldData ? "Edit Language" : "Add Language"}
                  className="w-[160px] h-[52px]"
                  type="submit"
                />
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
