"use client";
import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import useUser from "@/hooks/useUser";
import React from "react";
import { ClipLoader } from "react-spinners";

type Props = {
  params: {
    userId: string;
  };
};

const UserView = ({ params }: Props) => {
  const { data: fetchedUser, isLoading } = useUser(params.userId as string);
  if (isLoading || !fetchedUser)
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  return (
    <>
      <Header showBackArrow label={`${fetchedUser.name}'s profile`} />
      <UserHero userId={fetchedUser.id as string} />
      <UserBio userId={fetchedUser.id as string} />
    </>
  );
};

export default UserView;
