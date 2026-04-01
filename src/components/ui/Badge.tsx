import { cn } from '@/lib/utils';
import { EventCategory } from '@/types/event';

interface BadgeProps {
  category: EventCategory;
  className?: string;
}

const categoryStyles: Record<EventCategory, string> = {
  A: 'bg-sky-100 text-sky-700 border border-sky-200',
  B: 'bg-amber-100 text-amber-700 border border-amber-200',
};

export function Badge({ category, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide',
        categoryStyles[category],
        className
      )}
    >
      Cat. {category}
    </span>
  );
}
