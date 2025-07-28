
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
export const dynamic = "force-dynamic"; // Ensure this page is always dynamic

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

  // Filter mining posts (case-insensitive), limit to 4
  const miningPosts = posts.filter(
    (post) => post.category?.toLowerCase() === "mining"
  ).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#EAE9E4] py-6 px-2">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Left column */}
        <div className="grid grid-rows-3 gap-3">
          {leftPosts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="bg-white rounded shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              {post.mainImage && (
                <img
                  src={urlFor(post.mainImage)}
                  alt={post.title}
                  className="w-full h-32 object-cover rounded mb-2"
                />
              )}
              <h3 className="text-md font-semibold mb-1">{post.title}</h3>
              <div className="text-xs text-gray-500 mb-2">
                {post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}
                {post.category && <> &nbsp;|&nbsp; {post.category}</>}
                {post.author?.name && <> &nbsp;|&nbsp; {post.author.name}</>}
              </div>
            </Link>
          ))}
        </div>

        {/* Center column - Latest post */}
        <div className="bg-white rounded shadow-lg p-3 flex flex-col items-center">
          {latest.mainImage && (
            <img
              src={urlFor(latest.mainImage)}
              alt={latest.title}
              className="w-full h-64 object-contain rounded mb-4"
            />
          )}
          <div className="text-xs text-gray-500 mb-2">
            {latest.publishedAt && new Date(latest.publishedAt).toLocaleDateString()}
            {latest.category && <> &nbsp;|&nbsp; {latest.category}</>}
            {latest.author?.name && <> &nbsp;|&nbsp; {latest.author.name}</>}
          </div>
          <h2 className="text-2xl font-bold mb-2 text-center">{latest.title}</h2>
          <p className="text-gray-700 mb-4 text-center">{latest.excerpt}</p>
          <Link
            href={`/blog/${latest.slug.current}`}
            className="bg-[#A855F7] hover:bg-[#9333EA] hover:scale-95 text-white px-6 py-2 rounded font-semibold transition"
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
              className="bg-white rounded shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              {post.mainImage && (
                <img
                  src={urlFor(post.mainImage)}
                  alt={post.title}
                  className="w-full h-32 object-cover rounded mb-2"
                />
              )}
              <h3 className="text-md font-semibold mb-1">{post.title}</h3>
              <div className="text-xs text-gray-500 mb-2">
                {post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}
                {post.category && <> &nbsp;|&nbsp; {post.category}</>}
                {post.author?.name && <> &nbsp;|&nbsp; {post.author.name}</>}
              </div>
              <p className="text-sm text-gray-700 mt-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Mining Featured Section */}
      {miningPosts.length > 0 && (
        <section className="max-w-6xl mx-auto mt-12">
          <h2 className="text-lg font-bold mb-4 uppercase tracking-wide">Mining</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Featured (latest) mining post */}
            <div className="md:col-span-2 bg-white rounded shadow flex flex-col md:flex-row h-full">
              {miningPosts[0].mainImage && (
                <img
                  src={urlFor(miningPosts[0].mainImage)}
                  alt={miningPosts[0].title}
                  className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-t md:rounded-l md:rounded-t-none"
                />
              )}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">{miningPosts[0].title}</h3>
                  <div className="text-xs text-gray-500 mb-2">
                    {miningPosts[0].publishedAt && new Date(miningPosts[0].publishedAt).toLocaleDateString()}
                    {miningPosts[0].author?.name && <> &nbsp;|&nbsp; {miningPosts[0].author.name}</>}
                  </div>
                  <p className="text-gray-700 mb-4 line-clamp-3">{miningPosts[0].excerpt}</p>
                </div>
                <Link
                  href={`/blog/${miningPosts[0].slug.current}`}
                  className="inline-block bg-[#A855F7] hover:bg-[#9333EA] hover:scale-95 text-white px-4 py-2 rounded font-semibold transition w-max"
                >
                  Read More
                </Link>
              </div>
            </div>
            {/* List of next 4 mining posts */}
            <div className="flex flex-col gap-4">
              {miningPosts.slice(1, 5).map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="bg-white rounded shadow hover:shadow-lg transition p-4 flex flex-col"
                >
                  <h4 className="text-md font-semibold mb-1">{post.title}</h4>
                  <div className="text-xs text-gray-500 mb-1">
                    {post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                  <p className="text-xs text-gray-700 line-clamp-2">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Faith Section */}
      {posts.filter((post) => post.category?.toLowerCase() === "faith").length > 0 && (
        <section className="max-w-6xl mx-auto mt-12">
          <h2 className="text-lg font-bold mb-4 uppercase tracking-wide">Faith</h2>
          <div className="grid grid-cols-2 md:flex md:gap-4 gap-3 overflow-x-auto pb-2">
            {posts
              .filter((post) => post.category?.toLowerCase() === "faith")
              .slice(0, 4)
              .map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="bg-white rounded shadow hover:shadow-lg transition flex-shrink-0 flex flex-col min-w-0 md:min-w-[270px] md:max-w-[270px]"
                >
                  {post.mainImage && (
                    <img
                      src={urlFor(post.mainImage)}
                      alt={post.title}
                      className="w-full h-32 object-cover rounded-t"
                    />
                  )}
                  <div className="p-6 flex flex-col">
                    <h3 className="text-md font-semibold mb-1">{post.title}</h3>
                    <div className="text-xs text-gray-500 mb-1">
                      {post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}
                      {post.author?.name && <> &nbsp;|&nbsp; {post.author.name}</>}
                    </div>
                    <p className="text-xs text-gray-700 line-clamp-3">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      )}
    </main>
  );
}