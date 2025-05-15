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
      { unit: 'minute', ms: 60000 }
    ];

    for (const { unit, ms } of units) {
      if (Math.abs(diff) >= ms) {
        return formatter.format(Math.round(diff/ms), unit as Intl.RelativeTimeFormatUnit);
      }
    }
    
    return 'Just now';
  } catch (error) {
    console.error('Invalid date format:', dateString, error);
    return '';
  }
}