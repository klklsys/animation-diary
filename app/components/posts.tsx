'use client'

import Link from 'next/link'
import { useState } from 'react'
import { getYear, getMonth, formatMonthDay } from 'app/blog/client-utils'

type Post = {
  slug: string
  metadata: {
    title: string
    publishedAt: string
    summary: string
    image?: string
  }
  content: string
}

export function BlogPosts({ posts }: { posts: Post[] }) {
  const grouped: Record<string, Record<string, typeof posts>> = {}
  posts.forEach((post) => {
    const year = getYear(post.metadata.publishedAt)
    const month = String(getMonth(post.metadata.publishedAt)).padStart(2, '0')
    if (!grouped[year]) grouped[year] = {}
    if (!grouped[year][month]) grouped[year][month] = []
    grouped[year][month].push(post)
  })

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a))

  const currentYear = new Date().getFullYear().toString()
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0')

  const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({
    [`${currentYear}-${currentMonth}`]: true,
  })

  const toggleMonth = (key: string) => {
    setOpenMonths((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div>
      {years.map((year) => (
        <div key={year} className="mb-6">
          <p className="text-neutral-400 dark:text-neutral-500 text-lg mb-3">
            {year}
          </p>
          {Object.keys(grouped[year])
            .sort((a, b) => Number(b) - Number(a))
            .map((month) => {
              const key = `${year}-${month}`
              const isOpen = !!openMonths[key]
              return (
                <div key={key} className="mb-2">
                  <button
                    onClick={() => toggleMonth(key)}
                    className="flex items-center gap-1 text-base text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors mb-1"
                  >
                    {month}
                    <span className="text-base">{isOpen ? '▾' : '▸'}</span>
                  </button>
                  {isOpen && (
                    <div className="pl-4">
                      {grouped[year][month].map((post) => (
                        <Link
                          key={post.slug}
                          className="flex flex-row space-x-2 mb-3"
                          href={`/blog/${post.slug}`}
                        >
                          <p className="text-neutral-600 dark:text-neutral-400 w-[50px] tabular-nums">
                            {formatMonthDay(post.metadata.publishedAt)}
                          </p>
                          <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                            {post.metadata.title}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      ))}
    </div>
  )
}