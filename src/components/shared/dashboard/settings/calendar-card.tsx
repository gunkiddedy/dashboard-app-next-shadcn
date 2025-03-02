import React from "react";
import { Button } from "@/components";

interface IProps {
  icon: () => JSX.Element;
  label: string;
}

export function CalendarCard(props: IProps) {
  const { icon, label } = props;

  return (
    <div className="flex flex-col gap-3 py-8 px-6 app_calendar_card">
      {icon()}

      <div className="flex items-center gap-9 justify-between">
        <h3 className="app_calendar_card__text">{label}</h3>

        <Button
          label="Sync now"
          variant="tertiary"
          className="app_calendar_card__btn"
        />
      </div>
    </div>
  );
}
