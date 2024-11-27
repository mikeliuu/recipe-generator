'use client';

import { Icon } from '@/components/icon';
import { ThemeToggle } from '@/components/theme-toggle';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed z-40 w-full text-zinc-900 bg-white dark:text-gray-200 dark:bg-zinc-800">
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-12 lg:px-16 py-4">
        <div className="flex flex-row justify-between items-center gap-8 text-center">
          <Link className="flex flex-row items-center text-xl font-semibold gap-2" href="/">
            <Icon name="ChefHat" className="h-8 w-8" />{' '}
            <h1 className="hidden sm:block">Recipe Generator</h1>
          </Link>

          <div className="flex flex-row gap-4">
            <a
              className={cn(
                buttonVariants({ size: 'icon', variant: 'outline' }),
                'flex justify-center items-center',
              )}
              href="https://github.com/mikeliuu/recipe-generator"
              target="_blank"
              rel="noopener"
            >
              <Icon name="Github" />
            </a>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
