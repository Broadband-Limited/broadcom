import { cn } from '@/lib/utils';

interface MediaStatusBadgeProps {
  published: boolean;
  className?: string;
}

export function MediaStatusBadge({
  published,
  className,
}: MediaStatusBadgeProps) {
  return (
    <span
      className={cn(
        'px-2 py-1 text-xs font-medium rounded-full',
        published
          ? 'bg-green-100 text-green-800'
          : 'bg-amber-100 text-amber-800',
        className
      )}>
      {published ? 'Published' : 'Draft'}
    </span>
  );
}
