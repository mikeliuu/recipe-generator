import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-gray-200 dark:bg-zinc-600 text-zinc-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-zinc-700',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  active?: boolean;
  disabled?: boolean;
}

function Badge({
  active = false,
  disabled = false,
  className,
  variant,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className, {
        'bg-zinc-800 text-white hover:bg-unset dark:bg-gray-200 dark:text-zinc-800 dark:hover:bg-unset':
          active,
        'cursor-not-allowed opacity-50 hover:bg-unset':
          disabled,
      })}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
