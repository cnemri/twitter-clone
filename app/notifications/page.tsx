import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import React from "react";
import authOptions from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import NotificationsFeed from "@/components/notifications/NotificationsFeed";

type Props = {};

const NotificationsPage = async (props: Props) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) {
    redirect("/");
  }
  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </>
  );
};

export default NotificationsPage;
