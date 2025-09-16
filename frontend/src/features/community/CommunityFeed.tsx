import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";

type Post = {
  id: string;
  content: string;
  author: string;
  createdAt: string;
};

export default function CommunityFeed() {
  const { user, notify, token } = useGlobalContext();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch posts
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/community/posts");
        if (!res.ok) throw new Error("Failed to load posts");
        const data = (await res.json()) as Post[];
        setPosts(data);
      } catch (err) {
        notify("Could not fetch posts", "error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [notify]);

  // Add a post
  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      const res = await fetch("/api/community/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ content: newPost }),
      });

      if (!res.ok) throw new Error("Failed to create post");

      const post = (await res.json()) as Post;
      setPosts((prev) => [post, ...prev]);
      setNewPost("");
      notify("Post created!", "success");
    } catch (err) {
      notify("Error creating post", "error");
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Community Feed</h1>

      {/* Post form */}
      {user ? (
        <form onSubmit={handleAddPost} className="mb-6 flex gap-2">
          <input
            type="text"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share something..."
            className="flex-1 border rounded-lg p-2"
          />
          <button
            type="submit"
            className="bg-mist-gold px-4 py-2 rounded-lg text-black hover:bg-yellow-400"
          >
            Post
          </button>
        </form>
      ) : (
        <p className="text-gray-500 mb-6">Login to share your thoughts.</p>
      )}

      {/* Feed */}
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">No posts yet. Be the first!</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg p-3 shadow-sm bg-white dark:bg-gray-800"
            >
              <p className="text-gray-800 dark:text-gray-200">{post.content}</p>
              <div className="text-sm text-gray-500 mt-1">
                by {post.author} • {new Date(post.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
