'use client'
import { type SanityDocument } from "next-sanity"
import Image from "next/image"
import Link from "next/link"
import { Card, CardBody, CardFooter, CardHeader, Button } from "@heroui/react"
import { RxCross2 } from "react-icons/rx" 

interface BlogListProps {
  posts: SanityDocument[]
}

const dateFormatOptions: Intl.DateTimeFormatOptions = { 
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
};

export default function BlogList({ posts }: BlogListProps) {
  return (
    <>
      {/* return buttion */}
      <div className="flex flex-col items-center mb-8">
        <Link href="/" prefetch={true}>
          <Button
            isIconOnly
            className="dark:border-knight dark:bg-transparent dark:border-2 bg-[#ece7e7] border-0 mb-2"
            radius="full"
            variant="bordered"
            aria-label="Return to home"
          >
            <RxCross2 />
          </Button>
        </Link>
        <h1 className="text-3xl font-medium">My Blog</h1>
      </div>

      {/* blog list*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug}`} className="block">
            <Card 
              className="dark:bg-darkBg dark:border-2 dark:border-knight rounded-[2rem] h-full"
              isHoverable
            >
              {/* card content */}
              {post.imageUrl && (
                <CardHeader className="p-0">
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardHeader>
              )}
              
              <CardBody className="p-5">
                <h3 className="text-xl font-[500]">{post.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 line-clamp-2">
                  {post.description || "No description available."}
                </p>
              </CardBody>
              
              <CardFooter className="px-5 pb-5 pt-0 flex justify-between">
                <span className="text-sm text-gray-400">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', dateFormatOptions)}
                </span>
                <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-default-900/60"
                  >
                    <path 
                      d="M7 17L17 7M17 7H8M17 7V16" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}