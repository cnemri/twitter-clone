"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

type Props = {
  label: string;
  showBackArrow?: boolean;
};

const Header = ({ label, showBackArrow }: Props) => {
  const router = useRouter();
  const handleBack = React.useCallback(() => {
    router.back();
  }, [router]);
  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            size={20}
            color="white"
            onClick={handleBack}
            className="cursor-pointer hover:opacity-70"
          />
        )}
        <h1 className="text-white text-xl font-semibold">{label}</h1>
      </div>
    </div>
  );
};

export default Header;
