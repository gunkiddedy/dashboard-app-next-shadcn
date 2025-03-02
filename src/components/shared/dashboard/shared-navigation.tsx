"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

import { matchRoute } from "@/utils";

interface IProps {
  data: {
    id: number;
    label: string;
    route: string;
  }[];
  layoutId: string;
}

export function SharedNavigation(props: IProps) {
  const { data, layoutId } = props;
  const pathName = usePathname();

  return (
    <div className="flex app_shared_navigation">
      {data.map((item) => {
        const active = matchRoute(pathName, item.route, true);

        return (
          <Link key={item.id} href={item.route}>
            <div className="app_shared_navigation__item">
              <p
                className={`app_shared_navigation__item__text ${active ? "active" : ""}`}
              >
                {item.label}
              </p>

              {active && (
                <motion.div
                  className="app_shared_navigation__item__border"
                  layoutId={`app-shared-nav-${layoutId}`}
                ></motion.div>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
