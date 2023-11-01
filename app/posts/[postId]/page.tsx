"use client";

import Form from "@/components/Form";
import Header from "@/components/Header";
import CommentFeed from "@/components/posts/CommentFeed";
import PostItem from "@/components/posts/PostItem";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/navigation";
import React from "react";
import { ClipLoader } from "react-spinners";

type Props = {
  params: {
    postId: string;
  };
};

const PostPage = ({ params }: Props) => {
  const router = useRouter();
  const { postId } = params;
  const { data: fetchedPost, isLoading } = usePost(postId as string);
  if (isLoading || !fetchedPost)
    return (
      <div className="flex items-center justify-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweet your reply"
      />
      <CommentFeed comments={fetchedPost.comments} />
    </>
  );
};

export default PostPage;
