
import { getPostBySlug } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImage";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import ShareButtons from "@/components/ShareButtons";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/blog/${slug}`;
  const shareText = encodeURIComponent(post.title);

  return (
    <main className="min-h-screen bg-[#f0efe9] font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Header Section with Title and Meta */}
        <header className="mb-12">
          <div className="flex items-start justify-between gap-8 mb-8">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-[#1a1a1a] mb-4">
                {post.title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                {post.excerpt || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"}
              </p>
            </div>
            
            {/* Metadata Sidebar */}
            <div className="hidden md:block w-48 flex-shrink-0">
              <div className="space-y-4 text-sm">
                {post.publishedAt && (
                  <div>
                    <div className="text-gray-400 uppercase tracking-wide text-xs mb-1">Date</div>
                    <div className="text-gray-700">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                )}
                
                {post.category && (
                  <div>
                    <div className="text-gray-400 uppercase tracking-wide text-xs mb-1">Category</div>
                    <div className="text-gray-700 font-medium">{post.category}</div>
                  </div>
                )}
                
                {post.author?.name && (
                  <div>
                    <div className="text-gray-400 uppercase tracking-wide text-xs mb-1">Author</div>
                    <div className="text-gray-700 font-medium">{post.author.name}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Meta - shown below title on mobile */}
          <div className="md:hidden flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8 pt-4 border-t border-gray-200">
            {post.publishedAt && (
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            )}
            {post.category && (
              <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 font-medium">
                {post.category}
              </span>
            )}
            {post.author?.name && (
              <span>By <span className="font-medium">{post.author.name}</span></span>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.mainImage && (
          <div className="mb-16">
            <img
              src={urlFor(post.mainImage)}
              alt={post.title}
              className="w-full h-[60vh] object-contain rounded-lg shadow-sm"
            />
          </div>
        )}

        {/* Content Section with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="prose prose-lg prose-gray max-w-none
              prose-headings:font-light prose-headings:text-[#1a1a1a]
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-[#A855F7] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[#1a1a1a] prose-strong:font-semibold
              prose-blockquote:border-l-4 prose-blockquote:border-[#A855F7] 
              prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
              prose-ul:my-6 prose-li:my-2
              prose-img:rounded-lg prose-img:shadow-sm
            ">
              <PortableText value={post.body} />
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                  Share This Article
                </h3>
                <ShareButtons 
                  url={currentUrl}
                  title={post.title}
                  excerpt={post.excerpt || ''}
                  className="space-y-3"
                />
              </div>
              
              {/* Additional sidebar content can go here */}
              <div className="mt-8 p-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                  About the Author
                </h4>
                {post.author?.name && (
                  <div className="text-sm text-gray-600">
                    <p className="font-medium text-gray-800 mb-2">{post.author.name}</p>
                    <p>I am a mining engineer, gemstone enthusiast, and a lover of stories. Welcome to my blog! Here, you can learn about my adventures in mining, my love for citrine, and how I find beauty and faith in every journey.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Back to Blog Link */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link 
            href="/" 
            className="inline-flex items-center text-[#A855F7] hover:text-[#9333EA] hover:scale-95 transition-colors duration-200 font-medium"
          >
            ← Back to all posts
          </Link>
        </div>
      </div>
    </main>
  );
}