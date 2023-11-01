import React from "react";
import CommentItem from "./CommentItem";

type Props = {
  comments?: Record<string, any>[];
};

const CommentFeed = ({ comments }: Props) => {
  return (
    <>
      {comments?.map((comment, index) => (
        <CommentItem key={index} data={comment} />
      ))}
    </>
  );
};

export default CommentFeed;
