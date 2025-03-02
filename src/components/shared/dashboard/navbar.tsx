"use client";

import Image, { StaticImageData } from "next/image";
import dashboardIcons from "@/lib/assets/dashboard";
import aviPNG from "../../../../public/media/images/dashboard/avi.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import WelcomeMessage from "./welcome-message";
import { FormSearchInput } from "@/components/FormSearch";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import routes from "@/lib/routes";

const userName = "Robert";

const WelcomeMessage = () => {
  const pathName = usePathname();

  function headertext(path: string) {
    switch (path) {
      case routes.dashboard.entry.path:
        return (
          <p>
            Welcome back,
            <span className="font-bold text-black"> {userName}</span> 👋🏻
          </p>
        );
      case routes.dashboard.attendance.path:
        return "Attendance";
      case routes.dashboard.employees.path:
        return "All Employees";
      case routes.dashboard.payroll.path:
        return "Payroll";
      case routes.dashboard.leaves.path:
        return "Leaves";
      case routes.dashboard.holidays.path: // Corrected typo from 'Hollidays' to 'Holidays'
        return "Holidays";
      case routes.dashboard.settings.path:
        return "Settings";
      default:
        return `Welcome back, ${userName}`; // This will ensure the default text is returned properly
    }
  }

  return (
    <div className="text-xl leading-6 font-medium text-gray-800">
      {headertext(pathName)}
    </div>
  );
};

const SearchInput = () => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search"
      className="w-[261px] pl-12 pr-4 h-12 text-base text-grey-medium/75 border rounded-[8px] border-grey-light focus:outline-none focus:ring-1 focus:ring-primary-from"
    />
    <Image
      src={dashboardIcons.searchIcon}
      alt={`Search Icon`}
      style={{
        width: "24px",
        height: "auto",
        position: "absolute",
        left: "12px",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    />
  </div>
);

const NotificationBell = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="relative p-4 min-h-12 max-h-12 bg-[#f4f2f5] flex items-center justify-center rounded-[8px] focus:outline-none">
        <Image
          src={dashboardIcons.bellIcon}
          alt={`Notification Bell Icon`}
          style={{ width: "20px", height: "auto" }}
        />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-[184px] bg-background border border-grey-light rounded-[8px]">
      <DropdownMenuLabel>Notifications</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Message 1</DropdownMenuItem>
      <DropdownMenuItem>Message 2</DropdownMenuItem>
      <DropdownMenuItem>Message 3</DropdownMenuItem>
      <DropdownMenuItem>Message 4</DropdownMenuItem>
      <DropdownMenuItem>Message 5</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

interface ProfileDropdownProps {
  image: StaticImageData;
  profileName: string;
  position: string;
}

const ProfileDropdown = ({
  image,
  profileName,
  position,
}: ProfileDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-[184px] flex items-center justify-between bg-background border border-grey-light rounded-[8px] py-1 pl-1 pr-2 focus:outline-none">
          <div className="flex items-center space-x-2">
            <Image
              src={image}
              alt={`Profile Image`}
              className="w-10 h-10 rounded-[4px]"
            />
            <div className="flex flex-col items-start">
              <span className="text-sm text-secondary font-semibold">
                {profileName}
              </span>
              <span className="text-xs text-grey-medium">{position}</span>
            </div>
          </div>
          <Image
            src={dashboardIcons.arrowDownIcon}
            alt={`Profile Image`}
            className="w-3 h-auto"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[184px] bg-background border border-grey-light rounded-[8px]">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function Navbar() {
  const formMethods = useForm();
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-background border-b border-grey-light max-h-20">
      {/* Left Section: Welcome Message */}
      <WelcomeMessage />

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Search Input */}
        <Form {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(() => {})}>
            <FormField
              name="searchValue"
              render={() => (
                <FormSearchInput classInput="w-[261px] pl-12 pr-4 h-12 text-base text-grey-medium/75 border rounded-[8px] border-grey-medium/50 focus:outline-none focus:ring-1 focus:ring-primary-from" />
              )}
            />
          </form>
        </Form>

        {/* Notification Bell */}
        <NotificationBell />

        {/* Profile Dropdown */}
        <ProfileDropdown
          image={aviPNG}
          profileName="Robert Allen"
          position="HR Manager"
        />
      </div>
    </nav>
  );
}
