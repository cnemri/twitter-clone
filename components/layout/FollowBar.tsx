"use client";
import useUsers from "@/hooks/useUsers";
import React from "react";
import Avatar from "../Avatar";
import { ClipLoader } from "react-spinners";

type Props = {};

const FollowBar = (props: Props) => {
  const { data: users = [], isLoading } = useUsers();
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );

  if (users.length === 0) return null;
  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl text-center font-semibold border-b border-neutral-600">
          Who to follow?
        </h2>
        <div className="flex flex-col gap-6 mt-4 max-h-96 overflow-scroll">
          {users.map((user: Record<string, any>, index: number) => (
            <div key={index} className="flex flex-row gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
