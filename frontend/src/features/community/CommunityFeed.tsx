import { useEffect, useState } from "react"
import { apiGet } from "../../lib/api"

interface Post {
  id: string
  content: string
  author: string
}

export default function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await apiGet<Post[]>("/community/posts")
        setPosts(data)
      } catch (err) {
        console.error("Failed to fetch posts:", err)
      }
    }
    fetchPosts()
  }, [])

  return (
    <div className="p-4 space-y-3">
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow rounded-lg p-4">
          <p>{post.content}</p>
          <span className="text-sm text-gray-500">— {post.author}</span>
        </div>
      ))}
    </div>
  )
}
