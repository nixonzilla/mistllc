/* eslint-disable @typescript-eslint/no-explicit-any */
// frontend/src/pages/CommunityPage.tsx
import { useEffect, useState } from "react";
import { fetchPosts, addPost } from "../lib/api";

export default function CommunityPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleAddPost(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    const token = localStorage.getItem("token") || "";
    try {
      const newPost = await addPost(content, token);
      setPosts((prev) => [newPost, ...prev]);
      setContent("");
    } catch (err) {
      console.error("Failed to add post:", err);
      alert("Could not add post. Please try again.");
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">💬 Community</h1>

      {/* Post form */}
      <form
        onSubmit={handleAddPost}
        className="mb-6 bg-gray-800 p-4 rounded-xl shadow-lg"
      >
        <textarea
          className="w-full p-3 rounded-xl bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
          placeholder="Share something with the community..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
        >
          Post
        </button>
      </form>

      {/* Posts feed */}
      {loading && <p className="text-gray-400">Loading posts...</p>}

      {!loading && posts.length === 0 && (
        <p className="text-gray-400">No posts yet. Be the first! 🚀</p>
      )}

      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post._id}
            className="p-4 bg-gray-100 text-black rounded-xl shadow"
          >
            <p className="mb-2">{post.content}</p>
            <span className="text-gray-500 text-sm">
              by {post.author?.email || "anon"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
