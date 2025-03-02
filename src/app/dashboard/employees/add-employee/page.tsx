"use client";

import AccountAccessForm from "@/components/forms/employee/AccountAccessForm";
import DocumentsForm from "@/components/forms/employee/DocumentsForm";
import PersonalInformationForm from "@/components/forms/employee/PersonalInformationForm";
import ProfessionalInformationForm from "@/components/forms/employee/ProfessionalInformationForm";
import {
  PersonalInformationIcon,
  ProfessionalInformationIcon,
} from "@/components/shared/svgs";
import { MyTabs } from "@/components/Tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function AddEmployeePage() {
  const handleTabChange = (value: string) => {
    console.log("Active tab:", value);
  };

  const tabs = [
    {
      value: "personal",
      label: "Personal Information",
      icon: <PersonalInformationIcon />,
      content: (
        <Card className="w-full bg-background border border-grey-light rounded-[8px]">
          <CardContent className="p-5">
            <PersonalInformationForm />
          </CardContent>
        </Card>
      ),
    },
    {
      value: "professional",
      label: "Professional Information",
      icon: <ProfessionalInformationIcon />,
      content: (
        <Card className="w-full bg-background border border-grey-light rounded-[8px]">
          <CardContent className="p-5">
            <ProfessionalInformationForm />
          </CardContent>
        </Card>
      ),
    },
    {
      value: "documents",
      label: "Documents",
      icon: <PersonalInformationIcon />,
      content: (
        <Card className="w-full bg-background border border-grey-light rounded-[8px]">
          <CardContent className="p-5">
            <DocumentsForm />
          </CardContent>
        </Card>
      ),
    },
    {
      value: "account",
      label: "Account Access",
      icon: <PersonalInformationIcon />,
      content: (
        <Card className="w-full bg-background border border-grey-light rounded-[8px]">
          <CardContent className="p-5">
            <AccountAccessForm />
          </CardContent>
        </Card>
      ),
    },
  ];
  return (
    <MyTabs
      tabs={tabs}
      defaultValue="personal"
      onValueChange={handleTabChange}
    />
  );
}

// export default addEmployeePage;
