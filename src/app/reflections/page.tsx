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

export default async function ReflectionsCategoryPage() {
  const allPosts: Post[] = await getPosts();
  
  // Filter only reflections posts
  const reflectionsPosts = allPosts.filter(
    (post) => post.category?.toLowerCase() === "reflections"
  );

  if (!reflectionsPosts || reflectionsPosts.length === 0) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Reflections</h1>
          <p className="text-gray-600">No reflections posts found.</p>
        </div>
      </main>
    );
  }

  const featuredPost = reflectionsPosts[0];
  const sidebarPosts = reflectionsPosts.slice(1, 4); // Next 3 posts for sidebar
  const gridPosts = reflectionsPosts.slice(4); // Remaining posts for grid

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-900">Reflections</h1>
          <p className="text-gray-600 mt-2">Personal thoughts, insights, and contemplations on life's journey</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Featured Post - Left Side */}
          <div className="lg:col-span-2">
            <Link href={`/blog/${featuredPost.slug.current}`} className="group block">
              {featuredPost.mainImage && (
                <div className="relative overflow-hidden rounded-lg mb-6 aspect-[16/10]">
                  <img
                    src={urlFor(featuredPost.mainImage)}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  {featuredPost.publishedAt && (
                    <span>{new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  )}
                  {featuredPost.author?.name && (
                    <span>By {featuredPost.author.name}</span>
                  )}
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>
            </Link>
          </div>

          {/* Sidebar Posts - Right Side */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Recent Reflections
            </h3>
            <div className="space-y-6">
              {sidebarPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group block"
                >
                  <div className="flex space-x-4">
                    {post.mainImage && (
                      <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg">
                        <img
                          src={urlFor(post.mainImage)}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h4>
                      <div className="mt-2 text-xs text-gray-500">
                        {post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Grid Section - 4 Columns */}
        {gridPosts.length > 0 && (
          <div>
            <div className="border-t border-gray-200 pt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">More Reflections</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {gridPosts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug.current}`}
                    className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {post.mainImage && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={urlFor(post.mainImage)}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="text-xs text-gray-500 mb-2">
                        {post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}
                        {post.author?.name && <> • {post.author.name}</>}
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 leading-tight mb-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-600 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
          >
            ← Back to all posts
          </Link>
        </div>
      </div>
    </main>
  );
}