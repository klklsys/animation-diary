import Link from 'next/link'
import { formatDate, getBlogPosts, getYear } from 'app/blog/utils'

export function BlogPosts() {
  let allBlogs = getBlogPosts().sort((a, b) =>
    new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1
  )

  const grouped: Record<string, typeof allBlogs> = {}
  allBlogs.forEach((post) => {
    const year = getYear(post.metadata.publishedAt)
    if (!grouped[year]) grouped[year] = []
    grouped[year].push(post)
  })

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a))

  return (
    <div>
      {years.map((year) => (
        <div key={year} className="mb-8">
          <h3 className="text-neutral-400 dark:text-neutral-500 text-sm mb-3">
            {year}
          </h3>
          {grouped[year].map((post) => (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 mb-4"
              href={`/blog/${post.slug}`}
            >
              <div className="w-full flex flex-row space-x-2">
                <p className="text-neutral-600 dark:text-neutral-400 w-[80px] tabular-nums">
                  {formatDate(post.metadata.publishedAt)}
                </p>
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {post.metadata.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}
