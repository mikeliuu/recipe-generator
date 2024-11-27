'use client';

import { Icon } from '@/components/icon';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Theme } from '@/types';
import { useTheme } from 'next-themes';

export function ThemeToggle({ className, ...props }: ButtonProps) {
  const { theme, setTheme } = useTheme();

  const isLight = theme === Theme.Light;

  const toggleTheme = () => {
    setTheme(isLight ? Theme.Dark : Theme.Light);
  };

  return (
    <Button
      {...props}
      className={cn(className)}
      size="icon"
      variant="outline"
      onClick={toggleTheme}
    >
      <span className="sr-only">toggle theme</span>

      <Icon name={isLight ? 'Moon' : 'Sun'} />
    </Button>
  );
}
