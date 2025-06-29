// components/ShareButtons.tsx
'use client'
import { useState } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
  excerpt?: string;
  className?: string;
}

export default function ShareButtons({ url, title, excerpt = '', className = '' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(`${title} ${url}`);
  const encodedExcerpt = encodeURIComponent(excerpt);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedExcerpt}`,
    whatsapp: `https://wa.me/?text=${encodedText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className={`border-t border-gray-200 pt-6 ${className}`}>
      <h3 className="text-lg font-semibold text-[#22223B] mb-4">Share this post</h3>
      
      <div className="flex flex-wrap gap-3">
        {/* Twitter/X */}
        <button
          onClick={() => handleShare('twitter')}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors font-semibold"
          aria-label="Share on X (Twitter)"
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span className="hidden sm:inline">X</span>
        </button>

        {/* LinkedIn */}
        <button
          onClick={() => handleShare('linkedin')}
          className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded hover:bg-[#005885] transition-colors font-semibold"
          aria-label="Share on LinkedIn"
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          <span className="hidden sm:inline">LinkedIn</span>
        </button>

        {/* WhatsApp */}
        <button
          onClick={() => handleShare('whatsapp')}
          className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded hover:bg-[#1ebe5d] transition-colors font-semibold"
          aria-label="Share on WhatsApp"
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967c-.273-.099-.472-.148-.67.15c-.198.297-.767.967-.94 1.166c-.173.198-.347.223-.644.075c-.297-.149-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52c.149-.174.198-.298.298-.497c.099-.198.05-.372-.025-.521c-.075-.149-.669-1.611-.916-2.206c-.242-.579-.487-.5-.669-.51c-.173-.008-.372-.01-.571-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074c.149.198 2.099 3.2 5.077 4.366c.71.306 1.263.489 1.695.626c.712.227 1.36.195 1.872.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.288.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 3.617h-.001a8.933 8.933 0 0 1-4.548-1.252l-.327-.194l-3.377.889l.902-3.292l-.213-.336a8.924 8.924 0 0 1-1.373-4.792c.001-4.962 4.043-9 9.009-9c2.406 0 4.668.936 6.364 2.636a8.926 8.926 0 0 1 2.637 6.363c-.002 4.962-4.044 9-9.009 9m7.363-16.363A9.927 9.927 0 0 0 9.009 0C4.037 0 0 4.037 0 9.009c0 1.588.412 3.142 1.194 4.514L0 20l6.634-1.771a9.013 9.013 0 0 0 4.375 1.117h.004c4.971 0 9.009-4.037 9.011-9.008a8.96 8.96 0 0 0-2.637-6.364"/>
          </svg>
          <span className="hidden sm:inline">WhatsApp</span>
        </button>

        {/* Facebook */}
        <button
          onClick={() => handleShare('facebook')}
          className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded hover:bg-[#166fe5] transition-colors font-semibold"
          aria-label="Share on Facebook"
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span className="hidden sm:inline">Facebook</span>
        </button>

      </div>
    </div>
  );
}