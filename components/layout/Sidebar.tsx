"use client";

import React from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import { ClipLoader } from "react-spinners";

type Props = {};

const Sidebar = (props: Props) => {
  const { data: currentUser, isLoading } = useCurrentUser();
  const items = [
    {
      label: "Home",
      icon: BsHouseFill,
      href: "/",
    },
    {
      label: "Notifications",
      icon: BsBellFill,
      href: "/notifications",
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      label: "Profile",
      icon: FaUser,
      href: `/users/${currentUser?.id}`,
      auth: true,
    },
  ];

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item, index) => {
            return <SidebarItem key={index} {...item} />;
          })}
          {currentUser && (
            <SidebarItem
              onClick={() => signOut()}
              label="Logout"
              icon={BiLogOut}
            />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
