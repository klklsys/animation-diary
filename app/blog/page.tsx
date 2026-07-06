import { getBlogPosts } from 'app/blog/utils'
import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  const posts = getBlogPosts().sort((a, b) =>
    new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1
  )

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">这是全部</h1>
        <p className="mb-4">
        {`这是动画学习日记`}
      </p>
      <BlogPosts posts={posts} />
    </section>
  )
}