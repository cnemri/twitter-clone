import React from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";

type Props = {};

const Sidebar = (props: Props) => {
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
    },
    {
      label: "Profile",
      icon: FaUser,
      href: "/users/123",
    },
  ];
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item, index) => {
            return <SidebarItem key={index} {...item} />;
          })}
          <SidebarItem onClick={() => {}} label="Logout" icon={BiLogOut} />
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;