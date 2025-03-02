"use client";
import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { motion } from "framer-motion";

import { matchRoute } from "@/utils";
import {
  dashboardLinks,
  profileDashboardLinks,
  settingsDashboardLinks,
} from "@/utils/static";
import logos from "@/lib/assets/logos";
import routes from "@/lib/routes";
import { RenderIf } from "..";
import { ArrowLeft } from "../svgs";

export function Sidebar() {
  const pathName = usePathname();
  const router = useRouter();

  const isProfileRoute = pathName.includes(routes.dashboard.profile.path);
  const isSettingsRoute = pathName.includes(routes.dashboard.settings.path);

  return (
    <div className="app_dashboard_sidebar">
      <Link href={routes.dashboard.entry.path} className="px-8">
        <div className="app_dashboard_sidebar__logo">
          <Image src={logos.logo} alt="logo" />
        </div>
      </Link>
      <div className="app_dashboard_sidebar__links px-8">
        <RenderIf condition={!isProfileRoute && !isSettingsRoute}>
          <div className="app_dashboard_sidebar__ctt flex flex-col gap-4">
            {dashboardLinks.map((item) => {
              const active = matchRoute(pathName, item.route) ? "active" : "";
              const activeClass = active ? "active" : "";

              return (
                <Link key={item.id} href={item.route}>
                  <div
                    className={`app_dashboard_sidebar__ctt__item flex items-center gap-2 ${activeClass}`}
                  >
                    <div className="app_dashboard_sidebar__ctt__item__icon">
                      {item.icon()}
                    </div>
                    <p className="app_dashboard_sidebar__ctt__item__text">
                      {item.label}
                    </p>
                    {active && (
                      <motion.div
                        layoutId="app_sidebar_links"
                        className="app_dashboard_sidebar__ctt__item__bg"
                      ></motion.div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </RenderIf>

        <RenderIf condition={isProfileRoute}>
          <div className="app_dashboard_sidebar__back__btn mb-6">
            <button
              className="flex gap-3 item-center w-full"
              onClick={() => {
                router.back();
              }}
            >
              <ArrowLeft />
              <p className="app_dashboard_sidebar__back__btn__text">Back</p>
            </button>
          </div>

          <div className="flex flex-col gap-8">
            {profileDashboardLinks.map((item) => (
              <div
                key={item.id}
                className="app_dashboard_sidebar__ctt flex flex-col gap-4"
              >
                <h3 className="app_dashboard_sidebar__ctt__title">
                  {item.title}
                </h3>

                {item.children.map((link) => {
                  const active = matchRoute(pathName, link.route)
                    ? "active"
                    : "";
                  const activeClass = active ? "active" : "";

                  return (
                    <Link key={link.id} href={link.route}>
                      <div
                        className={`app_dashboard_sidebar__ctt__item flex items-center gap-2 ${activeClass}`}
                      >
                        <p className="app_dashboard_sidebar__ctt__item__text">
                          {link.label}
                        </p>
                        {active && (
                          <motion.div
                            layoutId="app_sidebar_profile_links"
                            className="app_dashboard_sidebar__ctt__item__bg"
                          ></motion.div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </RenderIf>

        <RenderIf condition={isSettingsRoute}>
          <div className="app_dashboard_sidebar__back__btn">
            <button
              className="flex gap-3 item-center w-full"
              onClick={() => {
                router.back();
              }}
            >
              <ArrowLeft />
              <p className="app_dashboard_sidebar__back__btn__text">Back</p>
            </button>
          </div>

          <div className="flex flex-col gap-8">
            {settingsDashboardLinks.map((item) => (
              <div
                key={item.id}
                className="app_dashboard_sidebar__ctt flex flex-col gap-4"
              >
                <h3 className="app_dashboard_sidebar__ctt__title">
                  {item.title}
                </h3>

                {item.children.map((link) => {
                  const active = matchRoute(pathName, link.route)
                    ? "active"
                    : "";
                  const activeClass = active ? "active" : "";

                  return (
                    <Link key={link.id} href={link.route}>
                      <div
                        className={`app_dashboard_sidebar__ctt__item flex items-center gap-2 ${activeClass}`}
                      >
                        <p className="app_dashboard_sidebar__ctt__item__text">
                          {link.label}
                        </p>
                        {active && (
                          <motion.div
                            layoutId="app_sidebar_profile_links"
                            className="app_dashboard_sidebar__ctt__item__bg"
                          ></motion.div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </RenderIf>
      </div>
    </div>
  );
}
