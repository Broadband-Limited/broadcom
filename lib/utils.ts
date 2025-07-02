export function cn(...inputs: Array<string | boolean | undefined | null>) {
  return inputs.filter(Boolean).join(' ');
}

export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const formatter = new Intl.RelativeTimeFormat('en', { style: 'short' });
    const diff = date.getTime() - Date.now();

    const units = [
      { unit: 'year', ms: 31536000000 },
      { unit: 'month', ms: 2628000000 },
      { unit: 'day', ms: 86400000 },
      { unit: 'hour', ms: 3600000 },
      { unit: 'minute', ms: 60000 },
    ];

    for (const { unit, ms } of units) {
      if (Math.abs(diff) >= ms) {
        return formatter.format(
          Math.round(diff / ms),
          unit as Intl.RelativeTimeFormatUnit
        );
      }
    }

    return 'Just now';
  } catch (error) {
    console.error('Invalid date format:', dateString, error);
    return '';
  }
}

/**
 * Formats a date string into a human-readable format
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return 'Unknown date';

  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Converts a string to a URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

/**
 * Generate a URL-friendly slug from a name and role for team members
 */
export function generateTeamMemberSlug(name: string, role: string): string {
  const combined = `${name} ${role}`;
  return slugify(combined);
}
