/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { fetchPosts, addPost } from "../lib/api";
import { useGlobalContext } from "../context/GlobalContext";

export default function Community() {
  const { addNotification } = useGlobalContext();
  const [posts, setPosts] = useState<any[]>([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchPosts().then(setPosts).catch(console.error);
  }, []);

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token") || "";
      const newPost = await addPost(content, token);
      setPosts((prev) => [newPost, ...prev]);
      setContent("");
      addNotification("Post added!", "success");
    } catch (err: any) {
      addNotification(err.message || "Failed to add post", "error");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Community</h1>
      <form onSubmit={handleAddPost} className="mb-6">
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Share something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Post
        </button>
      </form>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post._id} className="p-4 bg-white rounded-xl shadow">
            <p>{post.content}</p>
            <span className="text-gray-500 text-sm">
              by {post.author?.email || "anon"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
