type Post = {
  id: string;
  user: string;
  content: string;
};

export default function Post({ post }: { post: Post }) {
  return (
    <div className="bg-mist-gray rounded-2xl p-4 mb-4 shadow">
      <p className="text-mist-pink font-display">@{post.user}</p>
      <p className="text-gray-300">{post.content}</p>
    </div>
  );
}
