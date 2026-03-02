import { getPosts } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImage";
import Link from "next/link";

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: any;
  excerpt?: string;
  publishedAt?: string;
  category?: string;
  author?: {
    name?: string;
    image?: any;
  };
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const posts: Post[] = await getPosts();

  if (!posts || posts.length === 0) {
    return (
      <main className="min-h-screen bg-[#EAE9E4] flex items-center justify-center">
        <p className="text-gray-700 text-lg">No posts found.</p>
      </main>
    );
  }

  const latest = posts[0];
  const leftPosts = posts.slice(1, 4);
  const rightPosts = posts.slice(4, 6);

  const categories = ["Mining", "Mentorship", "Faith", "Travel", "Relationship", "Reflections"];

  return (
    <main className="min-h-screen bg-[#EAE9E4] py-6 px-2">
      {/* Hero Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 mb-12">
        {/* Left column */}
        <div className="grid grid-rows-3 gap-3">
          {leftPosts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="bg-white rounded shadow hover:shadow-lg transition p-4 flex flex-col group"
            >
              {post.mainImage && (
                <div className="w-full h-56 overflow-hidden rounded mb-2 bg-zinc-100">
                  <img
                    src={urlFor(post.mainImage)}
                    alt={post.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <h3 className="text-md font-semibold mb-1 line-clamp-1">{post.title}</h3>
              <div className="text-xs text-gray-500">
                {post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}
                {post.category && <> &nbsp;|&nbsp; {post.category}</>}
              </div>
            </Link>
          ))}
        </div>

        {/* Center column - Latest post */}
        <div className="bg-white rounded shadow-lg p-4 flex flex-col items-center group">
          {latest.mainImage && (
            <div className="w-full h-80 overflow-hidden rounded mb-4 bg-zinc-100">
              <img
                src={urlFor(latest.mainImage)}
                alt={latest.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          )}
          <div className="text-xs text-gray-500 mb-2">
            {latest.publishedAt && new Date(latest.publishedAt).toLocaleDateString()}
            {latest.category && <> &nbsp;|&nbsp; {latest.category}</>}
          </div>
          <h2 className="text-2xl font-bold mb-2 text-center group-hover:text-[#A855F7] transition-colors">{latest.title}</h2>
          <p className="text-gray-700 mb-6 text-center line-clamp-3">{latest.excerpt}</p>
          <Link
            href={`/blog/${latest.slug.current}`}
            className="bg-[#A855F7] hover:bg-[#9333EA] hover:scale-95 text-white px-8 py-2.5 rounded font-semibold transition shadow-md"
          >
            Read More
          </Link>
        </div>

        {/* Right column */}
        <div className="grid grid-rows-2 gap-3">
          {rightPosts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="bg-white rounded shadow hover:shadow-lg transition p-4 flex flex-col group"
            >
              {post.mainImage && (
                <div className="w-full h-64 overflow-hidden rounded mb-2 bg-zinc-100">
                  <img
                    src={urlFor(post.mainImage)}
                    alt={post.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <h3 className="text-md font-semibold mb-1">{post.title}</h3>
              <div className="text-xs text-gray-500 mb-2">
                {post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}
                {post.category && <> &nbsp;|&nbsp; {post.category}</>}
              </div>
              <p className="text-sm text-gray-700 mt-2 line-clamp-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Dynamic Category Sections */}
      {categories.map((catName) => {
        const catPosts = posts
          .filter((p) => p.category?.toLowerCase() === catName.toLowerCase())
          .slice(0, 4);

        if (catPosts.length === 0) return null;

        return (
          <section key={catName} className="max-w-6xl mx-auto mt-16">
            <div className="flex justify-between items-end mb-6 border-b border-gray-300 pb-2">
              <h2 className="text-2xl font-bold uppercase tracking-tight text-gray-900">{catName}</h2>
              <Link
                href={`/${catName.toLowerCase()}`}
                className="text-sm font-semibold text-[#A855F7] hover:text-[#9333EA] transition-colors"
              >
                View All {catName} →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {catPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
                >
                  {post.mainImage && (
                    <div className="w-full h-56 overflow-hidden bg-zinc-100">
                      <img
                        src={urlFor(post.mainImage)}
                        alt={post.title}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-[#A855F7] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="text-xs text-gray-400 mb-3 flex items-center gap-2">
                      {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString()}</span>}
                      {post.author?.name && <span>• {post.author.name}</span>}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <span className="text-xs font-bold text-[#A855F7] uppercase tracking-wider group-hover:translate-x-1 transition-transform inline-block">
                      Read Post →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}