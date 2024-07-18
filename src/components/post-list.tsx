"use client";

import PostCard from "./post-card";
import { Post } from "@/types/post";
import { useState } from "react";
import { getPosts } from "@/actions/get-posts";
import { POST_PER_PAGE } from "@/config/constants";

type PostListProps = {
  initialPosts: Post[];
};

export default function PostList({ initialPosts }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [currentOffset, setCurrentOffset] = useState<number>(POST_PER_PAGE);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const loadMorePosts = async () => {
    setLoading(true);
    const apiPosts = await getPosts(currentOffset, POST_PER_PAGE);

    if (!apiPosts.length) {
      setHasMoreData(false);
    }

    setPosts((prevPost) => [...prevPost, ...apiPosts]);
    setCurrentOffset((prevCurrentOffset) => prevCurrentOffset + POST_PER_PAGE);
    setLoading(false);
  };

  return (
    <div className="text-center">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <div>
        {hasMoreData ? (
          <button
            onClick={loadMorePosts}
            className={`bg-slate-500 text-white py-4 w-full ${
              loading ? "bg-gray-400" : "hover:bg-slate-400 bg-slate-500"
            }`}
          >
            {loading ? "loading..." : "load more posts"}
          </button>
        ) : (
          <p className="bg-slate-500 text-white py-4 w-full">
            no more post to load
          </p>
        )}
      </div>
    </div>
  );
}
