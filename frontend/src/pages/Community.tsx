/* eslint-disable @typescript-eslint/no-unused-vars */
// frontend/src/pages/Community.tsx
import { useEffect, useState } from "react";
import { fetchPosts, addPost, type Post } from "../lib/api";
import { useGlobalContext } from "../context/useGlobalContext";

export default function Community() {
  const { notify } = useGlobalContext();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // Load posts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  // Add post
  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const created = await addPost({ title: newTitle, content: newContent });
      setPosts((prev) => [created, ...prev]);
      setNewTitle("");
      setNewContent("");
      notify("Post added successfully!", "success");
    } catch (err) {
      notify("Failed to add post", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Community Feed</h1>

      {/* New post form */}
      <form onSubmit={handleAddPost} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Post title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
        <textarea
          placeholder="Write something..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="w-full border rounded px-3 py-2"
          rows={3}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post
        </button>
      </form>

      {/* Posts list */}
      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && posts.length === 0 && <p>No posts yet.</p>}
      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="border rounded p-4 bg-white dark:bg-gray-800"
          >
            <h2 className="font-semibold text-lg">{post.title}</h2>
            <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
            <small className="text-sm text-gray-500">
              By {post.author || "Anonymous"}{" "}
              {post.created_at &&
                `• ${new Date(post.created_at).toLocaleString()}`}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}
