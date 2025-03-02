"use client";

import Button from "@/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import FormSelect from "@/components/FormSelect";
import { FormInput, FormRadioGroup } from "@/components";
import { useForm } from "react-hook-form";
import {
  TPayment,
  paymentSchema,
} from "@/schema/profileSettings/PaymentDetails";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import profile from "@/lib/assets/profile";
import { AccountType } from "@/constants/profileSettings";
import { usePaymentPatch, usePaymentPost } from "@/services/queries/payment";
import { PaymentType } from "@/services/queries/payment/types";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  oldData?: PaymentType;
}

const radioOptions = [
  { value: "Direct Deposit", label: "Direct Deposit", id: "Direct Deposit" },
  {
    value: "PayPal",
    label: "PayPal",
    id: "PayPal",
  },
];

export function AddPayment({ open, setOpen, oldData }: IProps) {
  const form = useForm<TPayment>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      payment_method: "Direct Deposit",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = form;
  const [isForm, setIsForm] = useState(true);
  const close = () => {
    reset();
    setIsForm(false);
  };
  const { mutate, isPending } = usePaymentPost(close);
  const { updateMutate, updateIsPending } = usePaymentPatch(
    close,
    oldData?.payment_methods_id,
  );

  const paymentType = watch("payment_method");

  const onSubmit = (values: TPayment) => {
    if (oldData) {
      updateMutate(values);
    } else {
      mutate(values);
    }
  };
  useEffect(() => {
    if (oldData) {
      setValue("payment_method", oldData.payment_method);
      setValue("email", oldData.email);
      setValue("routing_number", oldData.routing_number);
      setValue("bank_name", oldData.bank_name);
      setValue("account_number", oldData.account_number);
      setValue("account_name", oldData.account_name);
      setValue("account_type", oldData.account_type);
    }
  }, [oldData]);
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (!oldData) reset();
        setOpen(false);
        setIsForm(true);
      }}
    >
      <DialogContent className="sm:max-w-[501px]" closeClassName="hidden">
        {isForm ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold pb-6 ">
                Add Payment
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 overflow-y-auto min-h-[315px] max-h-[90vh]">
              <Form {...form}>
                <form
                  className="flex flex-col justify-between "
                  onSubmit={handleSubmit(onSubmit, (err) => {
                    console.log("error is", err);
                  })}
                >
                  <div>
                    <FormField
                      control={form.control}
                      name="payment_method"
                      render={({ field }) => (
                        <FormRadioGroup
                          options={radioOptions}
                          value={field.value}
                          onChange={field.onChange}
                          className="flex gap-4"
                          itemClassName="border-0 py-0 pb-6"
                        />
                      )}
                    />
                    {paymentType === "Direct Deposit" && (
                      <>
                        <FormField
                          control={control}
                          name="routing_number"
                          render={({ field }) => (
                            <FormInput
                              label="Routing Number"
                              error={errors.routing_number}
                              placeholder="Enter the routing number"
                              containerClass="mb-6"
                              {...field}
                            />
                          )}
                        />
                        <FormField
                          control={control}
                          name="account_type"
                          render={({ field }) => (
                            <FormSelect
                              label="Account Type"
                              error={errors.account_type}
                              placeholder="Select one"
                              containerClass="mb-6"
                              className="rounded-[10px]"
                              selectData={AccountType}
                              {...field}
                              value={field.value || ""}
                            />
                          )}
                        />

                        <FormField
                          control={control}
                          name="account_number"
                          render={({ field }) => (
                            <FormInput
                              label="Account Number"
                              error={errors.account_number}
                              placeholder="Enter the routing number"
                              containerClass="mb-6"
                              {...field}
                            />
                          )}
                        />

                        <FormField
                          control={control}
                          name="account_name"
                          render={({ field }) => (
                            <FormInput
                              label="Account Name"
                              error={errors.account_name}
                              placeholder="Enter the name"
                              containerClass="mb-6"
                              {...field}
                            />
                          )}
                        />

                        <FormField
                          control={control}
                          name="bank_name"
                          render={({ field }) => (
                            <FormInput
                              label="Bank"
                              error={errors.bank_name}
                              placeholder="Bank will be populated after inserting acct. number"
                              containerClass="mb-6"
                              {...field}
                            />
                          )}
                        />
                      </>
                    )}

                    {paymentType === "PayPal" && (
                      <>
                        <FormField
                          control={control}
                          name="email"
                          render={({ field }) => (
                            <FormInput
                              label="Email Address"
                              error={errors.email}
                              placeholder="Email Address"
                              containerClass="mb-6"
                              {...field}
                            />
                          )}
                        />
                      </>
                    )}
                  </div>

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
                      label="Submit Payment Information"
                      className="w-[247px] h-[52px]"
                      type="submit"
                    />
                  </div>
                </form>
              </Form>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-[256px]">
            <div className="w-[104px] h-[82px] ">
              <Image src={profile.message} alt="Message svg" />
            </div>
            <h3 className="font-medium text-xl text-neutral-600 pt-6 pb-2">
              Bank Details Verification
            </h3>
            <p className="text-base text-center">
              A certain amount will be sent to the account. To confirm, enter
              the amount upon confirmation
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
