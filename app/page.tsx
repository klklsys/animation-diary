import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
       记一天是一天
      </h1>
      <p className="mb-4">
        {`这里是Animation练习日记`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
