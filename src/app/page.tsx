import PostList from "@/components/post-list";
import { getPosts } from "@/actions/get-posts";
import { POST_PER_PAGE } from "@/config/constants";
import AutoLoadPostList from "@/components/auto-load-post-list";

export default async function Home() {
  const initialPosts = await getPosts(0, POST_PER_PAGE);
  return (
    <div className="my-10">
      <h1 className="text-center text-2xl underline font-bold">
        next js load more
      </h1>
      <AutoLoadPostList initialPosts={initialPosts} />
    </div>
  );
}
