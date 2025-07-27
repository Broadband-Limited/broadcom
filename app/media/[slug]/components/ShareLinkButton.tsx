'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface ShareLinkButtonProps {
  slug: string;
  title: string;
  className?: string;
}

export default function ShareLinkButton({
  slug,
  title,
  className = '',
}: ShareLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      const url = `${window.location.origin}/media/${slug}`;
      await navigator.clipboard.writeText(url);

      setCopied(true);
      toast.success('Link copied to clipboard!', {
        duration: 2000,
        position: 'bottom-center',
      });

      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
      toast.error('Failed to copy link. Please try again.', {
        duration: 3000,
        position: 'bottom-center',
      });
    }
  };

  return (
    <button
      onClick={handleCopyLink}
      className={`inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors ${className}`}
      title={`Copy link to ${title}`}
      aria-label={`Copy link to ${title}`}>
      {copied ? (
        <Check className="h-4 w-4 text-green-600" />
      ) : (
        <Share2 className="h-4 w-4" />
      )}
      <span className="hidden sm:inline">{copied ? 'Copied!' : 'Share'}</span>
    </button>
  );
}
