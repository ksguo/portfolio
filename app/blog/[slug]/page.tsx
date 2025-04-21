import { PortableText, type SanityDocument } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { client } from "@/lib/client"
import Link from "next/link"
import Image from "next/image"

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`

const { projectId, dataset } = client.config()
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null

const options = { next: { revalidate: 30 } }

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // fetch post by slug
  const slugParam = await params
  const post = await client.fetch<SanityDocument>(POST_QUERY, slugParam, options)
  
  // when not find the  post
  if (!post) {
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        <Link href="/blog" className="hover:underline">
          ← Back to posts
        </Link>
        <h1 className="text-2xl font-bold mt-4">Post not found</h1>
      </main>
    )
  }

  // 若 post 存在，再安全地读取 post.image
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <Image
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose">
        {post.publishedAt && (
          <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        )}
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </main>
  )
}