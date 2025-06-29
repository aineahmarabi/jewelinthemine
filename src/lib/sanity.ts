import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'c0cnt21y', // your project ID
  dataset: 'production',  // your dataset
  apiVersion: '2023-01-01', // use a recent date
  useCdn: true,
});

export async function getPosts() {
  return sanityClient.fetch(`*[_type == "post"]{
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "category": category->title,
    "author": author->{
      name,
      image
    }
  } | order(publishedAt desc)`);
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      publishedAt,
      "category": category->title,
      "author": author->{
        name,
        image
      },
      body
    }`,
    { slug }
  );
}