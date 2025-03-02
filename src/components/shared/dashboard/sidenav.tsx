"use client";

import Link from "next/link";
import Image from "next/image";
import logos from "@/lib/assets/logos";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import {
  AnalyticsIcon,
  AttendanceIcon,
  EmployeesIcon,
  HollidaysIcon,
  LeavesIcon,
  PayrollIcon,
  SettingsIcon,
} from "../svgs";
import { SVGProps } from "react";
import routes from "@/lib/routes";

const SideNav: React.FC = () => {
  const pathname = usePathname();
  console.log(pathname);

  const menuItems = [
    {
      section: "MAIN MENU",
      items: [
        {
          name: "Analytics",
          href: routes.dashboard.entry.path,
          icon: (props: SVGProps<SVGSVGElement>) => (
            <AnalyticsIcon {...props} />
          ),
        },
        {
          name: "Attendance",
          href: routes.dashboard.attendance.path,
          icon: (props: SVGProps<SVGSVGElement>) => (
            <AttendanceIcon {...props} />
          ),
        },
        {
          name: "All Employees",
          href: routes.dashboard.employees.path,
          icon: (props: SVGProps<SVGSVGElement>) => (
            <EmployeesIcon {...props} />
          ),
        },
        {
          name: "Payroll",
          href: routes.dashboard.payroll.path,
          icon: (props: SVGProps<SVGSVGElement>) => <PayrollIcon {...props} />,
        },
        {
          name: "Leaves",
          href: routes.dashboard.leaves.path,
          icon: (props: SVGProps<SVGSVGElement>) => <LeavesIcon {...props} />,
        },
        {
          name: "Holidays",
          href: routes.dashboard.holidays.path,
          icon: (props: SVGProps<SVGSVGElement>) => (
            <HollidaysIcon {...props} />
          ),
        },
      ],
    },
    {
      section: "SYSTEM",
      items: [
        {
          name: "Settings",
          href: routes.dashboard.settings.path,
          icon: (props: SVGProps<SVGSVGElement>) => <SettingsIcon {...props} />,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen w-full md:w-[248px] bg-background text-secondary flex flex-col border-r-[0.5px] border-grey-light">
      <div className="hr-logo p-4">
        <Image
          style={{ width: "50px", height: "auto" }}
          src={logos.hrLogo}
          alt={"hr Logo"}
        />
      </div>
      <nav className="flex-1 p-4 space-y-6 mt-4">
        {menuItems.map(({ section, items }, index) => (
          <div key={index}>
            <h2 className="text-xs font-semibold text-[hsla(0, 0%, 7%, 1)] uppercase mb-3">
              {section}
            </h2>
            <ul className="space-y-4">
              {items.map(({ name, href, icon }, idx) => (
                <li key={idx}>
                  <Link href={href}>
                    <span
                      className={clsx(
                        { "bg-[#f4e6f8]": pathname === href },
                        "flex items-center space-x-3 py-3 px-2 rounded-md hover:bg-[#f4e6f8]",
                      )}
                    >
                      {icon({
                        fill: pathname === href ? "#5d30be" : "#131313",
                      })}
                      <span className="text-sm">{name}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default SideNav;
