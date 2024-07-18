"use client";

import PostCard from "./post-card";
import { Post } from "@/types/post";
import { useCallback, useEffect, useState } from "react";
import { getPosts } from "@/actions/get-posts";
import { POST_PER_PAGE } from "@/config/constants";
import { useInView } from "react-intersection-observer";

type AutoLoadPostListProps = {
  initialPosts: Post[];
};

export default function AutoLoadPostList({
  initialPosts,
}: AutoLoadPostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [currentOffset, setCurrentOffset] = useState<number>(POST_PER_PAGE);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [scrollTrigger, isInView] = useInView(); // 스크린에 버튼이 없으면 false, 존재하면 true

  const loadMorePosts = useCallback(async () => {
    setLoading(true);
    const apiPosts = await getPosts(currentOffset, POST_PER_PAGE);

    if (!apiPosts.length) {
      setHasMoreData(false);
    }

    setPosts((prevPost) => [...prevPost, ...apiPosts]);
    setCurrentOffset((prevCurrentOffset) => prevCurrentOffset + POST_PER_PAGE);
    setLoading(false);
  }, [currentOffset]);

  useEffect(() => {
    if (isInView && hasMoreData) {
      loadMorePosts();
    }
  }, [isInView, hasMoreData, loadMorePosts]);

  return (
    <div className="text-center">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <div>
        {hasMoreData ? (
          <div
            ref={scrollTrigger}
            className="border my-4 bg-gray-200 p-10 relative animate-pulse"
          >
            <div className="bg-gray-300 text-white p-2 absolute top-0 left-0"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 my-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full my-1"></div>
            <div className="h-4 bg-gray-300 rounded w-full my-1"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 my-1"></div>
          </div>
        ) : (
          <p className="bg-slate-500 text-white py-4 w-full">
            no more post to load
          </p>
        )}
      </div>
    </div>
  );
}
