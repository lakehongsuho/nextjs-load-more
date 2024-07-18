import { Post } from "@/types/post";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="border my-4 bg-slate-100 p-10 relative">
      <span className="bg-red-400 text-white p-2 absolute top-0 left-0">
        {post.id}
      </span>
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}
