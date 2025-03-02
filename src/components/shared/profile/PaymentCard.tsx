import React, { useState } from "react";
import Image from "next/image";

import cx from "classnames";

import Button from "@/components/Button";
import profile from "@/lib/assets/profile";
import { maskString } from "@/utils";
import { PaymentType } from "@/services/queries/payment/types";
import { usePaymentDelete } from "@/services/queries/payment";
import { AddPayment } from "./modals/AddPayment";

interface IProps {
  pay: PaymentType;
}

const PaymentCard = ({ pay }: IProps) => {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = usePaymentDelete();
  const pDefault = false;
  return (
    <div className="w-[255px] h-[187px] border border-neutral-350 rounded-xl px-6 py-3 flex flex-col justify-center">
      <AddPayment open={open} setOpen={setOpen} oldData={pay} />
      <div className="flex items-center justify-between">
        <div className="w-6 h-6">
          <Image
            src={
              pay.payment_method === "Direct Deposit"
                ? profile.building
                : profile.paypal
            }
            alt="Payment Icon"
          />
        </div>
        <div>
          <p
            className={cx(
              "font-medium text-xs py-[2px] px-4 rounded-xl",
              {
                "bg-neutral-800": pDefault,
              },
              {
                "border border-neutral-1050 ": !pDefault,
              },
            )}
          >
            {pDefault ? "DEFAULT" : "SET AS DEFAULT"}{" "}
          </p>
        </div>
      </div>
      <div className="pt-4 pb-3 border-b border-neutral-350">
        <p className="font-medium text-xs">
          {pay.payment_method === "Direct Deposit"
            ? `RN: ${maskString(
                pay.routing_number,
                0,
                (pay.routing_number?.length || 0) - 3,
              )}`
            : `${maskString(pay.email, 2, (pay.email?.length || 0) - 11)}`}
        </p>
        {pay.payment_method === "Direct Deposit" && (
          <>
            <div className="pt-1">
              <p className="text-grey-500 font-medium text-[10px] py-[2px]">
                {pay.account_name} |{" "}
                {maskString(
                  pay.account_number,
                  0,
                  (pay.account_number?.length || 0) - 3,
                )}
                | {pay.account_type}
              </p>
            </div>
            <div className="pt-1 flex">
              <p className="font-medium text-xs py-1 px-4 rounded-xl bg-tertiary-200 text-tertiary-250">
                NOT VERIFIED
              </p>
            </div>
          </>
        )}
      </div>
      <div className="gap-2 flex pt-3">
        <Button
          onClick={() => {
            setOpen(true);
          }}
          label="Edit"
          variant="neutral"
          className="rounded-2xl h-7 font-bold text-[10px] py-1"
        />
        <Button
          loading={isPending}
          onClick={() => {
            mutate(pay._id);
          }}
          label="Clear"
          variant="danger"
          className="rounded-2xl h-7 font-bold text-[10px] py-1"
        />
      </div>
    </div>
  );
};

export default PaymentCard;
