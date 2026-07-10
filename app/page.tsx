import { getBlogPosts } from 'app/blog/utils'
import { BlogPosts } from 'app/components/posts'

export default function Page() {
   const posts = getBlogPosts().sort((a, b) =>
    new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1
  )

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
       记一天是一天
      </h1>
      <p className="mb-4">
        {`不记录就会忘记`}
      </p>
      <div className="my-8">
        <BlogPosts posts={posts} />
      </div>
    </section>
  )
}
