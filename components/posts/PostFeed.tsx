"use client";

import usePosts from "@/hooks/usePosts";
import React from "react";
import PostItem from "./PostItem";

type Props = {
  userId?: string;
};

const PostFeed = ({ userId }: Props) => {
  const { data: posts } = usePosts(userId);
  return (
    <>
      {posts?.map((post: Record<string, any>, index: number) => {
        return <PostItem key={index} userId={userId} data={post} />;
      })}
    </>
  );
};

export default PostFeed;
