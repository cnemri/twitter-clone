"use client";

import { useRouter } from "next/navigation";
import { BsTwitter } from "react-icons/bs";
import React from "react";

type Props = {};

const SidebarLogo = (props: Props) => {
  const router = useRouter();
  return (
    <div className="rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 transition">
      <BsTwitter size={28} color="white" onClick={() => router.push("/")} />
    </div>
  );
};

export default SidebarLogo;
