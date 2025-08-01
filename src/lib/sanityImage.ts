import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './sanity';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).url();
}

interface SanityImageSource {
  _type: string;
  asset: { _ref: string; _type: string; };
}
